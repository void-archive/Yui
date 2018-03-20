const Command = require('../../structures/Command');
const responses = [
    'Discord Emoji, best bot.',
    'Havana > zBot'
];

module.exports =  class PingCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            desc: 'Get my ping in milliseconds.',
            usage: 'ping',
            aliases: ['pong', 'ping-pong'],
            examples: ['ping']
        });
    }

    async run(msg, args) {
        const start = Date.now();
        const message = await msg.channel.send(':ping_pong:', `${reponses[Math.round(Math.random() * responses.length)]}`);

        await message.delete();
        msg.channel.send(':pencil:', `Pong!\n\t:ribbon: Message: ${Date.now() - start}\n\t:ribbion: Websocket: ${bot.ping.toFixed(0)}`);
    }
}