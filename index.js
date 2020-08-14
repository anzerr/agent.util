
const {Match} = require('./src/match'),
	{Cache} = require('storage.ts'),
	Think = require('think.library'),
	is = require('type.util'),
	{Rule} = require('./src/rule'),
	Result = require('./src/result');

class UserAgent {

	constructor(config = {timeout: 60000}) {
		this.config = config;
		this.rules = new Rule();
		this.match = new Match(this.rules);
		if (this.config.timeout) {
			this.cache = new Cache();
			this.timeout = this.config.timeout;
		}
		if (this.config.sortTick) {
			this.sortThink = new Think(() => this.rules.sort(), this.config.sortTick);
		}
	}

	get(ua, simple) {
		if (this.dead) {
			throw new Error('userAgent matcher has been killed');
		}
		if (!is.string(ua)) {
			throw new Error('userAgent should be a string');
		}
		if (!ua || ua.length < 5) {
			return new Result({valid: {phone: false, tablet: false}});
		}
		const userAgent = ua.substr(0, 500);
		if (!this.cache) {
			// skip cache
			return this.match.get(userAgent, simple);
		}

		const d = this.cache.get(userAgent);
		if (d) {
			return d;
		}
		const result = this.match.get(userAgent);
		this.cache.set(userAgent, result, this.timeout);
		return result;
	}

	close() {
		if (this.sortThink) {
			this.sortThink.stop();
			this.sortThink = null;
		}
		if (this.cache) {
			this.cache.close();
			this.cache = null;
		}
		this.dead = true;
		for (const i in this.rules) {
			this.rules[i] = null;
		}
	}

}

module.exports = {UserAgent: UserAgent};
