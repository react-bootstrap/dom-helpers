import expect from 'expect.js'

global.expect = expect

let testsContext = require.context('./test', true, /\.js$/)

testsContext.keys().forEach(testsContext)
