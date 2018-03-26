const Command = require('../../structures/BaseCommand');

module.exports = class OsuCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'osu',
            desc: 'Search a user on the osu! api.',
            usage: 'osu [username]',
            aliases: ['osu!'],
            examples: ['{prefix}osu user ohlookitsAugust'],
            category: 'Weebs'
        });
    }

    async run(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage(`**[ArgumentError]**: Usage: \`${this.options.usage}\``);
        }

            const message = await msg.channel.createMessage(`**[OSU!]**: Searching for \`${args[1]}\``);

            const usr = await this.bot._osu.getUser({ u: args[1] });

            await message.delete();
            msg.channel.createMessage({ embed: {
                description: "Osu statistics for `" + usr.name + "`:",
                fields: [{
                    name: "User ID",
                    value: usr.id,
                    inline: true
                },
                {
                    name: "User Country",
                    value: usr.country,
                    inline: true
                },
                {
                    name: "User Level",
                    value: usr.level,
                    inline: true
                },
                {
                    name: "User Accuracy",
                    value: usr.accuracyFormatted,
                    inline: true
                },
                {
                    name: "User's SS:",
		    value: usr.counts.SS,
		    inline: true
                },
		{
		    name: "User's S:",
		    value: usr.counts.S,
		    inline: true
		},
		{
		   name: "User's A:",
		   value: usr.counts.A,
		   inline: true
		}],
                color: this.bot.utils.colour(),
		image: {
			url: `https://lemmmy.pw/osusig/sig.php?uname=${encodeURI(username)}`
		}
            }}); 
     }
}