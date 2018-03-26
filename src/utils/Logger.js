const moment = require('moment');
const chalk = require('chalk');
const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;

module.exports = class Logger {
    /**
     * Log a error.
     * 
     * @param {String} msg Message of output
     */
    static error(msg) {
        return console.error(`${timestamp} [${chalk.bgRed('ERROR')}]: ${chalk.white(msg)}`);
    }

    /**
     * Log a warning.
     * 
     * @param {String} msg Message of output
     */
    static warn(msg) {
        return console.warn(`${timestamp} [${chalk.bgYellow('WARN')}]: ${chalk.white(msg)}`);
    }

    /**
     * Debug a message
     * 
     * @param {String} msg Message of output
     */
    static debug(msg) {
        return console.log(`${timestamp} [${chalk.green('DEBUG')}]: ${chalk.white(msg)}`);
    }

    /**
     * A custom output
     * 
     * @param {String} msg Message of output
     * @param {String} title Your custom title
     */
    static custom(title, msg) {
        return console.log(`${timestamp} [${chalk.bgMagenta(title)}]: ${chalk.white(msg)}`);
    }
}