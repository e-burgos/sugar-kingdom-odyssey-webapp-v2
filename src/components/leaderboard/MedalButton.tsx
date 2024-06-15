import Medal1 from "@/assets/images/tournaments/medal1.svg";
import Medal2 from "@/assets/images/tournaments/medal2.svg";
import Medal3 from "@/assets/images/tournaments/medal3.svg";
import ButtonImage from "@/components/buttons/button-image";

type PlaceType = 1 | 2 | 3;

const MedalButton = (props: { place: PlaceType }) => {
  const Medal =
    props.place === 1 ? Medal1 : props.place === 2 ? Medal2 : Medal3;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",
      }}
    >
      <ButtonImage
        img={Medal}
        imgHover={Medal}
        height="40px"
        style={{
          minHeight: "40px",
          minWidth: "30px",
        }}
        aspectRatio="37:48"
      />
    </div>
  );
};

export default MedalButton;
