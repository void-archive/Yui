const Command = require('../../structures/Command');

module.exports = class DescribeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'describe',
            desc: 'Describe a command and I will give you some details.',
            usage: 'describe [command]',
            examples: ['describe uptime']
        });
    }

    async run(msg, args) {
        if (!args[0]) return msg.channel.send(':Yui:', `Usage: \`${this.options.usage}\``);

        let command = this.bot.commands.find(c => c.options.name.includes(args[0]));

        if (!command) {
            return msg.channel.send(':Yui:', `Command \`${args[0]}\` not found.`);
        } else {
            const db = await this.bot.dbfn.getGuild(msg.channel.guild.id);
            const prefix = db ? db.prefix : this.bot.config.prefix;

            msg.channel.createMessage({
                embed: {
                    title: "Yui Hirasawa - Help Panel",
                    description: `Command ${command.options.name}`,
                    fields: [{
                        name: "Description",
                        value: command.options.desc
                    },
                    {
                        name: "Usage",
                        value: `\`${prefix}${command.options.usage}\``
                    },
                    {
                        name: "Category",
                        value: command.options.category
                    },
                    {
                        name: "Aliases",
                        value: command.options.aliases ? command.options.aliases.join(', ') : "No aliases..."
                    },
                    {
                        name: "Examples",
                        value: command.options.examples ? command.options.examples.join(', ') : "No examples..."
                    }],
                    color: this.bot.utils.colour
                }
            });
        }
    }
}