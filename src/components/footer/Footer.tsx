import { colors } from "../../styles/color";
import { sizes } from "../../styles/sizes";
import NavBar from "./NavBar";
const Footer = () => {
  return (
    <footer
      style={{
        background: colors.background.lightGrey,
        height: sizes.height.lg,
        borderTop: colors.border.lime,
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
      className="z-30 w-full fixed bottom-0 flex justify-center items-center max-w-sm"
    >
      <NavBar />
    </footer>
  );
};
export default Footer;
