const mainListRoutes = require('./mainListRoutes');
const categoryRoutes = require('./categoryRoutes');
const chapterRoutes = require('./chapterRoutes');
const searchRoutes = require('./searchRoutes');
const chapterClassificationRoutes = require('./chapterClassificationRoutes');
const novelRoutes = require('./novelRoutes');
const ebookRoutes = require('./ebookRoutes')
const sourcesRoutes = require('./sourcesRoutes');
const authorRoutes = require('./authorRoutes');

function route(app) {
    app.use('/api/nguon', sourcesRoutes);
    app.use('/api', ebookRoutes);
    app.use('/api/danh-sach', mainListRoutes);
    app.use('/api/the-loai', categoryRoutes);
    app.use('/api', chapterRoutes);
    app.use('/api/tim-kiem', searchRoutes);
    app.use('/api/phan-loai', chapterClassificationRoutes);
    app.use('/api', novelRoutes);
    app.use('/api/tac-gia', authorRoutes);
}

module.exports = route;