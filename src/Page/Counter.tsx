import { useEffect, useState } from "react";
import "../App.css";

export default function CountdownTimer(): JSX.Element {
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [dot, setDot] = useState<number>(0);
  const [text, setText] = useState<string>("00:00");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);

      const currentTime = count % 90;
      const secs = 90 - currentTime;

      const minutes = Math.floor(secs / 60);
      const seconds = secs % 60;

      const formattedTime = `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
      setText(formattedTime);

      const currentLoadingPercent = (440 / 90) * (currentTime + 1);
      setLoadingPercent(currentLoadingPercent);

      const currentDot = (360 / 90) * (currentTime + 1);
      setDot(currentDot);

      if (currentTime === 89) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="App">
      <div className="container">
        <div className="text">{text}</div>
        <div style={{ transform: `rotate(${dot}deg)` }} className="dot"></div>
        <svg>
          <circle cx="70" cy="70" r="70" />
          <circle strokeDashoffset={loadingPercent} cx="70" cy="70" r="70" />
        </svg>
      </div>
    </div>
  );
}
