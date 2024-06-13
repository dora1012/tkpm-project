// Hàm để loại bỏ tiền tố "Chương " và giữ lại phần số
const removeChapterPrefix = async (chapter) => {
  try {
    return chapter.replace(/^Chương /, '');
  } catch (error) {
    console.error(`Error removing chapter prefix: ${error.message}`);
    throw new Error('remove chapter prefix');
  }
};

// Hàm để loại bỏ nội dung từ dấu ":" trở về sau
const removeContentAfterColon = async (chapter) => {
  try {
    return chapter.split(':')[0].trim();
  } catch (error) {
    console.error(`Error removing content after colon: ${error.message}`);
    throw new Error('remove content after colon');
  }
};

// Hàm để xử lý danh sách dữ liệu
const processChapterTitles = async (data) => {
  try {
    const promises = data.map(async (chapter) => {
      let withoutPrefix = await removeChapterPrefix(chapter);
      return await removeContentAfterColon(withoutPrefix);
    });
    return Promise.all(promises);
  } catch (error) {
    console.error(`Error processing chapter titles: ${error.message}`);
    throw new Error('Error processing chapter titles');
  }
};

// Export các hàm để sử dụng trong file khác
module.exports = {
  processChapterTitles
};
