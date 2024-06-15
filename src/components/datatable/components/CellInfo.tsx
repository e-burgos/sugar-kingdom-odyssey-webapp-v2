import Paragraph from "@/components/typography/paragraph";

const CellInfo = (props: {
  info: string;
  color?: string;
  fontSize?: string;
}) => {
  return (
    <Paragraph
      style={{ textAlign: "center" }}
      fontFamily="Gotham-Medium"
      color={props.color || "white"}
      fontSize={props.fontSize}
    >
      {props.info}
    </Paragraph>
  );
};
export default CellInfo;
