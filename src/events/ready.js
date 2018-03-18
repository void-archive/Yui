const Event = require('../structures/Event');
const { games } = require('../util/GameUtil');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'ready'
        });
    }

    async run() {
        this.bot.log.debug(`Yui Hirasawa has launched~!`);
        this.doGame();

        const { doGame } = this;
        this.bot.setInterval(doGame, 60000);
    }

    doGame() {
        this.bot.editStatus('online', {
            name: `${this.bot.config.prefix}help | [${this.bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`
        });
    }
}