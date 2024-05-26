import React, { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import { novelData } from '../utils/fetchFromAPI';
import { useLocation, Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const novelSearchingPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    const [currentPage, setCurrentPage] = useState(1);
    const novelsPerPage = 10;



    // Paginate the filtered novels
    const totalPages = Math.ceil(novelData.length / novelsPerPage);
    return (
        <div className="p-4 w-9/12 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: {query}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {novelData.map((novel) => {
                    const latestChapter = novel.chapterList[novel.chapterList.length - 1];
                    return (
                        <Link
                            to={`/${slugify(novel.title)}`}
                            key={novel.title}
                            className="mb-5 cursor-pointer rounded-md hover:shadow-md p-3 shadow"
                        >
                            <div className="flex">
                                <img
                                    src={novel.img}
                                    alt="Novel Image"
                                    className="w-[129px] h-[192px] object-cover rounded-md"
                                />
                                <div className="flex flex-col mt-1 ml-5 gap-4">
                                    <div className="flex">
                                        <p className="font-semibold">{novel.title}</p>
                                        {novel.tags.map((tag, index) => (
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
                                        ))}
                                    </div>
                                    <p className="text-md">{novel.author}</p>
                                    <span>
                                        Đọc chương hiện tại:{' '}
                                        <Link
                                            to={`/${slugify(novel.title)}/chuong-${latestChapter.chapterNumber}`}
                                            className="py-2 px-1 text-center hover:text-coral-pink mr-auto"
                                        >
                                            Chương {latestChapter.chapterNumber}
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default novelSearchingPage;
