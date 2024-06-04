const PdfStrategy = require('./pdfStrategy');
const EpubStrategy = require('./epubStrategy');

class EbookService {
  constructor() {
    this.strategies = {
      pdf: new PdfStrategy(),
      epub: new EpubStrategy()
    };
  }

  async createEbook(type, novelTitle, chapterTitle, chapterContent, author) {
    const filename = `${novelTitle.replace(/\s+/g, '_').toLowerCase()}_${chapterTitle.replace(/\s+/g, '_').toLowerCase()}.${type}`;
    const filePath = `output/${filename}`;
    const strategy = this.strategies[type];

    if (!strategy) {
      console.error("Unsupported ebook type: ", type);
      throw new Error('Unsupported ebook type');
    }
    await strategy.create(novelTitle, chapterTitle, chapterContent, author, filePath);
    return filename;
    // return `/download-ebook/${filename}`;
  }
}

module.exports = EbookService;