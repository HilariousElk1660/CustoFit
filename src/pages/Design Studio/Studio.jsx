import React from "react";
import { useRef, useState } from "react";
import Customizer from "../../components/Canvas/Canvas.jsx";
import CustomizePanel from "../../components/CustomizePanel/CustomizePanel.jsx";
import "./Studio.css";

function Studio() {
  const customizerRef = useRef(null);
  const [zoom, setZoom] = useState(5);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeDirection, setActiveDirection] = useState("F");
  const [hoodieColors, setHoodieColors] = useState({
    part1: "#000000",
    part2: "#000000",
    part3: "#000000",
    part4: "#000000",
  });

  const handleDirectionClick = (dir) => {
    customizerRef.current?.setDirection(dir);
    setActiveDirection(dir);
  };

  const handleReset = () => {
    customizerRef.current?.reset();
  };

  const handleZoomIn = () => {
    customizerRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    customizerRef.current?.zoomOut();
  };

  return (
    <>
      <div className="studio-container">
        <div className="studio-text-container">
          <h1 className="studio-main-text">3D Design Studio</h1>
          <p className="studio-sub-text">
            Create your custom clothing with our interactive 3D designer. Choose
            colors, add designs, and see your creation come to life in
            real-time.
          </p>
        </div>
        <div className="studio-content">
          <div className="studio-3d-model">
            <div className="studio-3d-model-inner-container">
              <div className="studio-3d-model-container">
                <Customizer
                  ref={customizerRef}
                  zoom={{ value: zoom, set: setZoom }}
                  fullscreen={{ value: fullscreen, set: setFullscreen }}
                  hoodieColors={hoodieColors}
                />

                {/* <CustomizePanel
                  hoodieColors={hoodieColors}
                  setHoodieColors={setHoodieColors}
                /> */}
              </div>
              <div className="studio-controls">
                {["F", "B", "L", "R"].map((dir) => (
                  <button
                    key={dir}
                    className={`direction ${
                      activeDirection === dir ? "active" : ""
                    }`}
                    onClick={() => handleDirectionClick(dir)}
                    title={`View from ${
                      dir === "F"
                        ? "Front"
                        : dir === "B"
                        ? "Back"
                        : dir === "L"
                        ? "Left"
                        : "Right"
                    }`}
                  >
                    {dir}
                  </button>
                ))}

                <button onClick={handleReset} title="Reset Camera">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>

                <button onClick={handleZoomIn} title="Zoom In">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    <line x1="11" x2="11" y1="8" y2="14"></line>
                    <line x1="8" x2="14" y1="11" y2="11"></line>
                  </svg>
                </button>

                <button onClick={handleZoomOut} title="Zoom Out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    <line x1="8" x2="14" y1="11" y2="11"></line>
                  </svg>
                </button>

                <button title="Take Photo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <CustomizePanel
            hoodieColors={hoodieColors}
            setHoodieColors={setHoodieColors}
          />
        </div>
      </div>
    </>
  );
}

export default Studio;
