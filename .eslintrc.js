var path = require('path');

module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    App: false, // 小程序
    getApp: false,  // 小程序
    Page: false,    // 小程序
    wx: false,     // 小程序
  },
  rules: {
    'brace-style': ['error', 'stroustrup'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [path.resolve(__dirname, 'config/**/*.js')],
    }],
    'new-cap': ['error', { capIsNewExceptions: ['App', 'Page'] }],
    'no-console': ['off'],
    'no-param-reassign': ['off'],
    'no-use-before-define': ['error', {
      functions: false
    }],
    'prefer-const': ['off'],
  },
};