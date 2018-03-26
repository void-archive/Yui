const Client = require('./client/YuiClient');
const config = require('./config.json');

const bot = new Client(config.tokens.Discord, {
    disableEveryone: true,
    autoReconnect: true
});

bot.start();

process.on('unhandledRejection', (err) => {
    bot.gearbox._report(err);
    bot.log.error(`\n${err.stack}`);
});