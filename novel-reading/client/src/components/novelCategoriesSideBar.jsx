import React, {useEffect, useState} from 'react'
import { slugify } from '../utils/slugify'
import axios from 'axios'

const novelCategoriesSideBar = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    // Fetch novel list from backend
    const fetchNovelContent = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/api/the-loai');
            if (Array.isArray(response.data)) {
              setCategoryList(response.data);
          }
        } catch (error) {
            console.error('Error fetching category list:', error);
        }
    };


    fetchNovelContent();
  }, []);
  return (
    <div className="w-100% bg-white shadow-md mt-9">
            <p className="text-3xl font-semibold p-4 my-5 border-b border-grey">Thể loại truyện</p>
            <ul className="columns-2 px-10 mx-auto">
                {categoryList.map((category, index) => (
                        <a key={index} href={`/the-loai/${slugify(category)}`}>
                            <p className="text-md font-semibold mb-4 hover:text-coral-pink px-3">{category}</p>
                        </a>
                ))}
            </ul>
        </div>
  )
}

export default novelCategoriesSideBar