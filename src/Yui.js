const YuiClient = require('./client/YuiClient');

const bot = new YuiClient(process.env.TOKEN, {
    disableEveryone: true,
    autoReconnect: true
});

bot.start();

process.on('unhandledRejection', (err) => {
    bot.gearbox._report(err, bot);
    bot.log.error(`\n${err.stack}\nno u`);
});