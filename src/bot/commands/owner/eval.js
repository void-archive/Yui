const Command = require('../../structures/BaseCommand');

module.exports = class EvalCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eval',
            desc: 'Evaluates arbitrary JavaScript code.',
            usage: 'eval [<code:str>]',
            isOwner: true,
            category: 'Owner',
            aliases: ['evl', 'js']
        });
    }

    async run(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage('**[ArgumentError]**: Usage: `' + this.bot.config.prefix + "eval [<code:str]`");
        } else {
            let res;
            try {
                res = await eval(args.join(' '));

                msg.channel.createMessage(this.bot.utils.codeblock('js', res));
            } catch(err) {
                msg.channel.createMessage(this.bot.utils.codeblock('js', err));
            }
        }
    }
}