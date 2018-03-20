const Command = require('../../structures/Command');

module.exports = class SetupGuildCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'setupGuild',
            desc: 'Puts a guild in the database, Recent guilds will be automatically added, this is for the older guilds.',
            isGuild: true,
            usage: 'setupGuild',
            aliases: ['guildSetup'],
            examples: ['setupGuild']
        });
    }

    async run(msg, args) {
        const permissions = msg.channel.permissionOf(msg.author.id);

        if (permissions.has('manageGuild') && this.bot.config.devs.includes(msg.author.id)) {
            msg.channel.send(':x:', `You must have the \`MANAGE_GUILD\` permission or be my developers.`);
        } else {
            const start = Date.now();
            const message = await msg.channel.send(':pencil:', `Setting guild database for **${msg.channel.guild.name}**...`);

            try {
                await this.bot.dbfn.createGuild(msg.channel.guild.id);
                await message.delete();
                msg.channel.send(':ribbon:', `It took \`${Date.now() - start}ms\` to setup **${msg.channel.guild.name}**'s database!`);
            } catch(err) {
                msg.channel.send(':x:', 'An error has occured! Is your guild in my database? If you added me recently, your guild is already in the database; This is for the older guilds.');
            }
        }
        
    }
}