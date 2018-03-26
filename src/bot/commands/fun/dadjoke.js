const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class DadJokeCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: 'dadjoke',
            desc: "Jokes for Dads, only!",
            usage: 'dadjoke',
            examples: ['dadjoke', 'dad'],
            aliases: ['dad'],
            category: "Fun"
        });
    }

    async run(msg, args) {
        const { body } = await this.bot._snek.get('https://icanhazdadjoke.com/').set("Accept", "application/json");
        msg.channel.createMessage(`**[DadJoke]**: :mega: *${body.joke}*`);
    }
}