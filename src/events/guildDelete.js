const Event = require('../structures/Event');
const { games } = require('../util/GameUtil');

module.exports = class GuildLeftEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'guildDelete'
        });
    }

    async run(guild) {
        this.bot.dbfn.deleteGuild(guild.id); // Create the guild's configuration.
        this.bot.botlists.post(this.bot);
        this.bot.log.debug(`Left ${guild.name} (${guild.id}), now at ${this.bot.guilds.size} guilds.`);

        this.bot.setInterval(this.doGame, 60000); // Set the guild counter.
    }

    doGame() {
        this.bot.editStatus('online', {
            name: `${this.bot.config.prefix}help | [${this.bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`
        });
    }
}