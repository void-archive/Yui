const Command = require('../../structures/BaseCommand');

module.exports = class DonateCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'donate',
            desc: 'Y-you really wanna donate to me? uwu~!',
            usage: 'donate',
            aliases: ['patreon'],
            examples: ['donate', 'patreon'],
            category: 'General'
        });
    }

    async run(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "Yui Hirasawa - Donations",
            description: "I do accept donations but you will be blacklisted from the bot if you chargeback.",
            color: this.bot.utils.colour()
        }});
    }
}