global.Promise = require('bluebird');

const Utils = require('../../utils/Util');
const Eris = Utils.loadEris(require('eris')).Client;
const fs = require('fs');
const Gearbox = require('../modules/Gearbox');
const BotLists = require('../modules/BotLists');
const Webhooks = require('../../utils/Webhook');
const Osu = require('node-osu');
const Kitsu = require('kitsu');

module.exports = class YuiClient extends Eris {
    /**
     * Create a new Yui instance
     * 
     * @param {String} token The discord bot token
     * @param {Object} options Eris' client options
     * @returns The instance of Yui
     */
    constructor(token, options = {}) {
        super(token, options);

        this.commands = [];
        this.aliases = [];
        this.config = require('../config.json');
        this.log = require('../../utils/Logger');
        this.utils = require('../../utils/Util');
        this.gearbox = new Gearbox(this);
        this.botlists = new BotLists(this);
        this.messages = 0;
        this.commandsExecuted = 0;
        this.fails = 0;
        this._snek = require('snekfetch');
        //this.webhook = new Webhooks(this);
        //this.r = require('../../database/RethinkDB');
        this.version = require('../../../package.json').version;
        this._osu = new Osu.Api(this.config.tokens.osu, {
            notFoundAsError: true,
			completeScores: false
        });
        this._kitsu = new Kitsu();
    }

    /**
     * Run the bot
     * @returns The bot running..
     */
    async start() {
        await this._load();
        
        this.connect().then(() => {
            this.log.custom('WebSocket', 'Connected to Discord via WebSocket!');
        });
    }

    /**
     * Load the commands/events
     * 
     * @returns The commands/events.
     */
    async _load() {
        this.log.debug('Now loading the bot, loading commands...');

        const categories = await fs.readdirSync('./commands');
        for (let i = 0 ; i < categories.length ; i++) {
            fs.readdir(`./commands/${categories[i]}`, (err, files) => {
                if (err) this.log.error(`An fs error has occured\n\n${err.stack}`);
                this.log.custom('Commands', `Loading ${files.length} commands from category ${categories[i]}...`);
                files.forEach(f => {
                    try {
                        const Command = require(`../commands/${categories[i]}/${f}`);
                        const cmd = new Command(this);
    
                        if (!cmd.options.aliases || cmd.options.isEnabled) return;

                        this.commands.push(cmd);

                        cmd.options.aliases.forEach(a => this.aliases.push(a));
                    } catch(err) {
                        this.fails++;
                        this.log.error(`Command ${f.replace('.js', '')} has failed.\n\t${err.stack}`);
                    }
                });
                this.log.custom(`Commands`, `Loaded ${this.fails - files.length} commands! (${this.fails} fails.)`);
            });
        }

        this.log.debug('Loaded the command, now loading the events!');
        fs.readdir('./events', (err, files) => {
            if (err) this.log.error(`\n${err.stack}`);
            this.log.custom('Events', `Loading ${files.length} events...`);
            files.forEach(f => {
                const Events = require(`../events/${f}`);
                const event = new Events(this);
                const eventName = event.name;

                const wrapper = async(...args) => {
                    try {
                        await event.run(...args);
                    } catch(err) {
                        this.log.error(`\n\t${err.stack}`);
                    }
                }

                this.on(eventName, wrapper);
            });

            this.log.custom('Events', `Loaded ${files.length} events, connecting via WebSocket/Discord...`);
        });
    }
}