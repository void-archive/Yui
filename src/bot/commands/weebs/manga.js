const Command = require('../../structures/BaseCommand');

module.exports = class MangaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'manga',
            desc: 'Search an manga from kitsu.io!',
            usage: 'manga [<manga:str>]',
            category: 'Weebs',
            examples: ['{prefix}manga School Days']
        });
    }

    async run(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`**[ArgumentError]**: Usage: \`${this.options.usage}\``);

        const { data } = await this.bot._kitsu.fetch('manga', {
            filter: {
                text: args.join('-')
            }
        });

        await this._makeEmbed(msg, data[0]);
    }

    async _makeEmbed(msg, data) {
        const { titles, subtype, startDate, endDate, popularityRank, id, synopsis } = data;

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
            }],
            color: this.bot.utils.colour(),
            url: `https://kitsu.io/manga/${id}`
        }});
    }
}