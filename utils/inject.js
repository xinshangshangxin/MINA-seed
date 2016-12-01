const util = require('./util');
const _ = require('./vendor/lodash/lodash');
const Promise = require('./vendor/bluebird/js/release/bluebird.js');
const rl = require('./request-loading');
const wxLogger = require('./logger');

function addBluebird() {
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
}

// eslint-disable-next-line max-len
function init({ debugLog = true, bluebird = true, wxPromise = true, requestLoading = true, lodash = true }) {
  // 微信vConsole无法显示error 和 function
  if (debugLog) {
    wxLogger.init();
  }

  if (bluebird) {
    addBluebird();
    console.info('injected bluebird promise');
  }

  if (wxPromise) {
    if (!bluebird) {
      throw new Error('wxPromise need bluebird');
    }

    // 将微信接口转换为Promise
    // 如 wx.request 转换为 wx.requestAsync
    // eslint-disable-next-line global-require
    require('./wxPromise').init();
    console.info('injected wxPromise');
  }

  if (requestLoading) {
    if (!wxPromise) {
      throw new Error('requestLoading need wxPromise');
    }

    rl.init();
    console.info('injected requestLoading');
  }

  if (lodash) {
    util._ = _;
    console.info('injected lodash');
  }
}

module.exports = {
  init,
};
