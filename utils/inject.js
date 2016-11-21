const util = require('./util');

// 微信vConsole无法显示error 和 function
require('./logger');
const Promise = require('./vendor/bluebird/js/release/bluebird.js');

console.log('injected bluebird promise');
util.Promise = Promise;
util.defer = () => {
  let resolve;
  let reject;
  let promise = new Promise((...args) => {
    resolve = args[0];
    reject = args[1];
  });

  return {
    resolve,
    reject,
    promise,
  };
};

// 注入部分lodash方法
const _ = {};
_.get = require('./vendor/lodash.get/index');
_.find = require('./vendor/lodash.find/index');

util._ = _;


// 将微信接口转换为Promise
// 如 wx.request 转换为 wx.requestAsync
require('./wxPromise')();

console.info('done wxPromise');

module.exports = {
  Promise,
  _,
};
