import { animated, SpringRef, SpringValue } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react";

type CustomAnimatedDivProps = {
  children: ReactNode;
  openHeight:number;
  api:SpringRef<{y:number}>;
  setOpenHeight:Dispatch<SetStateAction<number>>
  y:SpringValue<number>
};

const CustomAnimatedDiv = ({ children,openHeight,api,setOpenHeight,y }: CustomAnimatedDivProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {

    const handleResize = () => {
      setOpenHeight(window.innerHeight * 0.7);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpenHeight]);

  const bind = useDrag(({ last, movement: [, my], cancel }) => {
    if (my < -50) cancel();
    if (last) {
      if (my > 150) {
        api.start({ y: openHeight });
      } else {
        api.start({ y: 0 });
      }
    } else {
      api.start({ y: my });
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 384);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <animated.div
      {...bind()}
      style={{
        y,
        touchAction: "none",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: openHeight,
        background: "#fff",
        zIndex: 1000,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        width: isSmallScreen ? "100%" : "384px",
        margin: '0 auto',
      }}
    >
      {children}
    </animated.div>
  );
};

export default CustomAnimatedDiv;
