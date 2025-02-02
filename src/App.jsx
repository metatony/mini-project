import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [rotateDirection, setRotateDirection] = useState(1); // used 1 for clockwise and -1 for anti-clockwise
  const [iconSize, setIconSize] = useState(100); // default icon size
  const [idleTime, setIdleTime] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const handleClick = () => {
    setRotateDirection((prev) => prev * -1); // this function reverses the rotation direction when icon is clicked
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newSize = Math.max(50, Math.min(200, (clientX + clientY) / 8)); // adjust icon size based on cursor position

    setIconSize(newSize);
  };

  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      setIsMoving(true);
      setIdleTime(0); // reset idle time when movement is detected
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsMoving(false), 500); // consider idle if no movement for 0.5 sec
    };

    window.addEventListener("mousemove", resetIdleTimer);

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (!isMoving) {
      interval = setInterval(() => {
        setIdleTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isMoving]);



  return (
    <div onMouseMove={handleMouseMove}>
      <div>
        <img
          src={reactLogo}
          className="logo react"
          alt="React logo"
          style={{
            transform: `rotate(${rotateDirection * 90}deg)`,
            transition: "transform 1s",

            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
          onClick={handleClick}
        />
        <p>Idle Time: {idleTime}</p>
      </div>
    </div>
  );
}

export default App;
