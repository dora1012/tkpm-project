const EbookService = require('../services/ebookService');

const ebookService = new EbookService();

exports.generateEbook = async (req, res) => {
  try {
    const { type, novelTitle, chapterTitle, chapterContent, author } = req.body;

    if (!type || !chapterContent || !novelTitle || !chapterTitle) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }
    
    const filename = await ebookService.createEbook(type, novelTitle, chapterTitle, chapterContent, author);
    res.json({
      message: 'Ebook has been generated successfully',
      filename: filename
    });
  } catch (error) {
    console.error('Error generating ebook:', error);
    res.status(500).json({ message: 'Error generating ebook', error: error.message });
  }
};
