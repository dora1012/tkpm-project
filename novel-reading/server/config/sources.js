const TruyenFull = require('../services/crawlerTruyenFull');
const chokidar = require('chokidar');
const path = require('path');

const servicesPath = path.join(__dirname, '../services');
const watcher = chokidar.watch(servicesPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher.on('add', function (path) {
    console.log('File', path, 'has been added');
}).on('error', function (error) {
    console.error('Error happened', error);
});

module.exports = {
    server1:{
        name: 'truyenfull',
        url:'https://truyenfull.vn',
        crawler: new TruyenFull()
    },
    server2:{
        name: 'tangthuvien',
        url:'https://truyen.tangthuvien.vn/',
        crawler: new Strategy()
    },
    defaultSource: 'https://truyenfull.vn'
}