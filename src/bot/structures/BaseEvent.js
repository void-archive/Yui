module.exports = class BaseEvent {
    constructor(bot) {
        if (!bot) throw new Error('YuiClient: Not Defined!');

        this.bot = bot;
    }
}