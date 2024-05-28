import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {slugify} from '../utils/slugify'

const finishedNovel = () => {
    const [novelData, setNovelData] = useState([]);

    useEffect(() => {
        // Fetch novel list from backend
        const fetchFinishedNovel = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/api/truyen-da-hoan-thanh');
                const data =response.data;
                setNovelData(data);
            } catch (error) {
                console.error('Error fetching finished novel:', error);
            }
        };
  
  
        fetchFinishedNovel();
      }, []);
    return (
        <div className='container w-10/12 mx-auto'>
            <div className='font-semibold text-center mt-10 mb-10 flex justify-start mx-auto'>
                <p className="text-3xl">Truyện Đã Hoàn Thành
                </p>
            </div>
            {/*Cards*/}
            <div>
                <div className='ml-20 grid grid-cols-2 sm:grid-cols-6 gap-2'>
                    {
                        novelData.map((novel)=> (
                            <a href={`/${slugify(novel.title)}`} className='mb-5 cursor-pointer rounded-md hover:shadow-md p-3'>
                                <img src={novel.image} alt="Novel Image" className='w-[129px] h-[192px] object-cover rounded-md mx-auto'/>
                                <div className='flex flex-col items-center mt-1 justify-end'>
                                    <p className='font-semibold'>{novel.title}</p>
                                    <p className='text-md text-center rounded-full bg-coral-pink px-3 text-white'>
                                        {novel.caption}
                                    </p>
                                </div>
                            </a>
                        )
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default finishedNovel