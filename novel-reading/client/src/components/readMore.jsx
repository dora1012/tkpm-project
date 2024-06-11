import React, { useState } from 'react';

const readMore = ({ content, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const shortContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;

  return (
    <div>
      <p>{isExpanded ? content : shortContent}</p>
      {content.length > maxLength && (
        <button onClick={toggleReadMore} className="text-coral-pink mt-2">
          {isExpanded ? 'Rút gọn' : 'Đọc thêm'}
        </button>
      )}
    </div>
  );
};

export default readMore;