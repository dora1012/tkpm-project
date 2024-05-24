import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { novelData } from '../utils/fetchFromAPI';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import SettingPanel from '../components/settingPanel';

const novelReadingPage = () => {
  const extractChapterNumber = (chapterString) => {
    const match = chapterString.match(/\d+$/);
    return match ? parseInt(match[0], 10) : null;
  };

  const { slug, chapterNumber } = useParams();
  const navigate = useNavigate();
  const novel = novelData.find(n => slugify(n.title) === slug);
  const currentChapter = parseInt(extractChapterNumber(chapterNumber), 10);

  const [background, setBackground] = useState('white');
  const [fontSize, setFontSize] = useState(20);
  const [fontStyle, setFontStyle] = useState('sans-serif');

  const isDarkBackground = (color) => {
    const darkColors = ['black'];
    return darkColors.includes(color);
  };

  const textColor = isDarkBackground(background) ? 'text-white' : 'text-black';

  if (!novel) {
    return <div>Novel not found</div>;
  }

  if (!currentChapter) {
    return <div>Chapter not found</div>;
  }

  const handlePreviousChapter = () => {
    if (currentChapter > 0) {
      navigate(`/${slug}/chuong-${currentChapter - 1}`);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < novel.chapterList.length - 1) {
      navigate(`/${slug}/chuong-${currentChapter + 1}`);
    }
  };

  return (
    <div className={`container mx-auto p-8 w-full shadow ${textColor}`} style={{ backgroundColor: background, fontFamily: fontStyle }}>
      <div className="flex flex-col items-center justify-center gap-6">
        <img src={novel.img} alt="Novel Cover" className="h-[310px] w-[220px] object-cover" />
        <h1 className="text-3xl font-bold mx-auto">{novel.title}</h1>
        <p className="text-smoke">Tác giả: {novel.author}</p>
      </div>
      <div className="w-9/12 border border-grey mx-auto mt-5"></div>
      <div className="w-1/2 flex justify-between items-center mx-auto mb-4 mt-8">
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
      </div>
      <div className={`prose max-w-none w-9/12 mx-auto text-5xl`}>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem porro culpa aspernatur quidem, corporis ducimus, aperiam hic voluptas voluptatibus aliquid impedit repellendus tempora veniam, dolore eos optio deleniti ab odit laudantium! Architecto dicta error obcaecati. Voluptates magni, quae libero ut veritatis ex dolorum alias id ea, tenetur labore minus sequi aperiam perferendis accusantium ullam ad officia facere? Fuga enim similique voluptas. Et, distinctio consequatur, pariatur modi exercitationem possimus unde soluta, eligendi culpa maxime quae ipsum id nesciunt earum sunt dolorum odio vitae eveniet adipisci nemo deserunt nisi molestiae! Tenetur inventore voluptatem ab quae in aut vitae vel voluptatum, deleniti eveniet.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem porro culpa aspernatur quidem, corporis ducimus, aperiam hic voluptas voluptatibus aliquid impedit repellendus tempora veniam, dolore eos optio deleniti ab odit laudantium! Architecto dicta error obcaecati. Voluptates magni, quae libero ut veritatis ex dolorum alias id ea, tenetur labore minus sequi aperiam perferendis accusantium ullam ad officia facere? Fuga enim similique voluptas. Et, distinctio consequatur, pariatur modi exercitationem possimus unde soluta, eligendi culpa maxime quae ipsum id nesciunt earum sunt dolorum odio vitae eveniet adipisci nemo deserunt nisi molestiae! Tenetur inventore voluptatem ab quae in aut vitae vel voluptatum, deleniti eveniet.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem porro culpa aspernatur quidem, corporis ducimus, aperiam hic voluptas voluptatibus aliquid impedit repellendus tempora veniam, dolore eos optio deleniti ab odit laudantium! Architecto dicta error obcaecati. Voluptates magni, quae libero ut veritatis ex dolorum alias id ea, tenetur labore minus sequi aperiam perferendis accusantium ullam ad officia facere? Fuga enim similique voluptas. Et, distinctio consequatur, pariatur modi exercitationem possimus unde soluta, eligendi culpa maxime quae ipsum id nesciunt earum sunt dolorum odio vitae eveniet adipisci nemo deserunt nisi molestiae! Tenetur inventore voluptatem ab quae in aut vitae vel voluptatum, deleniti eveniet.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem porro culpa aspernatur quidem, corporis ducimus, aperiam hic voluptas voluptatibus aliquid impedit repellendus tempora veniam, dolore eos optio deleniti ab odit laudantium! Architecto dicta error obcaecati. Voluptates magni, quae libero ut veritatis ex dolorum alias id ea, tenetur labore minus sequi aperiam perferendis accusantium ullam ad officia facere? Fuga enim similique voluptas. Et, distinctio consequatur, pariatur modi exercitationem possimus unde soluta, eligendi culpa maxime quae ipsum id nesciunt earum sunt dolorum odio vitae eveniet adipisci nemo deserunt nisi molestiae! Tenetur inventore voluptatem ab quae in aut vitae vel voluptatum, deleniti eveniet.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem porro culpa aspernatur quidem, corporis ducimus, aperiam hic voluptas voluptatibus aliquid impedit repellendus tempora veniam, dolore eos optio deleniti ab odit laudantium! Architecto dicta error obcaecati. Voluptates magni, quae libero ut veritatis ex dolorum alias id ea, tenetur labore minus sequi aperiam perferendis accusantium ullam ad officia facere? Fuga enim similique voluptas. Et, distinctio consequatur, pariatur modi exercitationem possimus unde soluta, eligendi culpa maxime quae ipsum id nesciunt earum sunt dolorum odio vitae eveniet adipisci nemo deserunt nisi molestiae! Tenetur inventore voluptatem ab quae in aut vitae vel voluptatum, deleniti eveniet.</p>
      </div>
      <div className="w-4/6 flex justify-between items-center mx-auto mb-4 mt-8">
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
      </div>
      <SettingPanel 
        onChangeBackground={setBackground} 
        onChangeFontStyle={setFontStyle} 
        onChangeFontSize={setFontSize} 
      />
    </div>
  );
};

export default novelReadingPage;
