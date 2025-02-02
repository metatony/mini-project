import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [rotateDirection, setRotateDirection] = useState(1); // used 1 for clockwise and -1 for anti-clockwise

  const handleClick = () => {
    setRotateDirection((prev) => prev * -1); //reverse direction on when icon is clicked
  };
  return (
    <>
      <div>
        <a>
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
            style={{
              transform: `rotate(${rotateDirection * 90}deg)`,
              transition: "transform 1s",
            }}
            onClick={handleClick}
          />
        </a>
      </div>
    </>
  );
}

export default App;
