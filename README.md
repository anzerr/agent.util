
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/agent.util/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/agent.util/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/agent.util/workflows/test/badge.svg)

Parse and fetch info found inside user-agent

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/agent.util.git
```

### `Example`
``` javascript

const {UserAgent} = require('../index');

const u = new UserAgent();

const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36';
console.log(u.get(agent), agent);
/*
{
  os: null,
  phone: null,
  tablet: null,
  valid: { tablet: false, phone: false },
  uas: [],
  props: [
    { key: 'Safari', version: '537.36' },
    { key: 'Webkit', version: '537.36' },
    { key: 'Chrome', version: '84.0.4147.105' },
    { key: 'Windows NT', version: '10.0' }
  ],
  utils: [ { key: 'WebKit', version: '537.36' } ]
} Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36
*/

```