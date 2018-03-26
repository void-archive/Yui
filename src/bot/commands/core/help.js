const Command = require('../../structures/BaseCommand');
const fs = require('fs');

module.exports = class HelpCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'help',
            desc: 'Get my full list of commands or get extended help on a command',
            usage: 'help [<command:str>]',
            aliases: ['halp', 'h', '?'],
            examples: ['help', '? statistics'],
            category: 'General'
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
                fields: Object.keys(categories).map(c => ({ name: `❯ ${c}`, value: `\`${categories[c].join("` `")}\`` })),
                footer: {
                    text: "Yayy! I hope you have fun with me =w= // Use " + this.bot.config.prefix + "help <command> to get help on a command!"
                },
                color: this.bot.utils.colour()
            }});
        } else {
            const command = this.bot.commands.find(c => c.options.name.includes(args[0]));    
            try {
                return msg.channel.createMessage(`__**Command \`${command.options.name}\`**__\n\tDescription: ${command.options.desc ? `${command.options.desc}` : `**No description...**`}\n\tUsage: ${command.options.usage ? `${this.bot.config.prefix}${command.options.usage}` : "**No usages...**"}\n\tCategory: ${command.options.category ? `**${command.options.category}**` : "General"}\n\tAliases: ${command.options.aliases === null ? `${command.options.aliases.join(", ")}` : "No aliases..."}\n\tExamples: ${command.options.examples === null ? command.options.examples.join(", ").replace("{prefix}", this.bot.config.prefix) : "No examples avaliable..."}`);
            } catch(err) {
                msg.channel.createMessage('**[GeneralError]**: Command `' + args[0] + '` wasn\'t found.');
            }
        }
    }
}