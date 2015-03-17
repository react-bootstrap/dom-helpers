'use strict';

module.exports = function (config) {
  

  process.env.SAUCE_USERNAME = require('./sl.json').username;
  process.env.SAUCE_ACCESS_KEY = require('./sl.json').accessKey;


  var customLaunchers = {
    SL_ie_8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows XP',
      version: '8'
    },

    // SL_ie_9: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 7',
    //   version: '9'
    // },
    // SL_ie_10: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   version: '10'
    // },
    // SL_chrome: {
    //   base: 'SauceLabs',
    //   browserName: 'chrome'
    // },
    // SL_firefox: {
    //   base: 'SauceLabs',
    //   browserName: 'firefox'
    // },
    // sl_ios_safari: {
    //   base: 'SauceLabs',
    //   browserName: 'iphone',
    //   platform: 'OS X 10.9',
    //   version: '7.1'
    // },
  };

  config.set({

    basePath: '',

    frameworks: ['mocha'],

    reporters: ['mocha'],

    client: {
      mocha: {
        timeout : 20000 // 20 seconds
      }
    },

    files: [
      'vendor/es5-shim.min.js',
      'vendor/es5-sham.min.js',
      'vendor/sinon-1.10.3.js', //because sinon hates webpack
      'test/fixtures/*.html',
      'test.js'
    ],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    preprocessors: {
      'test/fixtures/*.html': 'html2js',
      'test.js': ['webpack', 'sourcemap']
    },

    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    
    webpack: {
      devtool: 'inline-source-map',

      entry: __dirname + '/test.js',
      module: {
        loaders: [
          { 
            test:    /.js$/, 
            loader:  'babel-loader', 
            query:   require('./package.json').babel, 
            exclude: /node_modules/
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  });
};