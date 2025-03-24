import { iconSize, Size } from "./styles/sizes";

type IconProps = {
  icon: React.ReactNode;
  size: Size;
  onClick?: () => void;
};
const Icon = ({ icon, size = "md", onClick }: IconProps) => {
  return (
    <div onClick={onClick} style={iconSize[size]}>
      {icon}
    </div>
  );
};
export default Icon;
