const opn = require('opn')
require('dotenv/config')

console.log('Opening Browser...')
opn(`http://${process.env.HOST || 'localhost'}:${process.env.PORT || 80}`)
