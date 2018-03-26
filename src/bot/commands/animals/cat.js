const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class CatCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: "cat",
            desc: "Want a little cat?",
            usage: 'cat',
            aliases: ['kitty'],
            examples: ["cat"],
            category: 'Animals'
        });
    }

    async run(msg, args) {
        const cat = await this.bot._snek.get('https://nekos.life/api/v2/img/meow');

        return msg.channel.createMessage({ embed: {
            title: `Click me if the image failed!`,
            image: {
                url: `${cat.body.url}`
            },
            url: `${cat.body.url}`,
            color: this.bot.utils.colour()
        }});
    }
}