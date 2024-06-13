const fs = require('fs');
const PDFDocument = require('pdfkit');
const htmlToPdf = require('html-pdf');
const PdfStrategy = require('./pdfStrategy');

jest.mock('fs');
jest.mock('pdfkit');
jest.mock('html-pdf');

describe('PdfStrategy', () => {
  let pdfStrategy;
  const mockWriteStream = {
    on: jest.fn(),
    end: jest.fn(),
  };

  beforeEach(() => {
    pdfStrategy = new PdfStrategy();
    fs.createWriteStream.mockReturnValue(mockWriteStream);
    PDFDocument.mockImplementation(() => ({
      pipe: jest.fn(),
      fontSize: jest.fn().mockReturnThis(),
      text: jest.fn().mockReturnThis(),
      end: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a PDF file from text content', async () => {
    const novelTitle = 'Novel Title';
    const chapterTitle = 'Chapter Title';
    const chapterContent = 'This is the content of the chapter.';
    const author = 'Author Name';
    const filePath = 'path/to/file.pdf';

    await pdfStrategy.create(novelTitle, chapterTitle, chapterContent, author, filePath);

    expect(fs.createWriteStream).toHaveBeenCalledWith(filePath);
    expect(PDFDocument).toHaveBeenCalledWith({
      info: {
        Title: novelTitle,
        Author: author,
      },
    });

    const mockDocInstance = PDFDocument.mock.instances[0];
    expect(mockDocInstance.pipe).toHaveBeenCalledWith(mockWriteStream);
    expect(mockDocInstance.fontSize).toHaveBeenCalledWith(16);
    expect(mockDocInstance.text).toHaveBeenCalledWith(chapterTitle, { underline: true });
    expect(mockDocInstance.fontSize).toHaveBeenCalledWith(12);
    expect(mockDocInstance.text).toHaveBeenCalledWith(chapterContent);
    expect(mockDocInstance.end).toHaveBeenCalled();

    expect(mockWriteStream.on).toHaveBeenCalledWith('error', expect.any(Function));
  });

  test('should create a PDF file from HTML content', async () => {
    const novelTitle = 'Novel Title';
    const chapterTitle = 'Chapter Title';
    const chapterContent = '<p>This is <strong>HTML</strong> content of the chapter.</p>';
    const author = 'Author Name';
    const filePath = 'path/to/file.pdf';

    htmlToPdf.create.mockReturnValue({
      toFile: jest.fn((path, callback) => {
        callback(null, { filename: path });
      }),
    });

    await pdfStrategy.create(novelTitle, chapterTitle, chapterContent, author, filePath);

    expect(htmlToPdf.create).toHaveBeenCalledWith(chapterContent, {
      format: 'A4',
      border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    });

    const pdfCreationInstance = htmlToPdf.create.mock.results[0].value;
    expect(pdfCreationInstance.toFile).toHaveBeenCalledWith(filePath, expect.any(Function));
  });

  test('should handle errors during HTML to PDF conversion', async () => {
    const novelTitle = 'Novel Title';
    const chapterTitle = 'Chapter Title';
    const chapterContent = '<p>This is <strong>HTML</strong> content of the chapter.</p>';
    const author = 'Author Name';
    const filePath = 'path/to/file.pdf';

    htmlToPdf.create.mockReturnValue({
      toFile: jest.fn((path, callback) => {
        callback(new Error('PDF creation error'), null);
      }),
    });

    await expect(pdfStrategy.create(novelTitle, chapterTitle, chapterContent, author, filePath)).rejects.toThrow('PDF creation error');

    expect(htmlToPdf.create).toHaveBeenCalledWith(chapterContent, {
      format: 'A4',
      border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    });

    const pdfCreationInstance = htmlToPdf.create.mock.results[0].value;
    expect(pdfCreationInstance.toFile).toHaveBeenCalledWith(filePath, expect.any(Function));
  });
});