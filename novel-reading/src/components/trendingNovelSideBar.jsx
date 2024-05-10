import React from 'react'
import { novelData } from '../utils/fetchFromAPI'
import { slugify } from '../utils/slugify'

const trendingNovelSideBar = () => {
  return (
    <div className="w-100% bg-white shadow-md">
            <h3 className="text-sm font-bold p-4 border-b border-grey">TRUYỆN ĐANG HOT</h3>
            <ul>
                {novelData.map((novel, index) => (
                    <li key={novel.id} className="px-4 py-2 border-b border-grey flex items-center hover:bg-grey">
                        <span className={`text-lg font-bold mr-2 ${index < 3 ? 'text-red-500' : 'text-gray-500'}`}>{index + 1}</span>
                        <a href={`/${slugify(novel.title)}`}>
                            <h4 className="font-bold text-crimson">{novel.title}</h4>
                            <p className="text-sm text-gray-600">{novel.categories}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default trendingNovelSideBar