
const {UserAgent} = require('../index'),
    data = require('./data'),
    {rule} = require('../src/rule');

let count = 0;
const u = new UserAgent();
for (const i in data) {
    for (const x in data[i]) {
        if (count < 10) {
            u.get(data[i][x].user_agent);
        } else {
            break;
        }
        count++;
    }
}

rule.sort();
u.metric();

const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36';
console.log(u.get(agent).data, agent);
