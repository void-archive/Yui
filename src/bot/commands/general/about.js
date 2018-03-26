const Command = require('../../structures/BaseCommand');

module.exports = class AboutCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'about',
            desc: 'About me, Yui Hirasawa.',
            usage: 'about [<credits:str:> | <no_args>]',
            category: 'General',
            examples: ['about', 'about credits']
        });
    }

    async run(msg, args) {
        if (!args[0]) {
            msg.channel.createMessage({ embed: {
                title: 'About me, Yui Hirasawa!',
                description: 'Oh hi! I\'m Yui, your helper for anything you need!\nI am developed by <@280158289667555328> and <@145557815287611393>!\nIf you want some help, Join our discord server or use `' + this.bot.config.prefix + "help` or `@Yui Hirasawa@0629 help` to get help on commands/or a full list!\nIf you want that whom partake into Yui's development, you can using the `credits` argument!",
                fields: [{
                    name: "Guilds",
                    value: this.bot.guilds.size,
                    inline: true
                },
                {
                    name: "Users",
                    value: this.bot.users.size,
                    inline: true
                },
                {
                    name: "Channels",
                    value: Object.keys(this.bot.channelGuildMap).length,
                    inline: true
                },
                {
                    name: "Bot Uptime",
                    value: this.bot._hd(this.bot.uptime, {
                        round: true
                    }),
                    inline: true
                },
                {
                    name: "Client Uptime",
                    value: this.bot._hd(process.uptime(), {
                        round: true
                    }),
                    inline: true
                },
                {
                    name: "Yui Version",
                    value: require('../../../../package.json').version,
                    inline: true
                },
                {
                    name: "Eris Version",
                    value: require('../../../../node_modules/eris/package.json').version,
                    inline: true
                }],
                color: this.bot.utils.colour()
            }});
        } else if (msg.content.includes(" credits")) {
            return msg.channel.createMessage({ embed: {
                title: "Credits Panel",
                description: "These are the people who help made Yui today!",
                fields: [{
                    name: "Dank Memer Team",
                    value: `For most of the utilties\nLinks: [Github](https://github.com/Dank-Memer)`
                },
                {
                    name: "iCrawl",
                    value: `For the \`CommandError\` and \`EventError\` code!\nLinks: [Github](https://github.com/iCrawl)`
                },
                {
                    name: "Yui Developers",
                    value: "Making me who I am today!"
                },
                {
                    name: "...and last but not least:",
                    value: `${this.bot.guilds.size} guilds and ${this.bot.users.size} for inviting me and making me being awesome!`
                }],
                color: this.bot.utils.colour()
            }});
        }
    }
}