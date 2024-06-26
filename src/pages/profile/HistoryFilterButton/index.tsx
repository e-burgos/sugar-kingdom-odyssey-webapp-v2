import React from "react";
import { HistoryFilterType } from "@/api/endpoints/history/types";
import ButtonImage from "@/components/buttons/button-image";
import PurchasesBtn from "@/assets/images/profile/purchasesBtn.svg";
import PurchasesBtnH from "@/assets/images/profile/purchasesBtnH.svg";
import MatchesBtn from "@/assets/images/profile/matchesBtn.svg";
import MatchesBtnH from "@/assets/images/profile/matchesBtnH.svg";
import { useHistoryFilterStore } from "@/store/useHistoryFilter";

interface HistoryFilterButtonProps {
  buttonType: HistoryFilterType;
}

const HistoryFilterButton: React.FC<HistoryFilterButtonProps> = ({
  buttonType,
}) => {
  const { setFilter } = useHistoryFilterStore();
  return (
    <>
      {buttonType === "matches" && (
        <ButtonImage
          img={MatchesBtn}
          imgHover={MatchesBtnH}
          height="55px"
          aspectRatio={"168/61"}
          onClick={() => setFilter("matches")}
        />
      )}
      {buttonType === "purchases" && (
        <ButtonImage
          img={PurchasesBtn}
          imgHover={PurchasesBtnH}
          height="55px"
          aspectRatio={"168/61"}
          onClick={() => setFilter("purchases")}
        />
      )}
    </>
  );
};

export default HistoryFilterButton;
