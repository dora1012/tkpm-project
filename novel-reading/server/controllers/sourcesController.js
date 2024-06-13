let source = require('../config/sources.js');
const chokidar = require('chokidar');
const path = require('path');

const sourcesPath = path.join(__dirname, '../config/sources.js');
const watcher = chokidar.watch(sourcesPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher.on('change', function (path) {
    console.log(`File ${path} has been changed`);
    delete require.cache[require.resolve('../config/sources.js')];
    source = require('../config/sources.js');
});


const getAllSources = (req, res) => {
    try {
        res.json(source);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error - GET ALL SOURCES CONTROLLER' });
    }
}

module.exports = {
    getAllSources
};