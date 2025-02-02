import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // state variables to handle different functionalities
  const [rotateDirection, setRotateDirection] = useState(1); // used 1 for clockwise and -1 for anti-clockwise
  const [iconSize, setIconSize] = useState(100); // default icon size
  const [idleTime, setIdleTime] = useState(0); //tracks how long the mouse has been idle
  const [isMoving, setIsMoving] = useState(false); // tracks if the mouse is moving
  const [showSidebar, setShowSidebar] = useState(false); // controls sidebar visibility
  const [showRotation, setShowRotation] = useState(true); // toggle for rotation
  const [showResize, setShowResize] = useState(true); // toggle for image resizing
  const [showIdleTime, setShowIdleTime] = useState(true); // toggle for idle time tracking

  // Function to handle icon rotation when clicked
  const handleClick = () => {
    if (showRotation) {
      setRotateDirection((prev) => prev * -1); // this function reverses the rotation direction when icon is clicked
    }
  };

  // Function to adjust icon size based on mouse position
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (showResize) {
      const newSize = Math.max(120, Math.min(200, (clientX + clientY) / 8)); // adjust icon size based on cursor position
      setIconSize(newSize);
    }
  };

  // Effect to track mouse idle time
  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      setIsMoving(true);
      setIdleTime(0); // reset idle time when movement is detected
      clearTimeout(idleTimer); // Clear any existing timer
      idleTimer = setTimeout(() => setIsMoving(false), 500);
    };

    window.addEventListener("mousemove", resetIdleTimer);

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  // Effect to increment idle time every second when the mouse is idle
  useEffect(() => {
    let interval;
    if (!isMoving && showIdleTime) {
      interval = setInterval(() => {
        setIdleTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isMoving, showIdleTime]);

  return (
    <div onMouseMove={handleMouseMove}>
      <button
        className="sidebar-toggle"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      <div className={`sidebar ${showSidebar ? "visible" : ""}`}>
        <label>
          <input
            type="checkbox"
            checked={showRotation}
            onChange={() => setShowRotation(!showRotation)}
          />
          Toggle Rotation
        </label>
        <label>
          <input
            type="checkbox"
            checked={showResize}
            onChange={() => setShowResize(!showResize)}
          />
          Toggle Resize
        </label>
        <label>
          <input
            type="checkbox"
            checked={showIdleTime}
            onChange={() => setShowIdleTime(!showIdleTime)}
          />
          Toggle Idle Time
        </label>
      </div>
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
      {showIdleTime && <p>Idle Time: {idleTime} seconds</p>}
    </div>
  );
}

export default App;
