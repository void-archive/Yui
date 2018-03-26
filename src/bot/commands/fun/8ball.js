const res = require('../../../assets/8ball.json');
const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class EightBallCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: '8ball',
            desc: 'See what the magical 8ball has to say.',
            usage: '8ball [<question:str>]',
            aliases: ['eightball'],
            examples: ['8ball is Novus a weeb?', 'eightball is Loris cool'],
            category: 'Fun'
        });
    }

    async run(msg, args) {
        if (!args[0]) return msg.channel.createMessage('**[ArgumentError]**: Invalid placement of arguments.\nArguments: `yui!8ball [question:str]`');

        const resp = res[Math.floor(Math.random() * res.length)];
        msg.channel.createMessage('**[8ball]**:\n\n\tYou> `' + args.join(" ") + '`\n\t8ball: `' + resp + '`');
    }
}