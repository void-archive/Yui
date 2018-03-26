const Command = require('../../structures/BaseCommand');

module.exports = class AnimeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'anime',
            desc: 'Search an anime from kitsu.io!',
            usage: 'anime [<anime:str>]',
            category: 'Weebs',
            examples: ['{prefix}anime Acchi Kocchi'],
            aliases: ['animu']
        });
    }

    async run(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`**[ArgumentError]**: Usage: \`${this.options.usage}\``);

        const { data } = await this.bot._kitsu.fetch('anime', {
            filter: {
                text: args.join('-')
            }
        });

        await this._makeEmbed(msg, data[0]);
    }

    async _makeEmbed(msg, data) {
        const { titles, subtype, startDate, endDate, popularityRank, id, synopsis, episodeCount } = data;

        return msg.channel.createMessage({ embed: {
            title: `${titles.en} | ${titles.en_jp}`,
            description: `Show Type: ${subtype}`,
            fields: [{
                name: "❯ Start Date",
                value: startDate,
                inline: true
            },
            {
                name: "❯ End Date",
                value: endDate || 'Still in Progress',
                inline: true
            },
            {
                name: "❯ Popularity Rank",
                value: popularityRank,
                inline: true
            },
            {
                name: "❯ Synopsis",
                value: synopsis.substring(0, 750) + '...',
                inline: true
            },
            {
                name: "❯ Episode Count",
                value: episodeCount,
                inline: true
            }],
            color: this.bot.utils.colour(),
            url: `https://kitsu.io/anime/${id}`
        }});
    }
}