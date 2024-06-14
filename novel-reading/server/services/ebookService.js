const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const EbookStrategy = require('./strategies/ebookStrategy');
const { addFormat, readFormats } = require('./ebookFormats');

class EbookService {
  constructor() {
    this.strategies = {};
    this.loadStrategies();
    this.watchStrategies();
  }

  loadStrategies() {
    const strategiesPath = path.join(__dirname, 'strategies');
    const strategyFiles = fs.readdirSync(strategiesPath).filter(file => file.endsWith('Strategy.js'));

    strategyFiles.forEach(file => {
      const StrategyClass = require(path.join(strategiesPath, file));
      if (StrategyClass.prototype instanceof EbookStrategy) {
        const type = file.replace('Strategy.js', '').toLowerCase();
        this.strategies[type] = new StrategyClass();
        addFormat(type); // Lưu định dạng mới vào danh sách
      }
    });
  }

  watchStrategies() {
    const strategiesPath = path.join(__dirname, 'strategies');
    const watcher = chokidar.watch(strategiesPath, { persistent: true });

    watcher.on('add', filePath => {
      delete require.cache[require.resolve(filePath)];
      this.loadStrategies();
      console.log(`Strategy added: ${filePath}`);
    });

    watcher.on('change', filePath => {
      delete require.cache[require.resolve(filePath)];
      this.loadStrategies();
      console.log(`Strategy updated: ${filePath}`);
    });

    watcher.on('unlink', filePath => {
      const type = path.basename(filePath, 'Strategy.js').toLowerCase();
      delete this.strategies[type];
      delete require.cache[require.resolve(filePath)];
      console.log(`Strategy removed: ${filePath}`);
    });
  }

  async createEbook(type, novelTitle, chapterTitle, chapterContent, author) {
    const sanitizeFilename = (name) => name.replace(/:/g, '').replace(/\s+/g, '_').toLowerCase();

    const filename = `${sanitizeFilename(novelTitle)}_${sanitizeFilename(chapterTitle)}.${type}`;
    const filePath = path.join(__dirname, '..', 'output', filename); // Sửa đường dẫn đến thư mục output
    const strategy = this.strategies[type];

    if (!strategy) {
      console.error("Unsupported ebook type: ", type);
      throw new Error('Unsupported ebook type');
    }

    try {
      await strategy.create(novelTitle, chapterTitle, chapterContent, author, filePath);
      console.log(filePath);
      console.log(`Ebook created at: ${filePath}`);
      return filename;
    } catch (error) {
      console.error('Error creating ebook:', error);
      throw error;
    }
  }
}

module.exports = EbookService;
