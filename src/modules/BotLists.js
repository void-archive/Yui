module.exports = {
    post: (bot) => {
        bot._snek
            .post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
            .set('Authorization', bot.config.tokens.oliyBots)
            .send({
                server_count: bot.guilds.size
            })
            .end();

        bot._snek
            .post(`https://botlist.space/api/bots/${bot.user.id}`)
            .set('Authorization', bot.config.tokens.blspace)
            .send({
                server_count: bot.guilds.size
            })
            .end();

        bot._snek
            .post(`https://ls.terminal.ink/api/v1/bots/${bot.user.id}`)
            .set('Authorization', bot.config.tokens.blspace)
            .send({
                server_count: bot.guilds.size
            })
            .end();
    }
}