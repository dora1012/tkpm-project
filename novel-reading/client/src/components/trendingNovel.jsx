import axios from 'axios';
import {slugify} from '../utils/slugify'
import { useEffect, useState } from 'react';


const trendingNovel = () => {
    const [novelData, setNovelData] = useState([]);

    useEffect(() => {
        // Fetch novel list from backend
        const fetchTrendingNovel = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/api/truyen-hot');
                console.log(import.meta.env.VITE_SERVER_DOMAIN + '/api/truyen-hot');
                const data =response.data;
                setNovelData(data);
            } catch (error) {
                console.error('Error fetching trending novel:', error);
            }
        };
  
  
        fetchTrendingNovel();
      }, []);


    return (
        <div className='container w-10/12 mx-auto'>
            <div className='font-semibold text-center mt-10 mb-10 flex justify-start mx-auto'>
                <p className="text-3xl">Truyện Hot
                    <i className="fi fi-bs-arrow-trend-up ml-5 text-3xl"></i>
                </p>
            </div>
            {/* Cards */}
            <div>
                <div className='ml-20 grid grid-cols-2 sm:grid-cols-8 gap-2'>
                    {novelData.map((novel) => (
                        <a href={`/${slugify(novel.title)}`} key={novel.title} className='mb-5 cursor-pointer rounded-md hover:shadow-md p-3'>
                            <img src={novel.image} alt="Novel Image" className='w-[129px] h-[192px] object-cover rounded-md mx-auto' />
                            <div className='flex flex-col items-center mt-1'>
                                <p className='font-semibold'>{novel.title}</p>
                                {/* <p className='text-md text-center'>{novel.author}</p> */}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default trendingNovel;