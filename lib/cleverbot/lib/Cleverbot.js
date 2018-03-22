const EventEmitter = require('events').EventEmitter;
const { CleverbotError } = require('../');
const snek = require('snekfetch');

module.exports = class CleverbotAPI extends EventEmitter {
    /**
     * Create a cleverbot instance
     * 
     * @param {String} nick Your nickname. (Default: "Yui Hirasawa")
     * @param {*} user The username.
     * @param {*} key The api key.
     */
    constructor(nick = 'Yui Hirasawa', user, key) {
        super();

        if (typeof nick !== 'string') throw new CleverbotError('NICK_NOT_STRING');
        if (typeof user !== 'string') throw new CleverbotError('USER_NOT_STRING');
        if (typeof key !== 'string') throw new Cleverbot('KEY_NOT_STRING');
        this.apiUrl = 'https://cleverbot.io/1.0';
    }

    /**
     * Get a endpoint from the API
     * 
     * @param {String} endpoint The endpoint queried.
     * @private 
     * @returns {void} ...?
     */
    async _get(endpoint) {
        return new Promise((res, rej) => {
            await snek.get(`${this.apiUrl}/${endpoint}`)
                .set('Authorization', this.key)
                .then((resp) => res(resp))
                .catch(e => rej(new Error(e)));
        });
    }

    /**
     * Post a endpoint from the API
     * 
     * @param {String} endpoint The endpoint queried.
     * @private 
     * @returns {void} ...?
     */
    async _post(endpoint, data = {}) {
        return new Promise((res, rej) => {
            await snek.get(`${this.apiUrl}/${endpoint}`)
                .set('Authorization', this.key)
                .send(data)
                .then((resp) => res(resp))
                .catch(e => rej(new Error(e)));
        });
    }

    /**
     * Create a bot instance
     * 
     * @returns {Promise<void>} A success or a error?
     */
    async create() {
        const { body } = await this._post('/create', {
            user: this.user,
            key: this.key,
            nick: this.nick
        });

        this.emit('cleverbotCreated', 'Bot account created.');
    }

    /**
     * Ask a question
     * 
     * @param {String} question The question you asked! (Default: I love cake!)
     * @returns {Promise<void>} The response.
     */
    async ask(question = 'I love cake!') {
        const { body } = await this._post('/ask', {
            user: this.user,
            key: this.key,
            nick: this.nick,
            text: question
        });

        this.emit('cleverbotQuestion', body.response);
    }
}