import React from "react";
import styles from "./profile.module.css";
import DarkContainer from "../../components/dark-container";
import { GetHistoryByUserId } from "@/api/queries/user/get-history-by-user-id";
import EditProfile from "./EditProfile";
import { columns, mapper } from "./Datatable/ProfileColumns";
import Spinner from "@/components/spinner/Spinner";
import DatatableProfile from "@/components/datatable/DatatableProfile";
import { useHistoryFilterStore } from "@/store/useHistoryFilter";

interface ProfileProps {
  style?: React.CSSProperties;
}

const Profile: React.FC<ProfileProps> = ({ style }) => {
  const { filter } = useHistoryFilterStore();

  // get data
  const { data, isSuccess } = GetHistoryByUserId(filter);

  // Prepare data for the table
  const initialData = mapper(data || []);

  return (
    <DarkContainer style={style} label="Profile" hideGain>
      <div className={styles.wrapper}>
        <EditProfile />
        <div
          className={styles.datatableContainer}
          style={{
            justifyContent: !isSuccess ? "center" : "flex-start",
          }}
        >
          {!isSuccess && <Spinner color="rgba(150, 233, 237, 1)" />}
          {isSuccess && initialData && (
            <DatatableProfile
              data={initialData}
              columns={columns}
              showPagination
            />
          )}
        </div>
      </div>
    </DarkContainer>
  );
};

export default Profile;
