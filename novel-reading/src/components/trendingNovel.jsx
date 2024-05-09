import { useEffect, React, useState } from 'react'
import book1 from '../imgs/Book1.jpg'
import book2 from '../imgs/Book2.jpg'
import book3 from '../imgs/Book3.jpg'
import book4 from '../imgs/Book4.jpg'
import book5 from '../imgs/Book5.jpg'
import {slugify} from '../utils/slugify'
export const novelData = [
    {
        id: 1,
        title: "Tự Cẩm",
        author: "Đông Thiên Đích Liễu Diệp",
        img: book1,
        chapters: 828
    },
    {
        id: 2,
        title: "Trùng Sinh: Rồng Ở Đô Thị",
        author: "Phương Minh",
        img: book2,
        chapters: 49
    },
    {
        id: 3,
        title: "Linh Vũ Thiên Hạ",
        author: "Vũ Phong",
        img: book3,
        chapters: 5024
    },
    {
        id: 4,
        title: "Sắc Xuân Gửi Người Tình",
        author: "Xá Mục Tư",
        img: book4,
        chapters: 11
    },
    {
        id: 5,
        title: "Đức Dương Quận Chúa",
        author: "Thâm Hải Lý Đích Vân Đóa",
        img: book5,
        chapters: 156
    },
    {
        id: 1,
        title: "Tự Cẩm",
        author: "Đông Thiên Đích Liễu Diệp",
        img: book1,
        chapters: 828
    },
    {
        id: 2,
        title: "Trùng Sinh: Rồng Ở Đô Thị",
        author: "Phương Minh",
        img: book2,
        chapters: 49
    },
    {
        id: 3,
        title: "Linh Vũ Thiên Hạ",
        author: "Vũ Phong",
        img: book3,
        chapters: 5024
    },
    {
        id: 4,
        title: "Sắc Xuân Gửi Người Tình",
        author: "Xá Mục Tư",
        img: book4,
        chapters: 11
    },
    {
        id: 5,
        title: "Đức Dương Quận Chúa",
        author: "Thâm Hải Lý Đích Vân Đóa",
        img: book5,
        chapters: 156
    }
];

const trendingNovel = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
    const generateSlugs = async () => {
      const slugs = await Promise.all(novelData.map(novel => slugify(novel.title)));
      setUrls(slugs);
    };
    generateSlugs();},
    []);
  return (
        <div className='container w-10/12 mx-auto'>
            <div className='font-semibold text-center mt-10 mb-10 ml-20 flex justify-start mx-auto'>
                <p className="text-3xl">Truyện Hot
                <i class="fi fi-bs-arrow-trend-up ml-5 text-3xl"></i>
                </p>
            </div>
            {/*Cards*/}
            <div>
                <div className='ml-20 grid grid-cols-2 sm:grid-cols-5 gap-3'>
                    {
                        novelData.map((novel)=>(
                            <a href={`/${slugify(novel.title)}`} className='mb-5 cursor-pointer'>
                                <img src={novel.img} alt="Novel Image" className='w-[129px] h-[192px] object-cover rounded-md'/>
                                <div className='align-center'>
                                    <p className='font-semibold'>{novel.title}</p>
                                    <p className='text-md'>{novel.author}</p>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
           
        </div>
  )
}

export default trendingNovel;