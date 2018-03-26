const Command = require('../../structures/BaseCommand');

module.exports = class YesOrNoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'yesorno',
            desc: 'Is your question right or wrong?',
            usage: 'yesorno [<question:str>]',
            examples: ['{prefix}yesorno is Novus cool?', '{prefix}yesorno is zBot the best boat?'],
            category: 'Fun'
        });
    }

    async run(msg, args) {
        const { body } = await this.bot._snek.get('https://yesno.wtf/api/');

        if (!args[0]) return msg.channel.createMessage('**[ArgumentError]**: Invalid arguments! Check `yui!help yesorno`.');

        msg.channel.createMessage({ embed: {
            title: "...and the question to `" + args.join(" ") + "` is:",
            description: `${body.answer}`,
            image: {
                url: body.image
            },
            color: this.bot.utils.colour()
        }});
    }
}