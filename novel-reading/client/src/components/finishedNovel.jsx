import React from 'react'
import { novelData } from '../utils/fetchFromAPI';
import {slugify} from '../utils/slugify'

const finishedNovel = () => {
    const NovelData = novelData;
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
                        
                        NovelData.map((novel)=>{
                            const latestChapter = novel.chapterList[novel.chapterList.length - 1];
                            return (
                            <a href={`/${slugify(novel.title)}`} className='mb-5 cursor-pointer rounded-md hover:shadow-md p-3'>
                                <img src={novel.img} alt="Novel Image" className='w-[129px] h-[192px] object-cover rounded-md mx-auto'/>
                                <div className='flex flex-col items-center mt-1'>
                                    <p className='font-semibold'>{novel.title}</p>
                                    <p className='text-md text-center rounded-full bg-coral-pink px-3 text-white'>
                                        {/* {novel.tags.map((tag)=>(<span>New</span>))} */}
                                        Full - {latestChapter.chapterNumber} chương
                                    </p>
                                </div>
                            </a>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default finishedNovel