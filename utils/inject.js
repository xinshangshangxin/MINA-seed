const util = require('./util');
const rl = require('./request-loading');
const wxLogger = require('./logger');

let _;
let BB;

if (typeof Promise !== 'undefined') {
  util.Promise = Promise;
}

function addBluebird() {
  // eslint-disable-next-line global-require
  BB = require('./vendor/bluebird/js/release/bluebird.js');

  util.Promise = BB;
  util.defer = () => {
    let resolve;
    let reject;
    let promise = new BB((...args) => {
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
function init({ debugLog = false, bluebird = true, wxPromise = true, requestLoading = false, lodash = true } = {}) {
  // 微信vConsole无法显示error 和 function
  if (debugLog) {
    wxLogger.init();
  }

  if (bluebird) {
    addBluebird();
    console.info('injected bluebird promise');
  }

  if (wxPromise) {
    if (!util.Promise) {
      throw new Error('wxPromise need bluebird, but not found bluebird or native Promise');
    }
    else if (!BB && util.Promise) {
      throw new Error('wxPromise need bluebird, found native Promise');
    }

    // 将微信接口转换为Promise
    // 如 wx.request 转换为 wx.requestAsync
    // eslint-disable-next-line global-require
    require('./wxPromise').init(wxPromise);
    console.info('injected wxPromise');
  }

  if (requestLoading) {
    if (!wxPromise) {
      throw new Error('requestLoading need wxPromise');
    }

    rl.init(requestLoading);
    console.info('injected requestLoading');
  }

  if (lodash) {
    // eslint-disable-next-line global-require
    _ = require('./vendor/lodash/lodash');
    util._ = _;
    console.info('injected lodash');
  }
}

module.exports = {
  init,
};
