const snek = require('snekfetch');
const { Hug, Kiss, Neko, LewdNeko, Pat } = require('./');

class NekoAPI {
    constructor(config) {
        this.config = config;
        this.enabled = true;
        this.apiUrl = 'https://nekos.life/api';
        this.ua = 'Eris/DiscordBot; (v' + require('../../package.json').version + ' | https://github.com/ohlookitsAugust/Yui)';
    }

    hug() {
        snek.get(`${this.apiUrl}/api/hug`)
            .set('Authorize', config.tokens.nekos)
            .then((data) => new Hug(data))
            .catch(e => `NekoPluginError: ${e.message}`);
    }

    kiss() {
        // TODO: this;
    }
}