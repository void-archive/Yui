const config = require('../bot/config.json');
const r = require('rethinkdbdash')(config.rethinkdb);

module.exports = r;