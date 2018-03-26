module.exports = class Gearbox {
    constructor(bot) {
        this.bot = bot
    }

    /**
     * Post a message to the Gearbox channel; if unhandledRejection has occured!
     * 
     * @param {Error} err The Node.js Error Paramter
     */
    _report(err) {
        this.bot.createMessage(this.bot.config.channels.logging, {
            embed: {
                title: "Yui Hirasawa - Gearbox Report",
                description: `\`\`\`js\n${err.stack}\`\`\``,
                colour: this.bot.utils.colour()
            }
        });
    }
}