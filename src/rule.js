
const is = require('type.util'),
	{ruleDate} = require('./data');

class RuleWrapper {

	constructor(key, regex) {
		this.key = key;
		this.match = 0;
		this.regex = (is.array(regex) ? regex : [regex]).map((a) => new RegExp(a.replace('[VER]', '([\\w._\\+]+)'), 'i'));
	}

	valid(str) {
		if (this.regex.length === 1) {
			const a = str.match(this.regex[0]);
			if (a) {
				this.match += 1;
				return {key: this.key, version: a[2] || a[1]};
			}
		}
		for (const i in this.regex) {
			const a = str.match(this.regex[i]);
			if (a) {
				this.match += 1;
				return {key: this.key, version: a[2] || a[1]};
			}
		}
		return false;
	}

}

class Rule {

	constructor() {
		this.keys = ['phone', 'tablet', 'oss', 'uas', 'props', 'utils'];
		this.init();
	}

	init() {
		for (const i in this.keys) {
			const k = this.keys[i], o = [];
			for (const x in ruleDate[k]) {
				o.push(new RuleWrapper(x, ruleDate[k][x]));
			}
			this[k] = o;
		}
	}

	sort() {
		for (const i in this.keys) {
			this[this.keys[i]] = this[this.keys[i]].sort((a, b) => b.match - a.match);
		}
	}

	metric() {
		const out = {};
		for (const i in this.keys) {
			const k = this.keys[i], data = this[k];
			out[k] = {};
			for (const x in data) {
				out[k][data[x].key] = data[x].match;
			}
		}
		return out;
	}

}

module.exports = {RuleWrapper: RuleWrapper, Rule: Rule};
