const colors = require('ansicolors');
const val = new Date();
const timestamp = `[${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}]`;

module.exports = class Logger {
    /**
     * Log a error.
     * 
     * @param {String} msg Message of output
     */
    static error(msg) {
        return console.error(`${timestamp} [${colors.bgRed('ERROR')}]: ${colors.white(msg)}`);
    }

    /**
     * Log a warning.
     * 
     * @param {String} msg Message of output
     */
    static warn(msg) {
        return console.warn(`${timestamp} [${colors.bgYellow('WARN')}]: ${colors.white(msg)}`);
    }

    /**
     * Debug a message
     * 
     * @param {String} msg Message of output
     */
    static debug(msg) {
        return console.log(`${timestamp} [${colors.green('DEBUG')}]: ${colors.white(msg)}`);
    }

    /**
     * A custom output
     * 
     * @param {String} msg Message of output
     * @param {String} title Your custom title
     */
    static custom(title, msg) {
        return console.log(`${timestamp} [${colors.bgMagenta(title)}]: ${colors.white(msg)}`);
    }
}