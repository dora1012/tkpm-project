const Epub = require('epub-gen');
const EbookStrategy = require('./ebookStrategy');
const sanitizeHtml = require('sanitize-html');

class EpubStrategy extends EbookStrategy {
  async create(novelTitle, chapterTitle, chapterContent, author, filePath) {
    // Kiểm tra nội dung có phải là HTML không
    const isHtml = /<[a-z][\s\S]*>/i.test(chapterContent);

    let formattedContent = chapterContent;

    if (!isHtml) {
      // Nếu nội dung không phải là HTML, bao bọc nó bằng các thẻ <p>
      formattedContent = `<p>${chapterContent.replace(/\n/g, '</p><p>')}</p>`;
    } else {
      // Làm sạch nội dung HTML nếu cần
      formattedContent = sanitizeHtml(chapterContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
        allowedAttributes: {
          '*': ['class', 'style', 'src', 'href', 'alt']
        }
      });
    }

    const option = {
      title: novelTitle,
      author: author,
      content: [
        {
          title: chapterTitle,
          data: formattedContent
        }
      ]
    };

    await new Epub(option, filePath).promise;
    return filePath;
  }
}

module.exports = EpubStrategy;