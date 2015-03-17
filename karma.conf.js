'use strict';

module.exports = function (config) {

  config.set({

    basePath: '',

    frameworks: ['mocha'],

    reporters: ['mocha'],

    files: [
      'vendor/sinon-1.10.3.js', //because sinon hates webpack
      'test/fixtures/*.html',
      'test.js'
    ],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_DEBUG,

    browsers: ['PhantomJS'], 

    preprocessors: {
      'test/fixtures/*.html': 'html2js',
      'test.js': ['webpack', 'sourcemap']
    },

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