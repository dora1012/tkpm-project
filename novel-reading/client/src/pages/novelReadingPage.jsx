import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import { novelData } from '../utils/fetchFromAPI';
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";
import SettingPanel from "../components/settingPanel";
import { useEffect } from "react";
import axios from "axios";
import ExportSettingsPanel from "../components/exportSettingsPanel";
import { useLocation } from "react-router-dom";
import { getBookmark, setBookmark, clearBookmark } from "../utils/bookmarkUtils";

const novelReadingPage = () => {
  const extractChapterNumber = (chapterString) => {
    const match = chapterString.match(/\d+$/);
    return match ? parseInt(match[0], 10) : null;
  };
  const [novelData, setNovelData] = useState([]);
  const { slug, chapterNumber } = useParams();
  const navigate = useNavigate();
  // const novel = novelData.find(n => slugify(n.novelTitle) === slug);
  const currentChapter = parseInt(extractChapterNumber(chapterNumber), 10);

  // const location = useLocation();
  // const authors = location.state?.authors || "Unknown Author";
  // console.log(authors);

  useEffect(() => {
    // Fetch novel list from backend
    const fetchNovelContent = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_DOMAIN +
            "/api/" +
            slug +
            "/" +
            chapterNumber
        );
        const data = response.data;
        setNovelData(data);

        // Mark the chapter as read in local storage
        let readChapters = JSON.parse(localStorage.getItem(slug)) || [];
        if (!readChapters.includes(chapterNumber)) {
          readChapters.push(chapterNumber);
          localStorage.setItem(slug, JSON.stringify(readChapters));
        }

        // Mark the last read chapter in local storage
        localStorage.setItem(slug + "-last-read", chapterNumber);
      } catch (error) {
        console.error("Error fetching chapter content:", error);
      }
    };

    fetchNovelContent();

    const savedBookmark = getBookmark(slug);
    if (savedBookmark !== null) {
      setBookmarkedLine(savedBookmark);
    }
  }, [slug, chapterNumber]); // Add dependencies to the useEffect hook

  // Get settings from local storage

  const [background, setBackground] = useState(
    localStorage.getItem("background") || "white"
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "base"
  );
  const [fontStyle, setFontStyle] = useState(
    localStorage.getItem("fontStyle") || "sans-serif"
  );
  const [lineSpacing, setLineSpacing] = useState(
    parseFloat(localStorage.getItem("lineSpacing")) || 1.5
  );

  const isDarkBackground = (color) => {
    const darkColors = ["black"];
    return darkColors.includes(color);
  };

  const textColor = isDarkBackground(background) ? "text-white" : "text-black";

  // if (!novel) {
  //   return <div>Novel not found</div>;
  // }

  if (!currentChapter) {
    return <div>Chapter not found</div>;
  }

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      navigate(`/${slug}/chuong-${currentChapter - 1}`);
    }
  };

  // const handleNextChapter = () => {
  //   if (currentChapter < novel.chapterList.length - 1) {
  //     navigate(`/${slug}/chuong-${currentChapter + 1}`);
  //   }
  // };
  const [bookmarkedLine, setBookmarkedLine] = useState(null);

  const handleBookmarkClick = (index) => {
    if (bookmarkedLine === index.toString()) {
      clearBookmark(slug);
      setBookmarkedLine(null);
    } else {
      setBookmark(slug, index.toString());
      setBookmarkedLine(index.toString());
    }
  };

  const replaceTags = (html) => {
    return html.replace(/<p>/g, ' ').replace(/<\/p>/g, '').replace(/<div[^>]*>/g, ' ').replace(/<\/div>/g, '');
  };

  const renderContentWithBookmarks = () => {
    if (!novelData.chapterContent) return null;

    const content = replaceTags(novelData.chapterContent)
    // Split content by <br> tags and map each line
    const lines = content.split('<br>');

    return lines.map((line, index) => (
      <div key={index} className="relative group flex items-start" id={`line-${index}`}>
        {bookmarkedLine === index.toString() && (
          <div className="absolute left-0 top-0 cursor-pointer">
            ⭐
          </div>
        )}
        <span
          className={`bookmarkable text-${fontSize} ${bookmarkedLine === index.toString()}`}
          style={{ lineHeight: lineSpacing, marginLeft: bookmarkedLine === index.toString() ? '1.5em' : '0' }}
          onClick={() => handleBookmarkClick(index.toString())}
        >
          {line}
        </span>
        <br />
      </div>
    ));
  }
  return (
    <div
      className={`container mx-auto p-8 w-full shadow ${textColor}`}
      style={{ backgroundColor: background, fontFamily: fontStyle }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold mx-auto">{novelData.novelTitle}</h1>
        <p className="text-smoke">{novelData.chapterTitle}</p>
      </div>
      <div className="w-9/12 border border-grey mx-auto mt-5"></div>
      {/* <div className="w-1/2 flex justify-between items-center mx-auto mb-4 mt-8">
        <button
          className="bg-coral-pink text-white py-2 px-4 rounded"
          onClick={handlePreviousChapter}
          disabled={currentChapter <= 1}
        >
          Chương trước
        </button>
        <select
          className="bg-coral-pink text-white py-2 px-4 rounded"
          value={currentChapter}
          onChange={(e) => navigate(`/${slug}/chuong-${e.target.value}`)}
        >
          {novel.chapterList.map(chapter => (
            <option key={chapter.chapterNumber} value={chapter.chapterNumber}>
              Chương {chapter.chapterNumber}
            </option>
          ))}
        </select>
        <button
          className="bg-coral-pink text-white py-2 px-4 rounded"
          onClick={handleNextChapter}
          disabled={currentChapter >= novel.chapterList.length}
        >
          Chương sau
        </button>
      </div> */}
      <div className="prose max-w-none w-9/12 mx-auto">
        <div style={{ lineHeight: `${lineSpacing}` }}>
          {renderContentWithBookmarks()}
        </div>
      </div>
      {/* <div className="w-4/6 flex justify-between items-center mx-auto mb-4 mt-8">
        <button
          className="bg-coral-pink text-white py-2 px-4 rounded"
          onClick={handlePreviousChapter}
          disabled={currentChapter <= 1}
        >
          Chương trước
        </button>
        <select
          className="bg-coral-pink text-white py-2 px-4 rounded"
          value={currentChapter}
          onChange={(e) => navigate(`/${slug}/chuong-${e.target.value}`)}
        >
          {novel.chapterList.map(chapter => (
            <option key={chapter.chapterNumber} value={chapter.chapterNumber}>
              Chương {chapter.chapterNumber}
            </option>
          ))}
        </select>
        <button
          className="bg-coral-pink text-white py-2 px-4 rounded"
          onClick={handleNextChapter}
          disabled={currentChapter >= novel.chapterList.length}
        >
          Chương sau
        </button>
      </div> */}
      <SettingPanel
        onChangeBackground={setBackground}
        onChangeFontStyle={setFontStyle}
        onChangeFontSize={setFontSize}
        onChangeLineSpacing={setLineSpacing}
        currentBackground={background}
        currentFontStyle={fontStyle}
        currentFontSize={fontSize}
        currentLineSpacing={lineSpacing}
      />
      <ExportSettingsPanel
        chapterContent={novelData.chapterContent || ""}
        novelTitle={novelData.novelTitle || ""}
        chapterTitle={novelData.chapterTitle || ""}
        author={""}
      />
    </div>
  );
};

export default novelReadingPage;
