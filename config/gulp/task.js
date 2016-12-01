const gulp = require('gulp');
const path = require('path');
const { eshintReporter, isArray, isFunction, isString } = require('../utilities');
const config = require('./config');
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del'],
});


function changeSrc(src) {

  if (isString(src)) {
    return path.join('**', src);
  }
  else if (isArray(src)) {
    return src.map((value) => {
      return path.join('**', value);
    });
  }
}

function fileFilter(stream, filters = []) {
  let f;

  filters.forEach((item) => {
    if (!item.src || !item.src.length) {
      return;
    }

    f = $.filter(changeSrc(item.src), { restore: true });

    if (isFunction(item.newStr)) {
      item.newStr = item.newStr($);
    }

    stream = stream
      .pipe(f)
      .pipe($.replace(item.subStr, item.newStr))
      .pipe(f.restore);

  });

  return stream;
}

gulp.task('clean', function(done) {
  return $.del(config.clean.src, done);
});

gulp.task('lint', () => gulp
  .src(config.js.src, config.js.opt)
  .pipe($.cached('wxJs'))
  .pipe($.eslint())
  .pipe($.eslint.result(result => {
    eshintReporter(result);
  }))
  .pipe($.remember('wxJs'))
);

gulp.task('eslintFix', () => gulp
  .src(config.js.src, config.js.opt)
  .pipe($.eslint({ fix: true }))
  .pipe($.eslint.result(result => {
    eshintReporter(result);
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
  return fileFilter(gulp.src(config.npmModules.src, config.npmModules.opt), config.npmModules.filters)
    .pipe(gulp.dest(config.npmModules.dest));
});


gulp.task('default', () => {
  gulp.series('clean', 'npmModules', 'watch')();
});

