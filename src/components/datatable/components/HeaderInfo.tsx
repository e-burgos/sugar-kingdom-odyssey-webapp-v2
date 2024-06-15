import Paragraph from "@/components/typography/paragraph";

const HeaderInfo = (props: { title: string; fontSize?: string }) => {
  return (
    <Paragraph
      fontFamily="Titan-Regular"
      color="white"
      fontSize={props.fontSize}
    >
      {`${props.title.toLocaleUpperCase()}`}
    </Paragraph>
  );
};

export default HeaderInfo;
