import React from 'react';
import { useNavigate } from 'react-router-dom';

const pagination = ({ currentPage, totalPages, onPageChange, baseURL, query}) => {
  const navigate = useNavigate();
  const pagesToShow = 5;

  const handlePageChange = (page) => {
    let url = `${baseURL}/trang-${page}`;
    if (query) {
      url = `${baseURL}?query=${query}&page=${page}`;
    }
    navigate(url);
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded-full bg-grey"
      >
        &laquo; Đầu
      </button>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded-full bg-grey"
      >
        &lt;
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-1 rounded-full ${
            page === currentPage ? 'bg-coral-pink text-white' : 'bg-grey'
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded-full bg-grey"
      >
        &gt;
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded-full bg-grey"
      >
        Cuối &raquo;
      </button>
    </div>
  );
};

export default pagination;
