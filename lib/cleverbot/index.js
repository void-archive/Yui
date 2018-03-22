const CleverBotInstance = require('./lib/Cleverbot');

async function CleverBotClient(...args) {
    return await new CleverBotInstance(...args);
}

module.exports = {
    CleverbotClient: CleverBotInstance,
    CleverbotError: require('./lib/errors/CleverbotError')
};