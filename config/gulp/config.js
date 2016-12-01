const filterConfig = require('./filterConfig');

const config = {
  clean: {
    src: [
      'utils/vendor',
      'pages/**/*.wxss',
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
    dest: 'pages/'
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
    dest: './'
  },
  npmModules: {
    src: [
      'bluebird/js/release/**/*',
      'lodash/lodash.js'
    ],
    opt: {
      cwd: './node_modules',
      base: './node_modules'
    },
    dest: './utils/vendor',
    filters: filterConfig.npmModules,
  },
};

module.exports = config;