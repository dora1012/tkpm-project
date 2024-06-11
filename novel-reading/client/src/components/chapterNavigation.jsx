import React from 'react'
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const chapterNavigation = ({ novelTitle, currentChapter, totalChapters }) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedChapter = parseInt(event.target.value, 10);
    navigate(`/${slugify(novelTitle)}/chuong-${selectedChapter}`);
  };
  return (
    <div className="flex justify-between items-center mb-5 w-3/4 mx-auto mt-3">
      <button
        className="bg-coral-pink text-white py-2 px-4 rounded"
        onClick={() => navigate(`/${slugify(novelTitle)}/chuong-${currentChapter - 1}`)}
        disabled={currentChapter <= 1}
      >
        Chương trước
      </button>
      <select
        className="bg-coral-pink text-white py-2 px-4 rounded"
        value={currentChapter}
        onChange={handleChange}
      >
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
          <option key={chapter} value={chapter}>
            Chương {chapter}
          </option>
        ))}
      </select>
      <button
        className="bg-coral-pink text-white py-2 px-4 rounded"
        onClick={() => navigate(`/${slugify(novelTitle)}/chuong-${currentChapter + 1}`)}
        disabled={currentChapter >= totalChapters}
      >
        Chương sau
      </button>
    </div>
  )
}

export default chapterNavigation