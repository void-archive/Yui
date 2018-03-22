module.exports = class CleverbotError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
        
        this.name = 'CleverbotError';
        Error.captureStackTrace(this, this.constructor);
    }

    toString(msg) {
        return `CleverbotError: ${msg}`;
    }
}