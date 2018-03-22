const games = [];
const changeGame = (bot) => {
    bot.editStatus('online', {
        name: `${bot.config.prefix}help | [${bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`,
        type: 0
    });

    bot.setInterval(changeGame, 60000);
}

module.exports = {
    games,
    changeGame
};