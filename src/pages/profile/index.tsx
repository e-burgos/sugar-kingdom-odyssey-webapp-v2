import React from "react";
import styles from "./profile.module.css";
import DarkContainer from "../../components/dark-container";

interface ProfileProps {
  style?: React.CSSProperties;
}

const Profile: React.FC<ProfileProps> = ({ style }) => {
  return (
    <DarkContainer style={style} label="Profile" hideGain noAvailable>
      <div className={styles.wrapper}></div>
    </DarkContainer>
  );
};

export default Profile;
