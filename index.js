const Crypt = require('./lib').default

module.exports = (text, salt = '') => new Crypt(text, salt)
