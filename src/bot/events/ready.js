const Event = require('../structures/BaseEvent');

module.exports = class ReadyEvent extends Event {
    constructor(bot) {
        super(bot);
        
        this.bot = bot;
        this.name = 'ready';
    }

    run() {
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= The start of the boot log =-=-=-=-=-=-=-=-=-=-=-=-=');
        console.log(` __     __    _    |> Yui Hirasawa has connected to Discord~!`);
        console.log(` \\ \\   / /   (_)   |> ${this.bot.guilds.size} guilds connected.`);
        console.log(`  \\ \\_/ /   _ _    |> ${this.bot.users.size} users.`);
        console.log(`   \\   / | | | |   |> ${Object.keys(this.bot.channelGuildMap).length} channels.`);
        console.log(`    | || |_| | |   |> No shards (Not sharded)`);
        console.log(`    |_| \\__,_|_|   |> Yayy~!`);
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= End of the boot log... =-=-=-=-=-=-=-=-=-=-=-=-=-=-');

        this.bot.editStatus('online', {
            name: `for ${this.bot.guilds.size} guilds | ${this.bot.config.prefix}help`,
            type: 3
        });
        this.bot.botlists.post();
        //this.bot.webhook.post(`Yui Hirasawa has launched!\n\tGuilds: ${this.bot.guilds.size}\n\tUsers: ${this.bot.users.size}\n\tChannels: ${Object.keys(this.bot.channelGuildMap).length}\n\tYayy~!`);
    }
}