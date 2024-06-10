// Hàm để loại bỏ tiền tố "Chương " và giữ lại phần số
const removeChapterPrefix = (chapter) => {
    return chapter.replace(/^Chương /, '');
  };
  
  // Hàm để loại bỏ nội dung từ dấu ":" trở về sau
  const removeContentAfterColon = (chapter) => {
    return chapter.split(':')[0].trim();
  };
  
  // Hàm để xử lý danh sách dữ liệu
  const processChapterTitles = (data) => {
    return data.map(chapter => {
      let withoutPrefix = removeChapterPrefix(chapter);
      return removeContentAfterColon(withoutPrefix);
    });
  };
  
  // Export các hàm để sử dụng trong file khác
  module.exports = {
    processChapterTitles
  };
  