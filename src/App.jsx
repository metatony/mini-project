import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [rotateDirection, setRotateDirection] = useState(1); // used 1 for clockwise and -1 for anti-clockwise
  const [iconSize, setIconSize] = useState(100); // default icon size

  const handleClick = () => {
    setRotateDirection((prev) => prev * -1); // this function reverses the rotation direction when icon is clicked
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newSize = Math.max(50, Math.min(200, (clientX + clientY) / 8)); // adjust icon size based on cursor position

    setIconSize(newSize);
  };
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
      </div>
    </div>
  );
}

export default App;
