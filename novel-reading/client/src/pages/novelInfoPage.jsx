import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import TrendingNovelSideBar from '../components/trendingNovelSideBar';
import { fetchNovelInfo } from '../utils/fetchAPI';
import loadingGif from '../imgs/loading.gif'
import ReadMore from '../components/readMore.jsx';

const novelInfoPage = () => {
    const { slug } = useParams(); 
    
    const [novelData, setNovelData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch novel information from backend
        const fetchData = async () => {
            
            try {
                const response = await fetchNovelInfo(slug);
                setNovelData(response.data);
            } catch (error) {
                console.error('Error fetching novel info:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);
    const { title = '', image, authors = [], categories = [], description, chapterList = [] } = novelData;
    const extractChapterNumber = (chapter) => {
        const match = chapter.match(/Chương \d+/i);
        return match ? match[0] : chapter;
    };

    // Get the read chapters from local storage
    const readChapters = JSON.parse(localStorage.getItem(slug)) || [];

    // Get the last read chapter from local storage
    const lastReadChapter = localStorage.getItem(slug + '-last-read');

    console.log(lastReadChapter);

    return (
        <div>
            <div className="bg-coral-pink">
                <div className="container w-9/12 mx-auto flex gap-20 px-20 py-20 bg-white">
                    {loading ? (
                        <div className="w-3/6 mx-auto">
                            <img src={loadingGif} alt="Loading"></img>
                        </div>
                    ) : (
                    <>
                        <img src={image} alt="Cover" className="h-[310px] w-[220px] object-cover" />
                        <div className="book-info flex flex-col flex-wrap gap-7">
                            <h1 className="text-3xl">{title}</h1>
                            <p><span className="font-semibold">Tác giả:</span> {authors.join(', ')}</p>
                            <p><span className="font-semibold">Thể loại:</span> {categories.join(', ')}</p>
                            <div><span className="font-semibold">Mô tả truyện:</span> <ReadMore content={description} maxLength={200} /></div>
                            <div className="book-actions mt-30">
                                <button className="btn-dark">
                                    <a href={`/${slugify(title)}/chuong-1`}>Đọc truyện</a>
                                </button>
                                {lastReadChapter && (
                                    <button className="btn-dark ml-4">
                                        <a href={`/${slugify(title)}/${lastReadChapter}`}>Đọc tiếp</a>
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                    )}
                </div>
            </div>
            <div className='flex w-9/12 mx-auto mt-10'>
                <div className='w-9/12 mx-auto mt-10'>
                    <p className="font-semibold text-4xl mb-3">Danh sách chương:</p>
                    <div className="chapter-list mt-5 columns-2 w-10/12">
                        {loading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="h-6 bg-grey rounded mb-3"></div>
                            ))
                        ) : (
                        chapterList.map((chapter, index) => {
                            const chapterNumber = extractChapterNumber(chapter);
                            const isRead = readChapters.includes(slugify(chapterNumber));
                            return (
                                <a href={`/${slugify(title)}/${slugify(chapterNumber)}`} key={index} className={`mb-5 break-inside-avoid block ${isRead ? 'text-coral-pink' : 'hover:text-coral-pink'}`}>
                                    <strong>{chapter}</strong>
                                </a>
                            );
                        }))}
                    </div>
                </div>
                <TrendingNovelSideBar />
            </div>
        </div>
    )
}

export default novelInfoPage;
