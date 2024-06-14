const fs = require('fs');
const path = require('path');

const formatsFilePath = path.join(__dirname, 'ebookFormats.json');

// Hàm để đọc danh sách định dạng từ file JSON
const readFormats = () => {
  if (fs.existsSync(formatsFilePath)) {
    const data = fs.readFileSync(formatsFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

// Hàm để lưu danh sách định dạng vào file JSON
const saveFormats = (formats) => {
  fs.writeFileSync(formatsFilePath, JSON.stringify(formats, null, 2), 'utf8');
};

// Hàm để thêm định dạng mới vào danh sách
const addFormat = (format) => {
  const formats = readFormats();
  if (!formats.includes(format)) {
    formats.push(format);
    saveFormats(formats);
  }
};

module.exports = {
  readFormats,
  saveFormats,
  addFormat
};
