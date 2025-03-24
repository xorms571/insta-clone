import { sizes } from "./styles/sizes";
type ImageProps = {
  src: string;
  size: "sm" | "md" | "lg" | "fit" | "logo";
};
const Image = ({ src, size = "md" }: ImageProps) => {
  const imgSize = {
    sm: { width: sizes.width.sm },
    md: { width: sizes.width.md },
    lg: { width: sizes.width.lg },
    fit: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as React.CSSProperties["objectFit"],
    },
    logo: { width: sizes.width.md, filter:'drop-shadow(0 0 1px #fff)' as React.CSSProperties["filter"], },
  };
  return <img style={{ ...imgSize[size] }} src={src} alt="" />;
};
export default Image;
