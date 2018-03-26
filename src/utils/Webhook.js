module.exports = class Webhook {
    constructor(bot) {
        this.bot = bot;
    }

    async post(content = '') {
        this.bot._snek.post(this.bot.config.links.weebhook)
            .send({
                embed: {
                    title: "Yui Hirasawa - Webhook Service",
                    description: `${content}`,
                    color: this.bot.utils.colour()
                }
            })
            .end();
    }
}