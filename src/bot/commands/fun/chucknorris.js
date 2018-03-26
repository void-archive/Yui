const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class ChuckNorrisCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: 'chucknorris',
            desc: 'Want me to say a funny Chuck Norris joke?',
            usage: 'chucknorris',
            aliases: ['chuck', 'norris', 'chuck-senpai'],
            examples: ['chuck'],
            category: 'Fun'
        });
    }

    async run(msg) {
        const { body } = await this.bot._snek.get('http://api.chucknorris.io/jokes/random');
        msg.channel.createMessage('**[ChuckNorris]**: Here is your joke:\n\n:mega: ' + body.value);
    }
}