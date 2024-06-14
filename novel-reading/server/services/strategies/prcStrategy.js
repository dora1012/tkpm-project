const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const EbookStrategy = require('./ebookStrategy');
const sanitizeHtml = require('sanitize-html');

class PrcStrategy extends EbookStrategy {
  async create(novelTitle, chapterTitle, chapterContent, author, filePath) {
    const isHtml = /<[a-z][\s\S]*>/i.test(chapterContent);

    let formattedContent = chapterContent;

    if (!isHtml) {
      formattedContent = `<p>${chapterContent.replace(/\n/g, '</p><p>')}</p>`;
    } else {
      formattedContent = sanitizeHtml(chapterContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
        allowedAttributes: {
          '*': ['class', 'style', 'src', 'href', 'alt']
        }
      });
    }

    const tempHtmlPath = filePath.replace('.prc', '.html');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${novelTitle}</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <h1>${chapterTitle}</h1>
        <p><strong>Author: ${author}</strong></p>
        ${formattedContent}
      </body>
      </html>
    `;

    fs.writeFileSync(tempHtmlPath, htmlContent);

    return new Promise((resolve, reject) => {
      exec(`kindlegen ${tempHtmlPath} -o ${path.basename(filePath)}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`kindlegen error: ${stderr}`);
          reject(error);
        } else {
          console.log(`kindlegen output: ${stdout}`);
          resolve(filePath);
          fs.unlinkSync(tempHtmlPath); // Xóa file HTML tạm sau khi tạo PRC
        }
      });
    });
  }
}

module.exports = PrcStrategy;
