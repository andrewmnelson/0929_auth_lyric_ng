'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');

// provide task names for dev, test, production builds
gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
  });

gulp.task('staticfiles:dev', function() {
  return gulp.src('./app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('jshint:dev', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build:dev', ['jshint:dev', 'staticfiles:dev', 'webpack:dev']);

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['build:dev']);
    gulp.watch('app/*.html', ['staticfiles:dev']);
});

gulp.task('default', ['build:dev']);
