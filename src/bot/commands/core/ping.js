const Command = require('../../structures/BaseCommand');
const responses = [
    'I was playing Ping Pong with Discord! You distracted me. :<',
    'Fuck off, let me get my ping...',
    'Hmm?',
    '<insert dank memes here>',
    'Your bot is the best!'
];

module.exports = class PingCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            desc: 'Wanna play some Ping Pong? uwu',
            usage: 'ping',
            aliases: ['pong'],
        });
    }

    async run(msg, args) {
        const message = await msg.channel.createMessage(responses[Math.floor(Math.random() * responses.length)]);
        const ping = msg.channel.guild.shard;

        await message.delete();
        msg.channel.createMessage(':hehe: `|` Done playing with Discord!\n\t:ribbon: Message: `' + message.createdTimestamp - msg.createdTimestamp + 'ms`\n\t:ribbon: WS: `' + ping.latency + "ms`");
    }
}