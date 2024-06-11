import React, { useState } from 'react';
import parse from 'html-react-parser';

const readMore = ({ content = '', maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const getPlainText = (htmlContent) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const plainTextContent = getPlainText(content);
  const shortContent = plainTextContent.length > maxLength ? plainTextContent.slice(0, maxLength) + '...' : plainTextContent;

  return (
    <div>
      <div>{isExpanded ? parse(content) : shortContent}</div>
      {plainTextContent.length > maxLength && (
        <button onClick={toggleReadMore} className="text-coral-pink mt-2">
          {isExpanded ? 'Rút gọn' : 'Đọc thêm'}
        </button>
      )}
    </div>
  );
};

export default readMore;
