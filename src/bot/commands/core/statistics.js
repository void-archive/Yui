const Command = require('../../structures/BaseCommand');
const { VERSION: erisVersion } = require('eris');

module.exports = class StatisticsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'statistics',
            desc: 'Want some statistics, big boi?',
            usage: 'statistics',
            examples: ['statistics', 'bot', 'stats'],
            aliases: ['stats', 'bot']
        });
    }

    async run(msg, args) {
        const upvotes = await this.bot._snek.get('https://discordbots.org/api/bots/' + this.bot.user.id + '/votes').set('Authorization', this.bot.config.tokens.oliyBots);

        msg.channel.createMessage({ embed: {
            title: "Yui Hirasawa - Statistics",
            description: `Uptime: ${this.bot.utils.format(this.bot.uptime)}`,
            fields: [{
                name: "Guilds",
                value: this.bot.guilds.size,
                inline: true
            },
            {
                name: "Users",
                value: this.bot.users.size,
                inline: true
            },
            {
                name: "Channels",
                value: Object.keys(this.bot.channelGuildMap).length,
                inline: true
            },
            {
                name: "Yui Version",
                value: `v${require('../../../../package.json').version}`,
                inline: true
            },
            {
                name: "Eris Version",
                value: `v${erisVersion}`,
                inline: true
            },
	    {
		name: "Messages Seen",
		value: this.bot.messages,
		inline: true
	    },
 	    {
		name: "Commands Executed",
		value: this.bot.commandsExecuted,
		inline: true
	    }],
            color: this.bot.utils.colour()
        }});
    }
}
