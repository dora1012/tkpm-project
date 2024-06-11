import React, { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import { useLocation, Link, useParams, useSearchParams } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import { fetchListResult } from '../utils/fetchAPI';
import { getReadableText } from '../utils/getReadableText';
import axios from 'axios';


const novelListPage = ({type}) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);

    const { subitem } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [novelData, setNovelData] = useState([]);
    const [maxPageNumber, setMaxPageNumber] = useState();
    
    useEffect(() => {
        // Fetch novel information from backend
        const fetchData = async () => {
            try {
                const response = await fetchListResult(type, subitem, currentPage);
                setNovelData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchMaxPageNumber = async()=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${type}/${subitem}/max-trang`);
                setMaxPageNumber(response.data);
            }
            catch(error){
                console.error("Failed to fetch max page number: ",error);
            }
        }

        fetchData();
        fetchMaxPageNumber();
    }, [type, subitem, currentPage]);

    

    useEffect(() => {
        setCurrentPage(page);
      }, [page]);
    
      const handlePageChange = (page) => {
        setSearchParams({ page });
        setCurrentPage(page);
      };

    return (
        <div className="p-4 w-9/12 mx-auto">
            <h1 className="text-2xl font-bold mb-4">{getReadableText(subitem)}</h1>
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
            <Pagination
        currentPage={currentPage}
        totalPages={maxPageNumber}
        onPageChange={handlePageChange}
        baseURL={location.pathname}
      />
        </div>
    );
}

export default novelListPage