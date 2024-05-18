import { FunctionComponent } from "react";
import ButtonText from "../button-text";
import { useXerialWallet } from "../../../hooks/useXerialWallet";

interface ButtonConnectProps {
  size?: string;
}

const ButtonConnect: FunctionComponent<ButtonConnectProps> = ({ size }) => {
  const { isAuth, handleLogout, handleLogin } = useXerialWallet();
  return (
    <ButtonText
      label={isAuth ? "Disconnect" : "Connect Wallet"}
      height={size || "70px"}
      aspectRatio="155/74"
      style={{ padding: "0 20px" }}
      onClick={isAuth ? handleLogout : handleLogin}
    />
  );
};

export default ButtonConnect;
