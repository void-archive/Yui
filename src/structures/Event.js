module.exports = class Event {
    constructor(bot, {
        eventName = null
    }) {
        this.bot = bot;
        this.uwu = { eventName };
    }
}