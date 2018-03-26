const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class CookieCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: 'cookie',
            desc: 'Give someone a nice cookie!',
            usage: 'cookie [<user:str|mention>]',
            category: 'Fun',
            examples: ['cookie @Clyde#0000', 'cookie NovusTheory'],
            category: 'Fun'
        });
    }

    async run(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage('**[Cookie]**: Here is your cookie: :cookie:');
        } else {
            if (msg.mentions[0]) {
                return msg.channel.createMessage(`**[Cookie]**: <@${msg.author.id}> gave <@${msg.mentions[0].id}> a cookie! :cookie:`);
            } else {
                return msg.channel.createMessage('**[Cookie]**: <@' + msg.author.id + "> gave " + args.join(" ") + " a cookie! :cookie:");
            }
        }
    }
}