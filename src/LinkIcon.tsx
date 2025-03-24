import { Link } from "react-router-dom";
import { linkPadding, Padding } from "./styles/sizes";
type LinkIconProps = {
  pageUrl: string;
  icon: React.ReactNode;
  size?: Padding;
};
const LinkIcon = ({ icon, pageUrl, size = "sm" }: LinkIconProps) => {
  return (
    <Link
      to={pageUrl}
      style={linkPadding[size]}
    >
      {icon}
    </Link>
  );
};
export default LinkIcon;
