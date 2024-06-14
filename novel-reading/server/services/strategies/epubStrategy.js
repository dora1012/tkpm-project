const Epub = require('epub-gen');
const EbookStrategy = require('./ebookStrategy');
const sanitizeHtml = require('sanitize-html');

class EpubStrategy extends EbookStrategy {
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
