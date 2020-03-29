
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./spotify-js.cjs.production.min.js')
} else {
  module.exports = require('./spotify-js.cjs.development.js')
}
