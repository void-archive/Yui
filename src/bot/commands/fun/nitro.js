const Command = require('../../structures/BaseCommand');

module.exports = class NitroCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nitro',
            desc: 'Wanna get Discord Nitro?!',
            usage: 'nitro',
            category: 'Fun',
            examples: ['nitro']
        });
    }

    async run(msg) {
        msg.channel.createMessage({ embed: {
            title: "Get Discord Nitro!",
            description: "With Discord Nitro, you get stuff from Discord and supporting them! [Get Nitro Here](https://discordapp.com/nitro)",
            color: this.bot.utils.colour(),
            footer: {
		text: "Discord forced me =w="
	    }
        }});
    }
}