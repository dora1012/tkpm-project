import React from 'react'
import { novelData } from '../utils/fetchFromAPI'
import { slugify } from '../utils/slugify'

const novelTable = () => {
  return (
    <div className="container w-10/12 mx-auto my-8">
            <p className="font-semibold text-3xl mb-4">Truyện Mới Cập Nhật</p>
            <table className="min-w-full bg-white">
                <thead>
                    <tr className='text-center bg-coral-pink text-white'>
                        <th className="py-2 px-4 border-b">Tiêu đề</th>
                        <th className="py-2 px-4 border-b">Thể loại</th>
                        <th className="py-2 px-4 border-b">Chương mới nhất</th>
                        <th className="py-2 px-4 border-b">Cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                        {novelData.slice(0, 30).map((novel, index) => {
                        const latestChapter = novel.chapterList[novel.chapterList.length - 1];
                        return (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b border-r"><a href={`/${slugify(novel.title)}`} className="hover:text-coral-pink">{novel.title} </a>
                            {novel.tags.map((tag, index) => (
                                <div className="ml-3 inline-block">
                                    <span key={index} className={`inline-block px-2 py-1 rounded-full mr-1 border ${tag === "Full" ? " border-jade text-jade" : tag === "Hot" ? "border-red text-red" : "border-bright-blue text-bright-blue"}`}>
                                    {tag}
                                    </span>
                                </div>
                                
                            ))}</td>
                            <td className="py-2 px-4 border-b border-r text-center">{novel.categories}</td>
                            <td className="py-2 px-4 border-b border-r text-center">Chương {latestChapter.chapterNumber}</td>
                            <td className="py-2 px-4 border-b text-center"> {novel.updatedHour}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
  )
}

export default novelTable