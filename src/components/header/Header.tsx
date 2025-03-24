import { colors } from "../../styles/color";
import StatusBar from "./StatusBar";
import TopBar from "./TopBar";
import { useLocation } from "react-router-dom";
const Header = () => {
  const lp = useLocation().pathname;
  return (
    <header
      className="fixed w-full max-w-sm z-30 shadow-md"
      style={{
        background: colors.background.lightGrey,
        borderBottom: colors.border.lime,
        height:
          lp.includes("search") || lp.includes("addpost") || lp.includes("user")
            ? "45px"
            : "85px",
      }}
    >
      <StatusBar />
      {lp.includes("search") ||
      lp.includes("addpost") ||
      lp.includes("user") ? null : (
        <TopBar />
      )}
    </header>
  );
};
export default Header;
