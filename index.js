
const {match} = require('./src/match'),
    {Cache} = require('storage.ts'),
    Think = require('think.library'),
    is = require('type.util'),
    {rule} = require('./src/rule');

class UserAgent {

    constructor(config = {timeout: 60000}) {
        this.config = config;
        if (this.config.timeout) {
            this.cache = new Cache();
            this.timeout = this.config.timeout;
        }
        if (this.config.sortTick) {
            this.sortThink = new Think(() => rule.sort(), this.config.sortTick);
        }
    }

    get(ua) {
        if (!is.string(ua)) {
            throw new Error('userAgent should be a string');
        }
        const userAgent = ua.substr(0, 500);
        if (!this.cache) {
            return match.get(userAgent);
        }
        const d = this.cache.get(userAgent);
        if (d) {
            return d;
        }
        const result = match.get(userAgent);
        this.cache.set(userAgent, result, this.timeout);
        return result;
    }

    metric() {
        return rule.metric();
    }

    close() {
        if (this.sortThink) {
            this.sortThink.stop();
        }
        if (this.cache) {
            this.cache.close();
        }
    }

}

module.exports = {UserAgent};