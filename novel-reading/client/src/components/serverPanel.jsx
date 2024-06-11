import React, { useState, useRef, useEffect } from "react";

const serverPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState("defaultSource");
  const ref = useRef(null);
  const featureRef = useRef(null);
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
  const handleServerSelection = (server) => {
    setSelectedServer(server);
    setIsOpen(false);
    onSelectServer(server);
  };
  return (
    <div className="fixed top-2/3 right-20 transform -translate-y-1/2 z-50">
      <button
        ref={featureRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-coral-pink text-white p-5 rounded-lg shadow-lg"
      >
        <i className="fi fi-sr-chart-simple"></i>
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-14 w-64 bg-white text-coral-pink p-4 rounded-lg shadow-lg"
        >
          <p className="text-2xl font-semibold mb-4">Chọn Server</p>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="server"
                value="truyenfull"
                checked={selectedServer === "truyenfull"}
                onChange={() => handleServerSelection("truyenfull")}
              />
              Server 1
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="server"
                value="thichtruyen"
                checked={selectedServer === "thichtruyen"}
                onChange={() => handleServerSelection("thichtruyen")}
              />
              Server 2
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="server"
                value="defaultSource"
                checked={selectedServer === "defaultSource"}
                onChange={() => handleServerSelection("defaultSource")}
              />
              Mặc định
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default serverPanel;
