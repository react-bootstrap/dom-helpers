'use strict';
var gulp    = require('gulp')
  , rimraf  = require('rimraf')
  , plumber = require('gulp-plumber')
  , babel = require('./package.json').babel
  , babelTransform = require('gulp-babel-helpers');


gulp.task('clean', function(cb){
  rimraf('./lib', cb);
})

gulp.task('build', ['clean'], function(){

  return gulp.src('./src/**/*.js')
      .pipe(plumber())
      .pipe(babelTransform(
          babel
        , './util/babelHelpers.js'
        , './lib/util/babelHelpers.js'))
      .pipe(gulp.dest('./lib'));
})