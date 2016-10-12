import 'es5-shim';
import 'es5-shim/es5-sham';

import expect from 'expect.js';

global.expect = expect

let testsContext = require.context('./test', true, /\.js$/);

testsContext.keys().forEach(testsContext);
