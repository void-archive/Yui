const Command = require('../../structures/Command');

module.exports = class CommandsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'commands',
            desc: 'Get a full list of commands',
            usage: 'commands',
            examples: ['commands'],
            aliases: ['cmds']
        });
    }

    async run(msg, args) {
        const categories = {};
        const guildConfig = await this.bot.dbfn.getGuild(msg.channel.guild.id);

        for (const cmd of this.bot.commands) {
            if (cmd.options.isOwner && !this.bot.config.devs.includes(msg.author.id)) {
                continue;
            }

            let category = categories[cmd.options.category];
            if (!category) category = categories[cmd.options.category] = [];

            categories.push(cmd.options.name);
        }
    
        return msg.channel.createMessage({ embed: {
            title: "Yui Hirasawa — Help Panel",
            description: `To get help on a command, do \`${guildConfig.prefix}describe [command]\` or \`@Yui Hirasawa#0629 describe [command]\`\nTo execute a command, do \`${guildConfig.prefix}<command>\` or \`@Yui Hirasawa#0629 <command>\``,
            fields: Object.keys(categories).map(c => ({
                name: `❯ ${c} — [\`${c.length} Commands\`]`,
                value: `\`${categories[c].join('`, `')}\``
            })),
            footer: {
                text: "Yayy! I hope you have fun with me! =w= // Use " + guildConfig.prefix + "describe <command> to get some descripted help on a command // " + this.bot.commands.size - this.bot.fails + " commands loaded."
            }
        }});
    }
}