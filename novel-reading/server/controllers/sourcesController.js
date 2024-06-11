const source = require('../config/sources.js');

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