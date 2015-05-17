'use strict';
var gulp    = require('gulp')
  , rimraf  = require('rimraf')
  , plumber = require('gulp-plumber')
  , rename  = require('gulp-rename')
  , configs = require('./webpack.configs')
  , babel   = require('gulp-babel-helpers')
  , webpack = require('webpack')
  , assign  = require('object-assign')
  , fs      = require('fs')
  , release = require('jq-release')
  , WebpackDevServer = require("webpack-dev-server");


gulp.task('clean', function(cb){
  rimraf('./lib', cb);
})

gulp.task('build', ['clean'], function(){
  return gulp.src(['./src/**/*.jsx', './src/**/*.js'])
      //.pipe(plumber())
      .pipe(babel('./util/babelHelpers.js'))
      .pipe(rename({ extname: '.js' }))
      .pipe(gulp.dest('./lib'))
})

gulp.task('create-pkg-json', ['build'], function(done){
  var pkg = assign({}, require('./package.json'))

  delete pkg.devDependencies

  pkg.main = 'index.js'

  fs.writeFile('./lib/package.json', JSON.stringify(pkg, null, 2), done)
})

gulp.task('dev', function(cb) {

  new WebpackDevServer(webpack(configs.dev), {
    publicPath: "/dev",
    hot: true,
    stats: { colors: true }
  })
  .listen(8080, 'localhost', function (err, result) {
    if (err) return cb(err);
    console.log('Listening at localhost:8080');
  });

})

gulp.task('release', ['clean',  'build', 'create-pkg-json'])

gulp.task('publish', ['release'], function(cb){
  release(true, cb)
})