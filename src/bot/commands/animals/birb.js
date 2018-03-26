const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class BirbCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: "birb",
            desc: "Want a cute birb?",
            usage: 'birb',
            aliases: ['bird'],
            examples: ["birb"],
            category: 'Animals'
        });
    }

    async run(msg, args) {
        const birb = await this.bot._snek.get('https://random.birb.pw/tweet/');

        return msg.channel.createMessage({ embed: {
            title: `Click me if the image failed!`,
            image: {
                url: `https://random.birb.pw/img/${birb.body}`
            },
            url: `https://random.birb.pw/img/${birb.body}`,
            color: this.bot.utils.colour()
        }});
    }
}