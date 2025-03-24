import { MdOutlineCameraAlt } from "react-icons/md";
import { TbDeviceTv } from "react-icons/tb";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { sizes } from "../../styles/sizes";
import Icon from "../../Icon";
import Image from "../../Image";
const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-5">
      <div style={{ width: sizes.width.md }}>
        <Icon icon={<MdOutlineCameraAlt size={sizes.width.full} />} size="md" />
      </div>
      <Image src={process.env.PUBLIC_URL + "instagram_PNG.png"} size={"logo"} />
      <div className="flex gap-2 justify-end" style={{ width: sizes.width.md }}>
        <Icon icon={<TbDeviceTv size={sizes.width.full} />} size="md" />
        <Icon
          icon={<IoPaperPlaneOutline size={sizes.width.full} />}
          size="md"
        />
      </div>
    </div>
  );
};
export default TopBar;