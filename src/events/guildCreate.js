const Event = require('../structures/Event');
const { games } = require('../util/GameUtil');

module.exports = class GuildJoinedEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'guildCreate'
        });
    }

    async run(guild) {
        this.bot.dbfn.createGuild(guild.id); // Create the guild's configuration.
        this.bot.botlists.post(this.bot);
        this.bot.log.debug(`Joined ${guild.name} (${guild.id}), now at ${this.bot.guilds.size} guilds.`);

        this.bot.setInterval(this.doGame, 60000); // Set the guild counter.
    }

    doGame() {
        this.bot.editStatus('online', {
            name: `${this.bot.config.prefix}help | [${this.bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`
        });
    }
}