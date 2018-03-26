const EventError = require('../../errors/EventError');

module.exports = class BaseEvent {
    constructor(bot) {
        if (!bot) throw new EventError('NO_BOT_DEFINED');

        this.bot = bot;
    }
}