
5no-crypt tools for Encrypt/Decrypt string

## Install

5no-crypt requires Node version 8 or a bove.

```sh
npm install --save 5no-crypt
```

## Examples

```js
const Crypt = require('5no-crypt')

let encrypt = Crypt('hello world :)', '0.nc5.09213').encrypt()

console.log(encrypt)

//G983N8N6M9Cz6B4uD9kHMB4K69Cz68A008YNM11

let decrypt = Crypt('G983N8N6M9Cz6B4uD9kHMB4K69Cz68A008YNM11', '0.nc5.09213').decrypt()

console.log(decrypt)

//hello world :)

```

## License

MIT Licensed, Copyright (c) 2019 Aleksandr Sokol