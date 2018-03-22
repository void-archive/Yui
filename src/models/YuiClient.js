const { Client } = require('eris');
const Database = require('../database/model/DatabaseModel');
const DatabaseFunctions = require('../database/functions/DatabaseFunctions');
const fs = require('fs');

module.exports = class IYuiClient extends Client {
    constructor(token, options) {
        super(token, options);

        this.commands = [];
        this.tags = {};
        this.r = Database;
        this.db = DatabaseFunctions;
        this.config = require('../config.json');
        this.utils = require('../util/Util');
        this._snek = require('snekfetch');
        this.log = require('../util/Logger');
        this.plugins = new Map();
        this.players = new Map();
        this.queue = new Map();
    }

    async start() {
        await this._load().then(() => {
            this.loadPlugins();
            this.connect().then(() => {
                this.log.custom('WebSocket', 'Yui Hirasawa has connected via WebSocket.');
            });
        });
    }

    async _load() {
        const categories = await fs.readdirSync('./commands');

        for (let i = 0; i < categories.length; i++) {
            fs.readdir(`./commands/${categories[i]}`, (err, files) => {
                if (err) throw err;
                this.log.debug(`Loading ${files.length} commands in "${categories[i]}" category.`);
                files.forEach(f => {
                    try {
                        const Command = require(`../commands/${categories[i]}/${f}`);
                        const cmd = new Command(this);
    
                        if (!cmd.options.enabled) return;
    
                        this.commands.push(cmd);
                    } catch(e) {
                        this.log.error(`${f.replace('.js', '')} failed:\n${e.stack}`);
                    }
                });
            });
        }

        fs.readdir(`./events`, (err, files) => {
            if (err) throw err;
            this.log.debug(`Loading ${files.length} events...`);
            files.forEach(f => {
                const Event = require(`../events/${f}`);
                const event = new Event(this);

                const _doWrapper = async(...args) => {
                    try {
                        await event.run(...args);
                    } catch(err) {
                        return;
                    }
                }

                this.on(event.uwu.name, _doWrapper);
            });
        });
    }

    async destroyYui(reconnect) {
        const wanna = Boolean(reconnect);

        if (wanna) {
            this.log.debug('Rebooting...');
            await this.disconnect({ reconnect: true });
            this.log.debug('Ok, loading shit.');
            this.start();
        } else {
            this.log.debug('I guess you don\'t want me alive?\nGoodbye... :(');
            await this.disconnect({ reconnect: false });
        }
    }

    async loadPlugins() {
        const config = this.config;

        const { NekoAPI: NekoPlugin, TwitterAPI: TwitterPlugin } = require(`../plugins`);

        const neko = new NekoPlugin(config);
        const twitter = new TwitterPlugin(config);

        await this.plugins.set('NekoPlugin', neko)
            .set('TwitterPlugin', twitter);
    }
}