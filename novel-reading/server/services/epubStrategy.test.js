const Epub = require('epub-gen');
const sanitizeHtml = require('sanitize-html');
const EpubStrategy = require('./epubStrategy');

jest.mock('epub-gen');
jest.mock('sanitize-html');

describe('EpubStrategy', () => {
  let epubStrategy;

  beforeEach(() => {
    epubStrategy = new EpubStrategy();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create an EPUB file from plain text content', async () => {
    const novelTitle = 'Novel Title';
    const chapterTitle = 'Chapter Title';
    const chapterContent = 'This is the content of the chapter.';
    const author = 'Author Name';
    const filePath = 'path/to/file.epub';

    Epub.mockImplementation(() => ({
      promise: Promise.resolve()
    }));

    const result = await epubStrategy.create(novelTitle, chapterTitle, chapterContent, author, filePath);

    expect(Epub).toHaveBeenCalledWith({
      title: novelTitle,
      author: author,
      content: [
        {
          title: chapterTitle,
          data: '<p>This is the content of the chapter.</p>'
        }
      ]
    }, filePath);

    expect(result).toBe(filePath);
  });

  test('should create an EPUB file from HTML content', async () => {
    const novelTitle = 'Novel Title';
    const chapterTitle = 'Chapter Title';
    const chapterContent = '<p>This is <strong>HTML</strong> content of the chapter.</p>';
    const author = 'Author Name';
    const filePath = 'path/to/file.epub';

    sanitizeHtml.mockImplementation((content, options) => content);

    Epub.mockImplementation(() => ({
      promise: Promise.resolve()
    }));

    const result = await epubStrategy.create(novelTitle, chapterTitle, chapterContent, author, filePath);

    expect(sanitizeHtml).toHaveBeenCalledWith(chapterContent, {
      allowedTags: expect.any(Array),
      allowedAttributes: expect.any(Object)
    });

    expect(Epub).toHaveBeenCalledWith({
      title: novelTitle,
      author: author,
      content: [
        {
          title: chapterTitle,
          data: chapterContent
        }
      ]
    }, filePath);

    expect(result).toBe(filePath);
  });

  test('should handle errors during EPUB creation', async () => {
    const novelTitle = 'Novel Title';
    const chapterTitle = 'Chapter Title';
    const chapterContent = '<p>This is <strong>HTML</strong> content of the chapter.</p>';
    const author = 'Author Name';
    const filePath = 'path/to/file.epub';

    Epub.mockImplementation(() => ({
      promise: Promise.reject(new Error('EPUB creation error'))
    }));

    await expect(epubStrategy.create(novelTitle, chapterTitle, chapterContent, author, filePath)).rejects.toThrow('EPUB creation error');

    expect(Epub).toHaveBeenCalledWith({
      title: novelTitle,
      author: author,
      content: [
        {
          title: chapterTitle,
          data: chapterContent
        }
      ]
    }, filePath);
  });
});
