
const {UserAgent} = require('../index'),
    data = require('./data'),
    assert = require('assert'),
    {rule} = require('../src/rule');

const user = new UserAgent();
for (const i in data) {
    for (const x in data[i]) {
        user.get(data[i][x].user_agent);
    }
}

user.rules.sort();
user.rules.metric();

const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36';
let u = user.get(agent);
assert.equal(u.data.os, null);
assert.equal(u.data.phone, null);
assert.equal(u.data.tablet, null);
assert.equal(u.data.valid.tablet, false);
assert.equal(u.data.valid.phone, false);
assert.equal(u.data.uas.length, 0);
assert.equal(u.version('Windows NT'), '10.0');

u = user.get('');
assert.equal(u.data.os, undefined);
assert.equal(u.data.phone, undefined);
assert.equal(u.data.tablet, undefined);
assert.equal(u.data.valid.tablet, false);
assert.equal(u.data.valid.phone, false);

try {
    user.get(1);
} catch(e) {
    assert.equal(e.toString(), 'Error: userAgent should be a string');
}

try {
    user.get(true);
} catch(e) {
    assert.equal(e.toString(), 'Error: userAgent should be a string');
}

try {
    user.get([]);
} catch(e) {
    assert.equal(e.toString(), 'Error: userAgent should be a string');
}

try {
    user.get({});
} catch(e) {
    assert.equal(e.toString(), 'Error: userAgent should be a string');
}

user.close();