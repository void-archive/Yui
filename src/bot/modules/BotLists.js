module.exports = class BotList {
    constructor(bot) {
        this.bot = bot;
    }

    /** 
     * Post to any botlist if Yui is in it, if not it skips.
     * 
     * @return {Promise<void>} The response. 
     */
    post() {
        const { bot } = this;
        
        if (!bot.config.tokens.oliyBots) { // discordbots.org
            bot.log.error('Sorry, you don\'t have the permission to post to dbl, but it\'s optional!');
            return;
        } else {
            bot._snek.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
                .set('Authorization', bot.config.tokens.oliyBots)
                .send({
                    server_count: bot.guilds.size
                })
                .end();
        }

        if (!bot.config.tokens.discordBots) { // bots.discord.pw
            bot.log.error("Sorry, you don't have the permission to post to Discord Bots, but it's optional if you don't have a key.");
            return;
        } else {
            bot._snek.post(`https://bots.discord.pw/api/bots/${bot.user.id}/stats`)
                .set('Authorization', bot.config.tokens.discordBots)
                .send({
                    server_count: bot.guilds.size
                })
                .end();
        }

        if (!bot.config.tokens.blspace) { // botlist.space
            bot.log.error("Sorry, you don't have the permission to post to Mayo's Bots! But it's optional if you don't have the key.");
            return;
        } else {
            bot._snek.post(`https://botlist.space/api/bots/${bot.user.id}`)
                .set('Authorization', bot.config.tokens.blspace)
                .send({
                    server_count: bot.guilds.size
                })
                .end();
        }

        if (!bot.config.tokens.terminal) { // ls.terminal.ink
            bot.log.error("Sorry, but you don't have permission to post to Terminal! But: It's optional if you don't have a key!");
            return;
        } else {
            bot._snek.post(`https://ls.terminal.ink/api/v1/bots/${bot.user.id}`)
                .set('Authorization', bot.config.tokens.terminal)
                .send({
                    server_count: bot.guilds.size
                })
                .end();
        }
    }
}