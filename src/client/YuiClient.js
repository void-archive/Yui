const ErisMods = require('../util/ErisExtensions');
const Eris = ErisMods.load(require('eris')).Client;
const fs = require('fs');

module.exports = class YuiClient extends Eris {
    constructor(token, options) {
        super(token, options);

        this.commands = [];
        this.aliases = [];
    }
}