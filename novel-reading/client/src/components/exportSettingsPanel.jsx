import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'
import { createEbook } from "../utils/fetchAPI";

const ExportSettingsPanel = ({
  chapterContent,
  novelTitle,
  chapterTitle,
  author,
}) => {
  const [type, setExportType] = useState("pdf");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formats, setFormats] = useState([]);
  const ref = useRef();

  useEffect(() => {
    // Fetch the list of ebook formats from the backend
    const fetchFormats = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_DOMAIN + "/api/ebook-formats"
        );
        console.log(response.data);
        if (response.data && Array.isArray(response.data.formats)) {
          setFormats(response.data.formats);
        }
      } catch (error) {
        console.error('Error fetching ebook formats:', error);
      }
    };

    fetchFormats();
  }, []);

  const handleExport = async (event) => {
    // event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // const response = await createEbook(
      //   type,
      //   chapterContent,
      //   author,
      //   novelTitle,
      //   chapterTitle
      //   // type,
      //   // "Chau Quy Duong",
      //   // "Duong",
      //   // "Chuong 1: Dem sao trang",
      //   // "Tieu thuyet di gioi"
      // );

      // const blob = new Blob([response.data], {
      //   type: "application/octet-stream"
      // });
      // const downloadUrl = window.URL.createObjectURL(blob);

      // const a = document.createElement("a");
      // a.href = downloadUrl;
      // a.download = `Title_of_the_Novel.${type}`;
      // // a.download = `Novel.${type}`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // window.URL.revokeObjectURL(downloadUrl);
      const downloadUrl = await createEbook(
        type,
        chapterContent,
        author,
        novelTitle,
        chapterTitle
      );
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Failed to create ebook:", error);
      setError("Error creating ebook: " + error.message);
      alert("Error creating ebook");
    }
    setIsLoading(false);
  };

  return (
    <div className="">
      <button
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-coral-pink text-white p-5 rounded-lg shadow-lg"
      >
        <i className="fi fi-rr-download"></i>
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-14 w-64 bg-white text-coral-pink p-4 rounded-lg shadow-lg"
        >
          <p className="text-2xl font-semibold mb-4">Xuất bản eBook</p>
          <select
            className="block w-full border border-smoke bg-white text-smoke py-2 px-4 rounded"
            onChange={(e) => setExportType(e.target.value)}
            value={type}
          >
            {formats.map((format, index) => (
              <option key={index} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            onClick={handleExport}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Đang tải xuống..." : "Tải xuống"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportSettingsPanel;
