const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const prettier = require('gulp-prettier');
const minifyJS = require('gulp-uglifyjs');
const minifyCSS = require('gulp-clean-css');
const minifyHTML = require('gulp-cleanhtml');
const autoPrefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

gulp.task('default', ['sass', 'format', 'js', 'html']);

gulp.task('sass', () => {
  return gulp
    .src('./web/src/**/*.sass')
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
    .pipe(gulp.dest('./web/build/'));
});

gulp.task('format', () => {
  return gulp
    .src('./web/src/**/*.js')
    .pipe(
      prettier({
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        bracketSpacing: true,
        semi: true
      })
    )
    .pipe(gulp.dest('./web/src/'));
});

gulp.task('js', () => {
  return gulp
    .src('./web/src/**/*.js')
    .pipe(
      babel({
        presets: ['es2015', 'es2016']
      })
    )
    .pipe(minifyJS())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./web/build/js'));
});

gulp.task('html', () => {
  return gulp
    .src('./web/src/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./web/build'));
});

gulp.task('watch', ['default'], () => {
  gulp.watch('./web/src/**/*.js', ['js']);
  gulp.watch('./web/src/**/*.sass', ['sass']);
  gulp.watch('./web/src/**/*.html', ['html']);
});
