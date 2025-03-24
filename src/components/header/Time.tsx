import { useState, useEffect } from "react";

const Time = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString().split(" ")[1]
  );
  useEffect(() => {
    setInterval(() => {
      setTime((prev) => new Date().toLocaleTimeString().split(" ")[1]);
    }, 1000);
  }, []);
  const t = time.split(":");
  const showingTime = t[0] + ":" + t[1];
  return <p className="font-bold text-sm">{showingTime}</p>;
};

export default Time;
