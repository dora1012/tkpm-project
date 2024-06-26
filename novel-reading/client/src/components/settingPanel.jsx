import React, { useState, useRef, useEffect } from "react";
import ExportSettingsPanel from "./exportSettingsPanel";

const settingPanel = ({
  onChangeBackground,
  onChangeFontStyle,
  onChangeFontSize,
  onChangeLineSpacing,
  currentLineSpacing,
  currentBackground,
  currentFontStyle,
  currentFontSize,
}) => {
  const ref = useRef();
  const featureRef = useRef();
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")) || 20
  );
  const [background, setBackground] = useState(
    localStorage.getItem("background") || "white"
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleFontSizeChange = (e) => {
    onChangeFontSize(e.target.value);
    localStorage.setItem("fontSize", e.target.value);
  };

  const handleFontStyleChange = (e) => {
    onChangeFontStyle(e.target.value);
    localStorage.setItem("fontStyle", e.target.value);
  };

  const handleBackgroundChange = (e) => {
    onChangeBackground(e.target.value);
    localStorage.setItem("background", e.target.value);
  };

  const handleLineSpacingChange = (e) => {
    const value = parseFloat(e.target.value);
    onChangeLineSpacing(value);
    localStorage.setItem("lineSpacing", value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !featureRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <button
        ref={featureRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-coral-pink text-white p-5 rounded-lg shadow-lg"
      >
        <i className="fi fi-rr-settings"></i>
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-30 w-64 bg-white text-coral-pink p-4 rounded-lg shadow-lg"
        >
          <p className="text-2xl font-semibold mb-4">Cài đặt hiển thị</p>
          <div className="mb-4">
            <label className="block mb-2">Màu nền</label>
            <select
              className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
              onChange={handleBackgroundChange}
              value={currentBackground}
            >
              <option value="white">Trắng</option>
              <option value="beige">Be</option>
              <option value="black">Đen</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Font chữ</label>
            <select
              className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
              onChange={handleFontStyleChange}
              value={currentFontStyle}
            >
              <option value="inter">Gelasio</option>
              <option value="gelasio">Inter</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Size chữ</label>
            <select
              className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
              onChange={handleFontSizeChange}
              value={currentFontSize}
            >
              <option value="sm">12</option>
              <option value="base">14</option>
              <option value="xl">16</option>
              <option value="2xl">20</option>
              <option value="3xl">28</option>
              <option value="4xl">38</option>
            </select>
          </div>
          <div>
            <label>Độ giãn dòng:</label>
            <input
              className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
              type="number"
              value={currentLineSpacing}
              onChange={handleLineSpacingChange}
              step="0.2"
              min="1"
              max="3"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default settingPanel;
