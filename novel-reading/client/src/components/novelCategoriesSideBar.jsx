import React from 'react'
import { novelCategories } from '../utils/fetchFromAPI'
import { slugify } from '../utils/slugify'

const novelCategoriesSideBar = () => {
  return (
    <div className="w-100% bg-white shadow-md h-[600px] mt-9">
            <p className="text-3xl font-semibold p-4 my-5 border-b border-grey">Thể loại truyện</p>
            <ul className="columns-2 px-10 mx-auto">
                {novelCategories.map((category, index) => (
                        <a href={`/${slugify(category)}`}>
                            <p className="text-md font-semibold mb-4 hover:text-coral-pink px-3">{category}</p>
                        </a>
                ))}
            </ul>
        </div>
  )
}

export default novelCategoriesSideBar