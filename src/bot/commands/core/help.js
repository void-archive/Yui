const Command = require('../../structures/BaseCommand');

module.exports = class HelpCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'help',
            desc: 'Get my full list of commands or get extended help on a command',
            usage: 'help [<command:str>]',
            aliases: ['halp', 'h', '?'],
            examples: ['help', '? statistics'],
        });
    }

    async run(msg, args) {
        if (!args[0]) {
            const categories = {};

            for (const cmd of this.bot.commands) {
                if (cmd.options.isOwner && !this.bot.config.devs.includes(msg.author.id)) {
                    continue;
                }

                let category = categories[cmd.options.category];

                if (!category) {
                    category = categories[cmd.options.category] = [];
                }

                category.push(cmd.options.name);
            }

            return msg.channel.createMessage({embed: {
                title: "Yui Hirasawa - Help Panel",
                description: this.bot.utils.helpDesc(this.bot),
                fields: Object.keys(categories).map(c => ({ name: `❯ ${c} [\`${c.length}\`]`, value: `\`${categories[c].join("` `")}\`` })),
                footer: {
                    text: "Yayy! I hope you have fun with me =w= // Use " + this.bot.config.prefix + "help <command> to get help on a command! // " + this.bot.fails + "/" + this.bot.commands.length + " commands loaded!"
                },
                color: this.bot.utils.colour()
            }});
        } else {
            const command = this.bot.commands.find(c => c.options.name.includes(args[0])); 

            try {
                return msg.channel.createMessage({ embed: {
                    title: "Yui Hirasawa - Extended Help",
                    description: `:ribbon: Command \`${command.options.name}\``,
                    fields: [{
                        name: "❯ Description",
                        value: command.options.desc
                    },
                    {
                        name: "❯ Usage",
                        value: `\`${this.bot.config.prefix}${command.options.usage}\``
                    },
                    {
                        name: "❯ Category",
                        value: `${command.options.category ? command.options.category : "Core"}`
                    },
                    {
                        name: "❯ Aliases",
                        value: `${command.options.aliases ? command.options.aliases.join(', ') : "No aliases founded..."}`
                    },
                    {
                        name: "❯ Examples",
                        value: `${command.options.examples ? command.options.examples.join(', ') : "No examples..."}`
                    },
                    {
                        name: "❯ Guild Only",
                        value: `${command.options.isGuild}`
                    },
                    {
                        name: "❯ Owner Only",
                        value: `${command.options.isOwner}`
                    },
                    {
                        name: "❯ NSFW?",
                        value: command.options.isNSFW
                    }],
                    color: this.bot.utils.colour()
                }});
            } catch(err) {
                msg.channel.createMessage('**[GeneralError]**: Command `' + args[0] + '` wasn\'t found.');
            }
        }
    }
}