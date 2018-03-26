const Event = require('../structures/BaseEvent');

module.exports = class MessageEvent extends Event {
    constructor(bot) {
        super(bot);

        this.bot = bot;
        this.name = 'messageCreate';
    }

    async run(msg) {
        const { bot } = this;

        bot.messages++;

        // Start of it
        if (msg.author.bot || !bot.ready) return;

        let prefix = false;

        const mentionPrefix = new RegExp(`^<@!?${this.bot.user.id}> `);
        const prefixMention = mentionPrefix.exec(msg.content);

        const prefixes = [bot.config.prefix, `${prefixMention}`];

        for (const thisPrefix of prefixes) {
            if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        if (!prefix) return;

	if(msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        let cmd = this.bot.commands.find(c => c.options.name.includes(command) || c.options.aliases.includes(command));

        if (cmd) {
            if (cmd.options.isGuild && !msg.channel.type === 1) {
                msg.channel.createMessage("**[GuildError]**: You must be in a guild to execute this command!");
                return;
            }

            if (cmd.options.isOwner && !bot.config.devs.includes(msg.author.id)) {
                msg.channel.createMessage("**[PermissionError]**: You must be a developer to execute this command!");
                return;
            }

            if (cmd.options.isNSFW && !msg.channel.nsfw) {
                msg.channel.createMessage('**[NSFWError]**: You must be in a nsfw channel to execute this.');
                return;
            }

            try {
                bot.commandsExecuted++;
                await cmd.run(msg, args);
            } catch(err) {
                msg.channel.createMessage("**[CommandError]**: An error has occured while executing this command\n\nDetails:```js\n" + err.stack + "```\n\nThis should never happen! Report it to <@280158289667555328> at https://discord.gg/xz3w7YG !");
                bot.log.error(`Command ${cmd.options.name} has occured\nDetails:\n\t${err.stack}`);
            }
        }
    }
}