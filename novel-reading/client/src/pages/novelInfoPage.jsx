import React from 'react'
import { novelData } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import TrendingNovelSideBar from '../components/trendingNovelSideBar';


const novelInfoPage = () => {
    const { slug } = useParams(); // Get the slug from URL
    const novel = novelData.find(n => slugify(n.title) === slug); // Find the novel matching the slug
  
    if (!novel) {
      return <div className='text-4xl text-red mx-auto my-auto'>Page not found</div>; // Handle case where novel is not found
    }
    return (
        <div >
            <div className="bg-coral-pink">
                <div className="container w-9/12 mx-auto flex gap-20  px-20 py-20 bg-white">
                    <img src={novel.img} alt="Cover" className="h-[310px] w-[220px] object-cover" />
                    <div className="book-info flex flex-col flex-wrap gap-7">
                        <h1 className="text-3xl">{novel.title}</h1>
                        <p><span className="font-semibold">Tác giả:</span> {novel.author}</p>
                        <p><span className="font-semibold">Thể loại:</span> {novel.categories}</p>
                        <div className="book-stats">
                            <div className="book-chapters"><span className="font-semibold">Số chương hiện tại:</span> {novel.chapters} chương</div>
                        </div>
                        <div className=""><span className="font-semibold">Mô tả truyện:</span> {novel.description}</div>
                        <div className="book-actions mt-30">
                            <button className="btn-dark">
                                <a href={`/${slugify(novel.title)}`}>Đọc truyện</a>
                            </button>
                        </div>
                    </div>  
                </div>
            </div>
            <div className='flex w-9/12 mx-auto mt-10'>
                <div className=' w-9/12 mx-auto mt-10'>
                    <p className="font-semibold text-4xl mb-3">Danh sách chương:</p>
                    <div className="chapter-list mt-5 columns-2 w-10/12">
                        {novel.chapterList.map(chapter => (
                            <a href={`/${slugify(novel.title)}/${slugify('Chương ' + chapter.chapterNumber)}`} key={chapter.chapterNumber} className="mb-5 break-inside-avoid block hover:text-coral-pink">
                                <strong>Chương {chapter.chapterNumber}: {chapter.title}</strong>
                                {/* <p>{chapter.summary}</p> */}
                            </a>
                        ))}
                    </div>
                </div>
                <TrendingNovelSideBar/>           
            </div>
            
        </div>
        
  )
}

export default novelInfoPage;