'use strict';

module.exports = function (config) {

  config.set({

    basePath: '',

    frameworks: ['mocha', 'sinon'],

    reporters: ['mocha'],

    files: [
      'test/fixtures/*.html',
      'test.js'
    ],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

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
