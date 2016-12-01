
const sheduleStr = `
module.exports = function (fn) {
  setTimeout(fn, 0);
};
`;

const lodashStr = `{
  Array: Array,
  Date: Date,
  Error: Error,
  Function: Function,
  Math: Math,
  Object: Object,
  RegExp: RegExp,
  String: String,
  TypeError: TypeError,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};`;

const obj = {
  npmModules: [{
    src: ['bluebird/js/release/schedule.js'],
    subStr: /[\d\D]*/,
    newStr: sheduleStr,
  }, {
    src: ['lodash/lodash.js'],
    subStr: /var root = freeGlobal.*/,
    newStr: `var root = ${lodashStr}`,
  }]
};


module.exports = obj;