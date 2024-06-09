import React, { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import { fetchSearchResult } from '../utils/fetchAPI';
import loadingGif from  '../imgs/loading.gif'

const novelSearchingPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    const [currentPage, setCurrentPage] = useState(1);
    const novelsPerPage = 10;
    const [novelData, setNovelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);
    

    useEffect(() => {
        // Fetch novel information from backend
        const fetchData = async () => {
            setNovelData([]);
            setLoading(true);
            setNoResults(false);

            try {
                const response = await fetchSearchResult(query);
                setNovelData(response.data);
                setLoading(false);

                if (response.data.length === 0) {
                        setNoResults(true);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);


    // Paginate the filtered novels
    const totalPages = Math.ceil(novelData.length / novelsPerPage);
    return (
        <div className="p-4 w-9/12 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Kết quả tìm kiếm cho: {query}</h1>
            {loading ? (
                <div className="w-3/6 mx-auto">
                    <img src={loadingGif} alt="Loading"></img>
                </div>
                
            ) : noResults ? (
                <p className="text-3xl text-coral-pink font-semibold">Không tìm thấy kết quả nào cho từ khóa "{query}".</p>
            ) : 
            (<div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
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
                                    className="w-[129px] h-[192px] object-cover rounded-md"
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
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default novelSearchingPage;
