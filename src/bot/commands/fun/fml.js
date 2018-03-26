const Cheerio = require('cheerio');
const AbstractCommand = require('../../structures/BaseCommand');

module.exports = class FMLCommand extends AbstractCommand {
    constructor(bot) {
        super(bot, {
            name: 'fml',
            desc: `Grabs a "fuck my life" quote.`,
            usage: 'fml',
            aliases: ['fuckmylife', 'fuccmylife'],
            examples: ['fml'],
            category: 'Fun'
        });
    }

    async run(msg, args) {
        const { body } = await this.bot._snek.get('http://www.fmylife.com/random');
        const $ = Cheerio.load(body);
        const fmlQuote = $('p.block.hidden-xs > a').first().text();

        try {
            msg.channel.createMessage('**[FML]**: ' + fmlQuote);
        } catch(err) {
            msg.channel.createMessage(`**[GeneralError]**: An error has occured, \`${err.message}\`. Try again later!`);
        }
    }
}