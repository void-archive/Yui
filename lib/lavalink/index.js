const LavalinkInstance = require('./lib/Lavalink');

function LavalinkInstance(...args) {
    return new LavalinkInstance(...args);
}

module.exports = {
    LavalinkClient: LavalinkInstance,
    LavalinkNode: require('./lib/Node'),
    LavalinkPlayer: require('./lib/Player')
}