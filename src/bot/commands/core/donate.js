const Command = require('../../structures/BaseCommand');

module.exports = class DonateCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'donate',
            desc: 'Y-you really wanna donate to me? uwu~!',
            usage: 'donate',
            aliases: ['patreon'],
            examples: ['donate', 'patreon'],
        });
    }

    async run(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "Yui Hirasawa - Donations",
            description: ":warning: If you chargeback after the payment, you will be blacklisted.\nLink: https://patreon.com/YuiBotProject",
            color: this.bot.utils.colour()
        }});
    }
}