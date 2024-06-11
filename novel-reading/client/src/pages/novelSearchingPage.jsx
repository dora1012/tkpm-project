import React, { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import axios from 'axios'
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import { fetchSearchResult } from '../utils/fetchAPI';
import loadingGif from  '../imgs/loading.gif'

const novelSearchingPage = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [currentPage, setCurrentPage] = useState(page);
    const [novelData, setNovelData] = useState([]);
    const [maxPageNumber, setMaxPageNumber] = useState();
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);
    

    useEffect(() => {
        // Fetch novel information from backend
        const fetchData = async () => {
            setNovelData([]);
            setLoading(true);
            setNoResults(false);

            try {
                const response = await fetchSearchResult(query, currentPage);

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
        const fetchMaxPageNumber = async()=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/tim-kiem/max-trang/?tukhoa=${query}`)
                setMaxPageNumber(response.data);
            }
            catch(error){
                console.error("Failed to fetch max page number: ",error);
            }
        }

        fetchData();
        fetchMaxPageNumber();
    }, [query, currentPage]);

    useEffect(() => {
        setCurrentPage(page);
      }, [page]);
    
      const handlePageChange = (page) => {
        setSearchParams({ query, page });
        setCurrentPage(page);
      };


    const totalPages = maxPageNumber;
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
            <Pagination
        currentPage={currentPage}
        totalPages={maxPageNumber}
        onPageChange={handlePageChange}
        baseURL={location.pathname}
        query={query}
      />
        </div>
    );
};

export default novelSearchingPage;
