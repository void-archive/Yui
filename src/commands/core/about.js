const Command = require('../../structures/Command');

module.exports = class AboutCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'about',
            desc: 'About me, Yui!',
            usage: 'about [credits]',
            category: 'Core',
            examples: ['about', 'bot credits'],
            aliases: ['bot', 'info']
        });
    }

    async run(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage({ embed: {
                title: "About me, Yui Hirasawa! <3",
                description: ":wave: I'm Yui, your cute helper!\nI was developed by <@280158289667555328> and <@145557815287611393>!\nIf you wanna see what I can do, do `" + this.bot.config.prefix + "help` or `@Yui Hirasawa#0629 help`!\nWant me to describe a command? Do `" + this.bot.config.prefix + "describe [command]` or `@Yui Hirasawa#0629 describe [command]`!\nWanna see who partake into Yui's Development or see who helped my owners? Use the `credits` argument!",
                color: this.bot.utils.colour
            }});
        } else if (msg.content.includes(' credits')) {
            return msg.channel.send(':bar_chart:', 'Credits to:\n\t:ribbon: `Yui Developers` => Making me!\n\t:ribbon: `Aetheryx` => MessageCollector class.\n\t:ribbon: `Devoxin` => Most of the load Eris class.');
        }
    }
}