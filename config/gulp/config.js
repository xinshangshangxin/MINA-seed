const config = {
  clean: {                   // 清除生成文件的路径
    src: [
      './pages/**/*.wxss',
      './utils/vendor',
    ],
  },
  sass: {
    watcherPath: ['scss/**/*.scss'],    // watch:scss 文件路径
    src: [
      '*',
      '!_*',
    ],
    opt: {
      cwd: './scss',
    },
    dest: 'pages/',
  },
  js: {
    src: [
      'app.js',
      'pages/**/*.js',
      'service/**/*.js',
      'utils/*.js',
      '!utils/vendor/**/*.js',
    ],
    opt: {
      cwd: './',
      base: './',
    },
    dest: './',
  },
  npmModules: {
    src: [
      'lodash.get/index.js',
      'lodash.find/index.js',
      'bluebird/js/release/**/*',
    ],
    opt: {
      cwd: './node_modules',
      base: './node_modules',
    },
    copyFiles: {
      src: ['./config/gulp/copyFiles/schedule.js'],
      dest: './utils/vendor/bluebird/js/release',
    },
    dest: './utils/vendor',
  },
};

module.exports = config;
