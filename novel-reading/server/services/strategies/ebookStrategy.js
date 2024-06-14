class EbookStrategy {
  async create(novelTitle, chapterTitle, chapterContent, author, filePath) {
    throw new Error('Method create() must be implemented');
  }
}

module.exports = EbookStrategy;