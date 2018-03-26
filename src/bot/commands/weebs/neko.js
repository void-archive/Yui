const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class NekoCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: 'neko',
            desc: 'Want a beautiful neko?!',
            usage: 'neko',
            aliases: ['catgirl'],
            examples: ['catgirl', 'neko'],
            category: 'Weebs',
	        isNSFW: true
        });
    }

    async run(msg, args) {
        const { body } = await this.bot._snek.get('https://nekos.life/api/v2/img/neko');
        msg.channel.createMessage({ embed: {
                title: "Click me if the image failed!",
                url: `${body.url}`,
                image: {
                    url: `${body.url}`
                },
                color: this.bot.utils.colour()
            }
        });
    }
}