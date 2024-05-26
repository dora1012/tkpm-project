import React from 'react'

const pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);
    return (
        <div className="flex justify-center mt-4">
        {pages.map((page) => (
            <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-full ${page === currentPage ? 'bg-coral-pink text-white' : 'bg-grey'}`}
            onClick={() => onPageChange(page)}
            >
            {page}
            </button>
        ))}
    </div>
  );
}

export default pagination