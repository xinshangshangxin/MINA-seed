const gulp = require('gulp');
const path = require('path');
const utilities = require('../utilities');
const config = require('./config');

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del'],
});

gulp.task('clean', function (done) {
  return $.del(config.clean.src, done);
});

gulp.task('lint', () => gulp
  .src(config.js.src, config.js.opt)
  .pipe($.cached('wxJs'))
  .pipe($.eslint())
  .pipe($.eslint.result(result => {
    utilities.eshintReporter(result);
  }))
  .pipe($.remember('wxJs'))
);
// .pipe($.eslint.format())
// .pipe($.eslint.failAfterError())

gulp.task('eslintFix', () => gulp
  .src(config.js.src, config.js.opt)
  .pipe($.eslint({ fix: true }))
  .pipe($.eslint.result(result => {
    utilities.eshintReporter(result);
  }))
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
  .pipe($.eslintIfFixed(config.js.dest))
);

gulp.task('watch', () => {
  gulp.parallel([
    'lint',
    'sass',
  ])();
  gulp.watch(config.js.src, config.js.opt)
    .on('change', () => {
      // js文件需要 jshint
      gulp.series('lint')();
    });

  gulp.watch(config.sass.watcherPath)
    .on('change', () => {
      gulp.series('sass')();
    });
});

gulp.task('sass', function () {
  return gulp.src(config.sass.src, config.sass.opt)
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe($.rename(function (path) {
      path.dirname += `/${path.basename}`;
      path.extname = `.wxss`;
      return path;
    }))
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('npmModules', function () {
  return gulp.src(config.npmModules.src, config.npmModules.opt)
    .pipe(gulp.dest(config.npmModules.dest));
});

gulp.task('copySchedule', function () {
  return gulp.src(config.npmModules.copyFiles.src)
    .pipe(gulp.dest(config.npmModules.copyFiles.dest));
});


gulp.task('default', () => {
  gulp.series('clean', 'npmModules', 'copySchedule', 'watch')();
});

