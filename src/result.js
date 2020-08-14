

class Result {

	constructor(data) {
		this.data = data;
		this.versionData = {};
		const k = ['uas', 'props', 'utils'];
		for (let x in k) {
			for (const i in this.data[k[x]]) {
				const a = this.data[k[x]][i];
				this.versionData[a.key] = a.version;
			}
		}
	}

	get isPhone() {
		return this.data.valid.phone && !this.data.valid.tablet;
	}

	get isTablet() {
		return !this.data.valid.phone && this.data.valid.tablet;
	}

	get isComputer() {
		return !this.data.valid.phone && !this.data.valid.tablet;
	}

	get os() {
		return this.data.os ? this.data.os.key : null;
	}

	get size() {
		if (this.isTablet) {
			return 768;
		}
		if (this.isPhone) {
			return 375;
		}
		return 1024;
	}

	version(key) {
		return this.versionData[key] ? this.versionData[key] : null;
	}

}

module.exports = Result;
