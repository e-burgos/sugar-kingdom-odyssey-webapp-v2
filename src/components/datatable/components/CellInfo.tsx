import Paragraph from "@/components/typography/paragraph";

const CellInfo = (props: {
  info: string;
  color?: string;
  fontSize?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Paragraph
      style={{ textAlign: "center", ...props.style }}
      fontFamily="Gotham-Medium"
      color={props.color || "white"}
      fontSize={props.fontSize}
    >
      {props.info}
    </Paragraph>
  );
};
export default CellInfo;
