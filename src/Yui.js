const YuiClient = require('./client/YuiClient');
const config = require('./config.json');

const bot = new YuiClient(config.tokens.Discord, {
    disableEveryone: true,
    autoReconnect: true
});

bot.start();

process.on('unhandledRejection', (err) => {
    bot.gearbox._report(err, bot);
    bot.log.error(`\n${err.stack}\nno u`);
});