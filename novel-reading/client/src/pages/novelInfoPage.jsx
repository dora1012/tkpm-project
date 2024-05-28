import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import TrendingNovelSideBar from '../components/trendingNovelSideBar';
import axios from 'axios'


const novelInfoPage = () => {
    const { slug } = useParams(); // Get the slug from URL
    // const novel = novelData.find(n => slugify(n.title) === slug); // Find the novel matching the slug
    // // const firstChapter = novel.chapterList[0];
    // if (!novel) {
    //   return <div className='text-4xl text-red mx-auto my-auto'>Page not found</div>; // Handle case where novel is not found
    // }
    const [novelData, setNovelData] = useState([]);
    useEffect(() => {
        // Fetch novel information from backend
        const fetchNovelInfo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${slug}`);
                console.log(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${slug}`);
                setNovelData(response.data);
            } catch (error) {
                console.error('Error fetching novel info:', error);
            }
        };

        fetchNovelInfo();
    }, [slug]);
    const { title ='', image, authors = [], categories = [], description, chapterList = [] } = novelData;
    const extractChapterNumber = (chapter) => {
        const match = chapter.match(/Chương \d+/i);
        return match ? match[0] : chapter;
    };
    return (
        <div>
        <div className="bg-coral-pink">
            <div className="container w-9/12 mx-auto flex gap-20 px-20 py-20 bg-white">
                <img src={image} alt="Cover" className="h-[310px] w-[220px] object-cover" />
                <div className="book-info flex flex-col flex-wrap gap-7">
                    <h1 className="text-3xl">{title}</h1>
                    <p><span className="font-semibold">Tác giả:</span> {authors.join(', ')}</p>
                    <p><span className="font-semibold">Thể loại:</span> {categories.join(', ')}</p>
                    <div><span className="font-semibold">Mô tả truyện:</span> {description}</div>
                    <div className="book-actions mt-30">
                        <button className="btn-dark">
                            <a href={`/${slugify(title)}/chuong-1`}>Đọc truyện</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex w-9/12 mx-auto mt-10'>
            <div className='w-9/12 mx-auto mt-10'>
                <p className="font-semibold text-4xl mb-3">Danh sách chương:</p>
                <div className="chapter-list mt-5 columns-2 w-10/12">
                        {chapterList.map((chapter, index) => {
                            const chapterNumber = extractChapterNumber(chapter);
                            return (
                                <a href={`/${slugify(title)}/${slugify(chapterNumber)}`} key={index} className="mb-5 break-inside-avoid block hover:text-coral-pink">
                                    <strong>{chapter}</strong>
                                </a>
                            );
                        })}
                    </div>
            </div>
            <TrendingNovelSideBar />
        </div>
    </div>
  )
}

export default novelInfoPage;