'use strict';

module.exports = (config) => {
  const { env } = process;

  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon'],

    reporters: ['mocha'],

    files: ['test/fixtures/*.html', 'test.js'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome', 'Firefox'],

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    preprocessors: {
      'test/fixtures/*.html': 'html2js',
      'test.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',

      entry: `${__dirname}/test.js`,
      module: {
        rules: [
          {
            test: /.(j|t)s$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
        ],
      },
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
      },
    },

    webpackServer: {
      noInfo: true,
    },
  });
};
