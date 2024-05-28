import React, { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import axios from 'axios'
import { useLocation, Link, useParams } from 'react-router-dom';
import { slugify } from '../utils/slugify';


const novelListPage = ({type}) => {
    const { subitem } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const novelsPerPage = 10;
    const [novelData, setNovelData] = useState([]);
    useEffect(() => {
        // Fetch novel information from backend
        const fetchSearchResult = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${type}/${subitem}`);
                setNovelData(response.data);
            } catch (error) {
                console.error('Error fetching search result:', error);
            }
        };

        fetchSearchResult();
    }, [subitem]);


    // Paginate the filtered novels
    const totalPages = Math.ceil(novelData.length / novelsPerPage);
    return (
        <div className="p-4 w-9/12 mx-auto">
            <h1 className="text-2xl font-bold mb-4">{subitem}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {novelData.map((novel) => (
                        <Link
                            to={`/${slugify(novel.title)}`}
                            key={novel.title}
                            className="mb-5 cursor-pointer rounded-md hover:shadow-md p-3 shadow"
                        >
                            <div className="flex">
                                <img
                                    src={novel.image}
                                    alt="Novel Image"
                                    className="w-[50px] h-[75px] object-cover rounded-md"
                                />
                                <div className="flex flex-col mt-1 ml-5 gap-4">
                                    <div className="flex">
                                        <p className="font-semibold">{novel.title}</p>
                                        {/* {novel.tags.map((tag, index) => (
                                            <div key={index} className="ml-3 inline-block">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded-full mr-1 border ${
                                                        tag === 'Full'
                                                            ? 'border-jade text-jade'
                                                            : tag === 'Hot'
                                                            ? 'border-red text-red'
                                                            : 'border-bright-blue text-bright-blue'
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            </div>
                                        ))} */}
                                    </div>
                                    <p className="text-md">{novel.authors}</p>
                                    <span>
                                        Đọc chương hiện tại:{' '}
                                        <Link
                                            to={`/${slugify(novel.title)}/${slugify(novel.chapter)}`}
                                            className="py-2 px-1 text-center hover:text-coral-pink mr-auto"
                                        >
                                            {novel.chapter}
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default novelListPage