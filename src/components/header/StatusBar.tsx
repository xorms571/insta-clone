import { FaBatteryFull, FaSignal, FaWifi } from "react-icons/fa";
import Icon from "../../Icon";
import { sizes } from "../../styles/sizes";
import Time from "./Time";
const StatusBar = () => {
  return (
    <div className="flex justify-between items-center pb-2 px-5 py-3">
      <Time/>
      <div className="flex items-center gap-1.5">
        <Icon size="xsm" icon={<FaSignal size={sizes.width.full}/>}/>
        <Icon size="xsm" icon={<FaWifi size={sizes.width.full}/>}/>
        <Icon size="sm" icon={<FaBatteryFull size={sizes.width.full}/>}/>
      </div>
    </div>
  );
};
export default StatusBar;
