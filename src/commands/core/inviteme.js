const Command = require('../../structures/Command');

module.exports = class InviteMeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'inviteme',
            desc: 'Wanna invite me to your server or wanna join my server? uwu',
            usage: 'inviteme',
            aliases: ['invite'],
            examples: ['inviteme']
        });
    }

    async run(msg, args) {
        return msg.channel.send(':white_check_mark', `Invite: <https://discordapp.com/oauth2/authorize?client_id=${this.bot.user.id}&scope=bot&permissions=0>\nDiscord: ${this.bot.config.links.discord}`);
    }
}