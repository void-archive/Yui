const Event = require('../structures/Event');

module.exports = class MessageEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'messageCreate'
        });
    }

    async run(msg) {
        const { bot } = this;

        bot.messages++;

        if (!msg.channel.guild || msg.author.bot) return;

        if (this.dbfn.isBlocked(msg.channel.guild.id, msg.author.id)) {
            return msg.channel.send('<a:sadheart:421058067711524874>', `Sorry, this guild or you are blocked from using Yui. If you believe this is a error, talk to <@280158289667555328> at ${bot.config.links.discord} !`);
        }

        if (bot.config.isPateron && !bot.dbfn.isPateronGuild(msg.channel.guild.id)) {
            return msg.channel.send('<a:sadheart:421058067711524874>', `Guild ${msg.channel.guild.name} is not a Patreon guild, if you think this is a error, contact <@280158289667555328> at ${bot.config.links.discord} !`);
        }

        const mentionRX = new RegExp(`^<@!?${bot.user.id}> `);
        const mentionPrefix = mentionRX.exec(msg.content);

        const guildConfig = bot.dbfn.getGuild(msg.channel.guild.id);
        const prefixes = [bot.config.prefix, `${mentionPrefix}`, guildConfig.prefix];
        let prefix = false;

        for (const thisPrefix of prefixes) {
            if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        if (!prefix) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        const cmd = this.bot.commands.find(c => c.options.name.includes(command) || bot.aliases.includes(command));

        if (!cmd || msg.mentions.find(m => m.id === bot.user.id) && msg.content.toLowerCase().includes('hello')) {
            msg.channel.send(':wave:', `Hello! My prefix is ${guildConfig.prefix}, do \`${guildConfig.prefix}help\` to see what I do!`);
            return;
        }

        if (cmd) {
            if (cmd.options.isGuild && msg.channel.isDM) {
                msg.channel.send('<a:sadheart:421058067711524874>', `Uhh, You might wanna be in a guild!`);
                return;
            } else if (cmd.options.isNSFW && msg.channel.nsfw) {
                msg.channel.send('<a:sadheart:421058067711524874>', `Channel <#${msg.channel.id}> is not NSFW-Friendly! Please go in a nsfw-marked channel!`);
                return;
            } else if (cmd.options.isOwner && bot.config.devs.includes(msg.author.id)) {
                msg.channel.send('<a:sadheart:421058067711524874>', `You don't have permission to execute this command.`);
            } else {
                try {
                    bot.commandsExecuted++;
                    cmd.run(msg, args);
                    bot.log.debug(`${msg.author.username}: ${msg.content}`);
                } catch(err) {
                    msg.channel.send('<a:sadheart:421058067711524874>', `Sorry, ${cmd.options.name} has errored.\n\nDetails: \`${err.message}\`\n\nThat should never happen! Join ${bot.config.links.discord} to tell <@280158289667555328> the error!`);
                }
            }
        }
    }
}