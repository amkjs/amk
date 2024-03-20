process.env.NODE_ENV = 'test';
require('dotenv').config({ path: ['.env.test']})

module.exports = {
  spec: ['./test/**/*.mjs'],
  reporter: 'spec',
  checkLeaks: true,
  // check leaks checks for global variable pollution, have to add __coverage__ to globals
  // refer to this issue: https://github.com/mochajs/mocha/issues/4954
  globals: ['__coverage__'],
  reporterOptions: {
    output: 'mocha.json'
  },
  require: './test/index.mjs',
}