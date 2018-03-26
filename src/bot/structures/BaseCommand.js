const CommandError = require('../../errors/CommandError');

/**
 * The base command
 */
module.exports = class BaseCommand {
    constructor(bot, {
        name = null, 
        desc = "...",
        usage = "...",
        aliases = [],
        examples = [],
        cooldown = 0,
        category = "Core",
        isOwner = false,
        isGuild = false,
        isNSFW = false
    }) {
        this.bot = bot,
        this.options = {
            name,
            desc,
            usage,
            aliases,
            examples,
            cooldown,
            category,
            cooldown,
            isGuild,
            isOwner,
            isNSFW
        };
    }

    /**
     * Execute the command!
     * 
     * @param {Object} msg The Eris message paramater
     * @param {String[]} args The arguments provided
     */
    async run(msg) {
        throw new CommandError('NO_RUN_FUNCTION');
    }
}