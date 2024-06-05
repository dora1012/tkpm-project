const PDFDocument = require("pdfkit");
const fs = require("fs");
const EbookStrategy = require("./ebookStrategy");
const htmlToPdf = require("html-pdf"); // Thêm thư viện này để xử lý HTML

class PdfStrategy extends EbookStrategy {
  async create(novelTitle, chapterTitle, chapterContent, author, filePath) {
    // console.log(novelTitle);
    // console.log(chapterTitle);
    // console.log(chapterContent);
    // console.log(author);
    // console.log(filePath);

    if (/<[a-z][\s\S]*>/i.test(chapterContent)) {
      // Kiểm tra nội dung có phải là HTML không
      // Xử lý nội dung HTML
      const options = {
        format: "A4",
        border: {
          top: "0.5in",
          right: "0.5in",
          bottom: "0.5in",
          left: "0.5in",
        },
      };
      return new Promise((resolve, reject) => {
        htmlToPdf
          .create(chapterContent, options)
          .toFile(filePath, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(filePath);
            }
          });
      });
    } else {
      // Xử lý nội dung văn bản
      const doc = new PDFDocument({
        info: {
          Title: novelTitle,
          Author: author,
        },
      });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      stream.on("error", function (err) {
        console.error("PDF Stream Error:", err);
        throw err;
      });

      doc.fontSize(16).text(chapterTitle, { underline: true });
      doc.fontSize(12).text(chapterContent);
      doc.end();
      return Promise.resolve(filePath);
    }
  }
}

module.exports = PdfStrategy;
