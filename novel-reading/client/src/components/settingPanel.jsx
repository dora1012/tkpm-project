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
  const [fontSize, setFontSize] = useState(20);
  const [background, setBackground] = useState("white");
  const [isOpen, setIsOpen] = useState(false);

  const handleFontSizeChange = (e) => {
    onChangeFontSize(e.target.value);
  };

  const handleFontStyleChange = (e) => {
    onChangeFontStyle(e.target.value);
  };

  const handleBackgroundChange = (e) => {
    onChangeBackground(e.target.value);
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
    <div className="fixed top-1/4 right-20 transform -translate-y-1/2 z-50">
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
          className="absolute right-0 top-14 w-64 bg-white text-coral-pink p-4 rounded-lg shadow-lg"
        >
          <p className="text-2xl font-semibold mb-4">Cài đặt tuỳ chọn</p>
          <div className="mb-4">
            <label className="block mb-2">Màu nền</label>
            <select
              className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
              onChange={handleBackgroundChange}
              value={currentBackground}
            >
              <option value="white">Trắng</option>
              <option value="beige">Beige</option>
              <option value="black">Black</option>
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
          <div className="mb-4">
            <label>Độ giãn dòng:</label>
            <input
              className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
              type="number"
              value={currentLineSpacing}
              onChange={(e) => onChangeLineSpacing(parseFloat(e.target.value))}
              step="0.2"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block mb-2">Xuất bản eBook</label>
            <ExportSettingsPanel content="Raiden Shogun" />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default settingPanel;
