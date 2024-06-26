import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";
import SettingPanel from "../components/settingPanel";
import { useEffect } from "react";
import axios from "axios";
import ExportSettingsPanel from "../components/exportSettingsPanel";
import { useLocation } from "react-router-dom";
import { getBookmark, setBookmark, clearBookmark } from "../utils/bookmarkUtils";
import ChapterNavigation from "../components/chapterNavigation";
import ServerPanel from "../components/serverPanel";

const novelReadingPage = () => {
  const extractChapterNumber = (chapterString) => {
    const match = chapterString.match(/\d+$/);
    return match ? parseInt(match[0], 10) : null;
  };

  const extractLastChapterNumber = (chapter) => {
    const match = chapter.match(/Chương (\d+):/i);
    return match ? match[1] : null;
  };
  const [novelData, setNovelData] = useState([]);
  const [totalChapters, setTotalChapters] = useState();
  const [chapterData, setChapterData] = useState([]);
  const [serverOrder, setServerOrder] = useState([]);
  const { slug, chapterNumber } = useParams();
  const storedServerOrder = JSON.parse(localStorage.getItem('serverOrder'));
  const initialServer = storedServerOrder ? storedServerOrder[0] : "truyenfull";
  const [server, setServer] = useState(initialServer);
  let serverIndex = 0;
  //const [server, setServer] = useState("defaultSource");
  const navigate = useNavigate();
  const currentChapter = parseInt(extractChapterNumber(chapterNumber), 10);
  const prevMaxPageNumberRef = useRef();

  const handleServerOrderChange = (newOrder) => {
    setServerOrder(newOrder);
    localStorage.setItem("serverOrder", JSON.stringify(newOrder));
    console.log("New server order:", newOrder);
  };

  const onServerClick = async (serverId) => {
    try {
      setServer(serverId);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN +
        "/api/" +
        slug +
        "/" +
        chapterNumber +
        "/" +
        serverId
      );
      const data = response.data;
      setNovelData(data);
    } catch (error) {
      console.error("Error fetching chapter content:", error);
      //TODO: display error message
      setNovelData([]); // should be an error message
    }
  };

  useEffect(() => {
    // Fetch novel list from backend
    const fetchNovelContent = async () => {
      if (serverIndex >= serverOrder.length) {
        console.error("No server available");
        return;
      }
      try {
        const server = storedServerOrder[serverIndex];
        setServer(server);
        const response = await axios.get(
          import.meta.env.VITE_SERVER_DOMAIN +
          "/api/" +
          slug +
          "/" +
          chapterNumber + 
          "/" +
          server
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
        serverIndex++;
        await fetchNovelContent();
      }
    };

    const fetchTotalChapters = async()=>{
      try{
          const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${slug}/max-chuong`);
          setTotalChapters(response.data);
      }
      catch(error){
          console.error("Failed to fetch max page number: ",error);
      }
    };
    fetchTotalChapters();
    fetchNovelContent();

    const savedBookmark = getBookmark(slug);
    if (savedBookmark !== null) {
      setBookmarkedLine(savedBookmark);
    }
  }, [slug, chapterNumber, serverOrder]);

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
  // const totalChapters = 100;
  return (
    <div
      className={`container mx-auto p-8 w-full shadow ${textColor}`}
      style={{ backgroundColor: background}}
    >
      <div className="flex flex-col items-center justify-center gap-6">
      <Link
                    to={`/${slugify(novelData.novelTitle)}`}
                    className="font-bold text-3xl hover:text-coral-pink mx-auto"
                  >
                    {novelData.novelTitle}
      </Link>
        <p className="text-smoke">{novelData.chapterTitle}</p>
      </div>
      <div className="w-9/12 border border-grey mx-auto mt-5"></div>

      <ChapterNavigation novelTitle={novelData.novelTitle} currentChapter={currentChapter} totalChapters={totalChapters} />
      <div className="prose max-w-none w-9/12 mx-auto">
        <div style={{ lineHeight: `${lineSpacing}`, fontFamily: `${fontStyle}` }}>
          {renderContentWithBookmarks()}
        </div>
      </div>
      <ChapterNavigation novelTitle={novelData.novelTitle} currentChapter={currentChapter} totalChapters={totalChapters} />
      <div className="flex flex-col fixed top-1/3 right-20 transform -translate-y-1/2 z-50 gap-10">
        <ExportSettingsPanel
          chapterContent={novelData.chapterContent || ""}
          novelTitle={novelData.novelTitle || ""}
          chapterTitle={novelData.chapterTitle || ""}
          author={""}
        />
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

        <ServerPanel currentServer={server} onServerOrderChange={handleServerOrderChange} onServerClick={onServerClick} />
      </div>

    </div>
  );
};

export default novelReadingPage;
