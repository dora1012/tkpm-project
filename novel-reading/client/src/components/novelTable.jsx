import React, { useEffect, useState } from "react";
import { slugify } from "../utils/slugify";
import axios from "axios";

const novelTable = () => {
  const [novelData, setNovelData] = useState([]);
  useEffect(() => {
    // Fetch novel list from backend
    const fetchNovelTable = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_DOMAIN + "/api/truyen-moi-cap-nhat"
        );
        if (Array.isArray(response.data)) {
          setNovelData(response.data);
        }
      } catch (error) {
        console.error("Error fetching novel table:", error);
      }
    };

    fetchNovelTable();
  }, []);
  return (
    <div className="container w-10/12 mx-auto my-8">
      <p className="font-semibold text-3xl mb-4">Truyện Mới Cập Nhật</p>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-center bg-coral-pink text-white">
            <th className="py-2 px-4 border-b">Tiêu đề</th>
            <th className="py-2 px-4 border-b">Thể loại</th>
            <th className="py-2 px-4 border-b">Chương mới nhất</th>
            <th className="py-2 px-4 border-b">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {novelData.slice(0, 30).map((novel, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-r">
                <a
                  href={`/${slugify(novel.title)}`}
                  className="hover:text-coral-pink"
                >
                  {novel.title}{" "}
                </a>
              </td>
              {/* {novel.tags.map((tag, index) => (
                                    <div className="ml-3 inline-block">
                                        <span key={index} className={`inline-block px-2 py-1 rounded-full mr-1 border ${tag === "Full" ? " border-jade text-jade" : tag === "Hot" ? "border-red text-red" : "border-bright-blue text-bright-blue"}`}>
                                        {tag}
                                        </span>
                                    </div>
                                    
                                ))} */}
              <td className="py-2 px-4 border-b border-r text-center">
                {novel.categories.map((category, index) => (
                  <span key={index}>
                    <a
                      href={`/${slugify(category)}`}
                      className="hover:text-coral-pink"
                    >
                      {category}
                    </a>
                    {index < novel.categories.length - 1 && ", "}
                  </span>
                ))}
              </td>
              <td className="py-2 px-4 border-b border-r text-center">
              <a
                  href={`${slugify(novel.title)}/${slugify(novel.chapter)}`}
                  className="hover:text-coral-pink"
                >
                  {novel.chapter}
                </a>
              </td>
              <td className="py-2 px-4 border-b text-center">
                {" "}
                {novel.updateTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default novelTable;
