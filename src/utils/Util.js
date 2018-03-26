const snek = require('snekfetch');

module.exports = {
    colour: () => 6308134,
    format: (ms) => { // Credits to Mel/Aether
        const methods = [86400, 3600, 60, 1];
        const timeStr = [Math.floor(ms / methods[0]).toString().padStart(2, 0)];
        for (let i = 0 ; i < 3; i++) {
            timeStr.push(Math.floor(ms % methods[i] / methods[i + 1]).toString().padStart(2, '0'));
        }

        return timeStr.join(':');
    },
    loadEris: (Eris) => { // Credits to Aether
        const MessageCollector = require('./MessageCollector');

        Object.defineProperty(Eris.Channel.prototype, 'awaitMessages', {
            value: (bot, filter, options) => {
                const collector = new MessageCollector(bot, this, filter, options);
                return new Promise(res => {
                    collector.on('end', (...args) => res(args));
                });
            }
        });

        return Eris;
    },
    codeblock: (lang, str) => {
        return `${'```'}${lang || ''}\n${str}\n${'```'}`;
    },
    cooldown: new Set(),
    helpDesc: (bot) => {
        return `To use my commands do \`${bot.config.prefix}<command>\` or \`@Yui Hirasawa#0629 <command>\`\nTo get extended help, do \`${bot.config.prefix}help [command]\` or \`@Yui Hirasawa#0629 help [command]\``;
    }
};