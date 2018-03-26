const Command = require('../../structures/BaseCommand');

module.exports = class InviteCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'invite',
            desc: 'Wanna invite me to your server? OwO',
            usage: "invite [discord | bot]",
            aliases: ['inviteme'],
            examples: ['invite discord', 'inviteme bot']
        });
    }

    async run(msg, args) {
        if (!args[0]) return msg.channel.createMessage('**[ArgumentError]**: Invalid placement of arguments.\n\tUsage: `' + this.options.usage + "`");

        if (msg.content.includes(" discord")) {
            return msg.channel.createMessage(`**[Discord Server]**: You can join my discord serer if you need anything!\nhttps://discord.gg/xz3w7YG`);
        } else if (msg.content.includes(" bot")) {
            return msg.channel.createMessage("**[Invite]**: You can invite me with this link: <https://discordapp.com/oauth2/authorize?client_id=" + this.bot.user.id + "&scope=bot&permissions=0>");
        }
    }
}