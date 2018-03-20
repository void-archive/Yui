module.exports = bot = ({
    createGuild: async(guildID) => {
        await bot.db.table('guilds')
            .insert({
                id: guildID,
                prefix: bot.config.prefix,
                disabledCommands: [],
                modlog: null,
                disabledCategories: [],
                locale: null,
                isPremium: false
            })
            .run();

        return this.getGuild(guildID);
    },
    deleteGuild: (guildID) => {
        return bot.db.table('guilds')
            .get(guildID)
            .delete()
            .run();
    },
    getGuild: (guildID) => {
        return bot.db.table('guilds')
            .get(guildID)
            .run();
    },
    blacklistAdd: (id) => {
        return bot.db.table('blacklist')
            .insert({ id })
            .run();
    },
    blacklistRemove: (id) => {
        return bot.db.table('blacklist')
            .get(id)
            .delete()
            .run();
    },
    isBlacklisted: async(guildID, userID) => {
        const res = await bot.db.table('blacklist').get(guildID).run() || 
                    await bot.db.table('blacklist').get(userID).run();

        return Boolean(res);
    },
    getUser: (userID) => {
        return bot.db.table('users')
            .get(userID)
            .run();
    },
    createUser: (userID) => {
        return bot.db.table('users')
            .insert({
                id: userID,
                disabledCommands: [],
                disabledCategories: [],
                locale: null,
                isPremium: false
            })
            .run();
    },
    isPatreonGuild: (guildID) => {
        const res = bot.db.table('guilds')
            .get(guildID)
            .run();

        return Boolean(res.isPatreonGuild);
    }
});