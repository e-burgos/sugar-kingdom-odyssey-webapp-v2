import Paragraph from "@/components/typography/paragraph";

const HeaderInfo = (props: { title: string }) => {
  return (
    <Paragraph fontFamily="Titan-Regular" color="white">
      {`${props.title.toLocaleUpperCase()}`}
    </Paragraph>
  );
};

export default HeaderInfo;
