module.exports = class Command {
    constructor(bot, {
        name = null,
        desc = "...?!",
        usage = "...?!",
        aliases = [],
        category = "Core",
        examples = [],
        isGuild = false,
        isNSFW = false,
        isOwner = false
    }) {
        this.bot = bot;
        this.options = { name, desc, usage, aliases, category, examples, isGuild, isNSFW, isOwner };
    }

    async run(msg, args) {
        throw new Error('No run() function.');
    }
}