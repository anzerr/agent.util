

class Result {

    constructor(data) {
        this.data = data;
        this.version = {};
        const k = ['uas', 'props', 'utils'];
        for (let x in k) {
            for (const i in this.data[k[x]]) {
                const a = this.data[k[x]][i];
                this.version[a.key] = a.version;
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
        return this.data.os.key
    }

    version(key) {
        return this.version[key] ? this.version[key].version : null;
    }

}

module.exports = Result;