import React, { useEffect, useState } from "react";
import styles from "./edit-profile.module.css";
import { useAuth } from "@/store/useAuth";

import EditProfileContainer from "@/assets/images/profile/editPropileContainer.svg";
import Paragraph from "@/components/typography/paragraph";
import ButtonImage from "@/components/buttons/button-image";

// assets
import EmptyAvatar from "@/assets/images/profile/emptyAvatar.svg";
import ChangeBtn from "@/assets/images/profile/changeBtn.svg";
import ChangeBtnH from "@/assets/images/profile/changeBtnH.svg";
import SignOutBtn from "@/assets/images/profile/signOutBtn.svg";
import SignOutBtnH from "@/assets/images/profile/signOutBtnH.svg";
import { PatchUserName } from "@/api/queries/user/patch-username";

const EditProfileBgImg = new Image();
EditProfileBgImg.src = EditProfileContainer;

interface EditProfileProps {
  style?: React.CSSProperties;
}

const EditProfile: React.FC<EditProfileProps> = ({ style }) => {
  const { wallet, userName, setLogout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const patchUserName = PatchUserName(username);

  useEffect(() => {
    if (patchUserName.isSuccess) setUsername("");
  }, [patchUserName.isSuccess]);

  return (
    <div
      className={styles.editProfileContainer}
      style={{
        backgroundImage: `url(${EditProfileBgImg.src})`,
        ...style,
      }}
    >
      <div className={styles.column}>
        <ButtonImage
          img={EmptyAvatar}
          imgHover={EmptyAvatar}
          height="120px"
          aspectRatio={"1/1"}
        />
      </div>
      <div className={styles.column}>
        <Paragraph color="white" fontSize="30px">
          {"User Name"}
        </Paragraph>
        <input
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={userName || "Enter your username"}
        />
        <ButtonImage
          img={ChangeBtn}
          imgHover={ChangeBtnH}
          height="55px"
          aspectRatio={"168/61"}
          disabled={!username}
          onClick={() => patchUserName.mutate()}
        />
      </div>

      <div className={styles.column}>
        <Paragraph color="white" fontSize="30px">
          {"Wallet"}
        </Paragraph>
        <Paragraph
          style={{
            wordBreak: "break-word",
            width: "100%",
            textAlign: "center",
          }}
          color="rgba(53, 202, 253, 1)"
        >
          {wallet || ""}
        </Paragraph>
      </div>
      <div className={styles.column}>
        <ButtonImage
          img={SignOutBtn}
          imgHover={SignOutBtnH}
          height="55px"
          aspectRatio={"168/61"}
          onClick={setLogout}
        />
      </div>
    </div>
  );
};

export default EditProfile;
