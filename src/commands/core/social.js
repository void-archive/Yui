const Command = require('../../structures/Command');

module.exports = class SocialCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'social',
            desc: 'View my social links.',
            usage: 'social'
        });
    }

    async run(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: 'Yui Hirasawa - Social Links',
            description: 'Here are my social links, follow me if you want.',
            fields: [{
                name: "Twitter",
                value: "https://twitter.com/YuiDiscord"
            }],
            color: this.bot.utils.colour
        }});
    }
}