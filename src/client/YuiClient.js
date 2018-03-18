const ErisMods = require('../util/ErisExtensions');
const Eris = ErisMods.load(require('eris')).Client;
const fs = require('fs');
const MessageCollector = require('../util/MessageCollector');

module.exports = class YuiClient extends Eris {
    constructor(token, options) {
        super(token, options);

        this.commands = [];
        this.aliases = [];
        this.gearbox = require('../modules/Gearbox');
        this.botlists = require('../modules/BotLists');
        this.db = require('../database/RethinkDB');
        this.dbfn = require('../database/DatabaseFunctions');
        this._snek = require('snekfetch');
        this.utils = require('../util/Util');
        this.log = require('../util/Logger');
        this.version = require('../../package.json').version;
        this.fails = 0;
        this.messages = 0;
        this.commandsExecuted = 0;
        this.config = require('../config.json');
    }

    async start() {
        this.MessageCollector = new MessageCollector(this);

        await this._load();
        this.connect().then(() => this.log.custom('WebSocket', 'Yui Hirasawa has connected via WebSocket'));
    }

    async _load() {
        this.log.debug('Yui Hirasawa is currently loading...\n\nLoading commands!');

        const categories = await fs.readdirSync('./commands');
        for (let i = 0; i < categories.length; i++) {
            fs.readdir(`./commands/${categories[i]}`, (err, files) => {
                if (err) throw err;
                this.log.debug(`Loading ${files.length} commands from module "${categories[i]}"`);
                files.forEach(f => {
                    try {
                        const Command = require(`../commands/${categories[i]}/${f}`);
                        const cmd = new Command(this);
    
                        if (cmd.options.isEnabled || !cmd.options.aliases) return;
    
                        this.commands.push(cmd);
                        cmd.options.aliases.forEach(a => this.aliases.push(a));
    
                        this.log.debug(`Command "${cmd.options.name}" has loaded!`);
                    } catch(err) {
                        this.fails++;
                        this.log.error(`Command "${f.replace('.js', '')}" has errored!\n${err.stack}`);
                    }
                });
                this.log.debug(`Loaded ${categories[i]} with ${this.fails} fails.`);
            });
        }

        fs.readdir('./events', (err, files) => {
            if (err) throw err;
            this.log.debug(`Loading ${files.length} events!`);
            files.forEach(async(f) => {
                const Event = require(`../events/${f}`);
                const event = new Event(this);

                await this._doWrapper(event);
            });
        });
    }

    clean(str) {
        if (typeof(str) !== 'string') {
            return str.replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203))
                .replace(this.config.tokens.Discord, '-- Discord API Token --')
                .replace(this.config.tokens.oliyBots, '-- dbl Token --')
                .replace(this.config.tokens.terminal, '-- terminal Token --')
                .replace(this.config.tokens.blspace, '-- botlist.space token --')
                .replace(this.config.tokens.osu, '-- osu! token --');
        } else {
            return str;
        }
    }

    async reboot() {
        await this.disconnect();
        this.log.debug(`Signal to reboot!`);
        await this._load().then(() => {
            this.connect().then(() => {
                this.log.custom('WebSocket', 'A signal has been sent via "reboot" command.');
            });
        });
    }

    get package() {
        return require('../../package.json');
    }

    /**
     * @private
     */
    _doWrapper(event) {
        const wrapper = async(...args) => {
            try {
                await event.run(...args);
            } catch(err) {
                return;
            }
        }

        this.on(event.uwu.name, wrapper);
    }

    /**
     * Set a interval.
     * 
     * @see https://github.com/discordjs/discord.js/blob/master/src/client/BaseClient.js
     * @param {Function} fn Your function
     * @param {Number} delay The delay. (In milliseconds)
     * @returns {Timeout} the delay.
     */
    setInterval(fn, delay = 30000) {
        const val = setInterval(fn, delay);
        return val;
    }
}