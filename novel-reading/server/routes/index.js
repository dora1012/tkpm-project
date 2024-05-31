const mainListRoutes = require('./mainListRoutes');
const categoryRoutes = require('./categoryRoutes');
const chapterRoutes = require('./chapterRoutes');
const searchRoutes = require('./searchRoutes');
const chapterClassificationRoutes = require('./chapterClassificationRoutes');
const novelRoutes = require('./novelRoutes');

function route(app) {
    app.use('/api/danh-sach', mainListRoutes);
    app.use('/api/the-loai', categoryRoutes);
    //app.use('/api', chapterRoutes); // considering
    app.use('/api/tim-kiem', searchRoutes);
    app.use('/api/phan-loai', chapterClassificationRoutes);
    app.use('/api', novelRoutes);
}

module.exports = route;