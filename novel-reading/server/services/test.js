const { crawlTruyenHot } = require('./crawlHomePage');

// Bây giờ bạn có thể sử dụng hàm crawlTruyenHot
const url = 'https://truyenfull.vn'; // Thay thế bằng URL thực tế bạn muốn crawl
crawlTruyenHot(url)
  .then(data => {
    console.log(data); // Xử lý dữ liệu được trả về từ hàm crawlTruyenHot
  })
  .catch(error => {
    console.error(error); // Xử lý lỗi nếu có
  });
