import { FunctionComponent, useEffect } from "react";
import ButtonText from "../button-text";
import useLogin from "@/hooks/useLogin";
import { useAuth } from "@/store/useAuth";
import { PostLogin } from "@/api/queries/auth/post-login";
import { toast } from "react-toastify";

interface ButtonConnectProps {
  size?: string;
}

const ButtonConnect: FunctionComponent<ButtonConnectProps> = ({ size }) => {
  const postLogin = PostLogin();
  const { connectWallet, disconnectWallet, signature } = useLogin();
  const {
    wallet,
    isAuth,
    setSessionId,
    setExpirationDate,
    setIsAuth,
    setUserId,
  } = useAuth();

  useEffect(() => {
    if (signature && wallet && !isAuth) postLogin.mutate(signature);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, signature, isAuth]);

  useEffect(() => {
    if (postLogin.isSuccess) {
      setSessionId(postLogin.data?.id);
      setExpirationDate(postLogin.data?.expiration);
      setUserId(postLogin.data?.userId);
      setIsAuth(true);
      toast("Wallet connected!", { type: "success" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postLogin.isSuccess]);

  return (
    <ButtonText
      label={isAuth ? "Disconnect" : "Connect Wallet"}
      height={size || "70px"}
      aspectRatio="155/74"
      style={{ padding: "0 20px" }}
      onClick={!isAuth ? connectWallet : disconnectWallet}
    />
  );
};

export default ButtonConnect;
