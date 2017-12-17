const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minifyJS = require('gulp-uglifyjs');
const minifyCSS = require('gulp-clean-css');
const replace = require('gulp-replace');
const minifyHTML = require('gulp-cleanhtml');
const autoPrefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');

gulp.task('default', ['sass', 'js', 'html']);

gulp.task('sass', () => {
  return gulp
    .src('./web/src/**/*.scss')
    .pipe(
      sass({
        paths: [path.join(__dirname, 'styles', 'includes')]
      })
    )
    .pipe(
      autoPrefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./web/build/styles'));
});

gulp.task('js', () => {
  return browserify({ entries: ['./web/src/js'] })
    .transform(stringify(['.html']))
    .transform('babelify', { presets: [ 'es2015', 'es2016' ] })
    .transform('uglifyify')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./web/build/js'));
});

gulp.task('html', () => {
  return gulp
    .src('./web/src/**/*.html')
    .pipe(minifyHTML())
    .pipe(replace(/\>[\s]+\</g, '><'))
    .pipe(gulp.dest('./web/build'));
});

gulp.task('watch', ['default'], () => {
  gulp.watch('./web/src/**/*.js', ['js']);
  gulp.watch('./web/src/**/*.sass', ['sass']);
  gulp.watch('./web/src/**/*.html', ['html']);
});
