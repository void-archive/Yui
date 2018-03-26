const Event = require('../structures/BaseEvent');

module.exports = class GuildLeaveEvent extends Event {
    constructor(bot) {
        super(bot);

        this.bot = bot;
        this.name = 'guildDelete';
    }

    async run(guild) {
        this.bot.log.custom('Guild', `Left ${guild.name} (${guild.id}) | Now at ${this.bot.guilds.size} guilds.`);
        this.bot.botlists.post();

        this.bot.editStatus('online', {
            name: `for ${this.bot.guilds.size} guilds | ${this.bot.config.prefix}help`,
            type: 3
        });
    }
}