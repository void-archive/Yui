const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class DogCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: "dog",
            desc: "Who's a good boy?",
            usage: 'dog',
            aliases: ['puppy'],
            examples: ["dog"],
            category: 'Animals'
        });
    }

    async run(msg, args) {
        const cat = await this.bot._snek.get('http://random.dog/woof.json');

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