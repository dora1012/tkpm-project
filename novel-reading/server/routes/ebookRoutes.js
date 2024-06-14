const express = require("express");
const path = require("path");
const router = express.Router();
const ebookController = require("../controllers/ebookController");
const { addFormat, readFormats } = require('../services/ebookFormats');
function encodeRFC5987ValueChars(str) {
  return encodeURIComponent(str).
      // Lưu ý: Mặc dù RFC3986 yêu cầu mã hóa dấu ngoặc nhọn,
      // nhưng các trình duyệt hiện đại không thực hiện điều này,
      // và mã hóa chúng gây ra vấn đề hơn là giải quyết.
      replace(/['()]/g, escape).
      replace(/\*/g, '%2A').
      replace(/%(?:7C|60|5E)/g, unescape);
}

router.post("/generate-ebook", ebookController.generateEbook);

router.get("/download-ebook/:filename", (req, res) => {
  let { filename } = req.params;
  filename = decodeURIComponent(filename);
  
  const filePath = path.join(__dirname, '..', 'output', filename);
  // const headerValue = `attachment; filename*=UTF-8''${filename}`;
  const headerValue = `attachment; filename*=UTF-8''${encodeRFC5987ValueChars(filename)}`;

  res.setHeader("Content-Disposition", headerValue);
  // res.setHeader('Content-Type', 'application/pdf');
  
  res.download(filePath, filename, (err) => {
    if (err) {
      // Handle error, but don't expose to client
      res.status(500).send("File could not be downloaded.");
      console.error("Error during file download:", err);
    }
  });
});

router.get("/ebook-formats", (req, res) => {
  const formats = readFormats();
  res.json({ formats });
});
module.exports = router;
