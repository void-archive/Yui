const WebSocket = require('uws');
const { EventEmitter } = require('events');

module.exports = class Node extends EventEmitter {
    /**
     * Create a new Lavalink Node instance.
     * 
     * @param {Object} options the Lavalink node optons.
     * @param {String} [options.host] The host (Default: 127.0.0.1)
     * @param {Number} [options.port] The port in the Lavalink config
     * @param {String} [options.pwd] The password (Default: 'youshallnotpass')
     * @param {Array} [options.shards] The shards
     * @param {String} [options.shardId] The shard ID (Default: 0)
     * @param {String} [options.shardCount] The total shards (Default: 1)
     * @param {Object} [options.stats] The livetime stats.
     * @param {String} [options.userId] The user id
     */
    constructor(options = { host = '127.0.0.1', port, pwd = 'youshallnotpass', shards = [], shardId = 0, shardCount = 1, stats = {}, userId }) {
        super();

        this.host = options.host;
        this.port = options.port;
        this.shards = options.shards;
        this.shardId = options.shardId;
        this.password = options.pwd;
        this.address = `ws://${this.host}:${this.port}`;
        this.shardCount = options.shardCount;
        this.userId = options.userId;
        this.stats = options.stats || {
            players: 0,
            playingPlayers: 0
        };
    }

    /**
     * Create a node.
     */
    async createNode() {
        this.ws = new WebSocket(this.address, {
            'Authorization': this.pwd,
            'Num-Shards': this.shardCount,
            'User-Id': this.userId
        });

        this.ws.on('open', this.ready.bind(this))
            .on('err', (err) => {
                this.emit('nodeError', err);
            })
            .on('message', this.message.bind(this))
            .on('close', this.disconnect.bind(this));

        this.emit('nodeCreated', 'Node has been created!');
    }

    /**
     * The disconnect handler
     * 
     * @param {Boolean} reconnect Wanna reconnect?
     * @private
     */
    async disconnect(reconnect) {
        const wanna = Boolean(reconnect);

        if (wanna) {
            this.emit('nodeDestorying', 'Node is currently destroying (Reason: Reconnecting)');
            await this.destroy();
            this.emit('nodeRecreating', 'Node is currently recreating...');
            this.createNode();
        } else {
            await this.destroy();
            delete this.ws;
            this.emit('nodeDestoryed', 'Node has been destroyed; Please run this again.');
        }
    }

    /**
     * Destroy the node
     * 
     * @private
     */
    async destroy() {
        if (this.ws) {
            this.ws.removeListener('close', this.disconnect(false));
            this.ws.close();
        }
    }

    /**
     * Send some payload.
     * 
     * @param {*} msg The payload
     * @returns {*} the stringified payload.
     */
    send(msg) {
        const WeebSocket = this.ws;

        if (!WeebSocket) return;

        try {
            let data = await JSON.stringify(msg);
        } catch(err) {
            this.emit('nodeSendingError', err);
        }

        WeebSocket.send(msg);
    }

    /**
     * Getting some JSON data.
     * 
     * @param {String} data The message u wanna send
     */
    message(data) {
        try {
            data = JSON.stringify(data);
        } catch(err) {
            this.emit('nodeMessageError', err);
        }

        if (data.op && data.op === 'stats') {
            this.stats = data;
        }

        this.emit('nodeMessageCreate', data);
    }
}