import { novelData } from '../utils/fetchFromAPI';
import axios from 'axios';
import {slugify} from '../utils/slugify'
import { useEffect, useState } from 'react';


const trendingNovel = () => {
    // const [novelData, setNovelData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('/api/truyen-hot');
    //             if (Array.isArray(response.data)) {
    //                 setNovelData(response.data);
    //             } else {
    //                 throw new Error('Unexpected response format');
    //             }
    //             setLoading(false);
    //         } catch (err) {
    //             setError(err.message || 'Unknown error');
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='container w-10/12 mx-auto'>
            <div className='font-semibold text-center mt-10 mb-10 flex justify-start mx-auto'>
                <p className="text-3xl">Truyện Hot
                    <i className="fi fi-bs-arrow-trend-up ml-5 text-3xl"></i>
                </p>
            </div>
            {/* Cards */}
            <div>
                <div className='ml-20 grid grid-cols-2 sm:grid-cols-6 gap-2'>
                    {novelData.map((novel) => (
                        <a href={`/${slugify(novel.title)}`} key={novel.title} className='mb-5 cursor-pointer rounded-md hover:shadow-md p-3'>
                            <img src={novel.img} alt="Novel Image" className='w-[129px] h-[192px] object-cover rounded-md mx-auto' />
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