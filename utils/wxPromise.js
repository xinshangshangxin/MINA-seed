const { Promise } = require('./util');

const noPromiseMethods = {
  createAnimation: true,
  createContext: true,
  hideKeyboard: true,
  hideNavigationBarLoading: true,
  navigateBack: true,
  pauseBackgroundAudio: true,
  pauseVoice: true,
  stopBackgroundAudio: true,
  showNavigationBarLoading: true,
  stopPullDownRefresh: true,
  stopRecord: true,
  stopVoice: true,
};

function addAsyncFun(key, config = {}) {
  let suffix = config.suffix || 'Async';

  if (noPromiseMethods[key] || key.substr(0, 2) === 'on' || /\w+Sync$/.test(key)) {
    wx[`${key}${suffix}`] = () => Promise.reject(new Error(`${key} no async function`));
    return;
  }

  wx[`${key}${suffix}`] = (obj = {}) => new Promise((resolve, reject) => {
    obj.success = resolve;
    obj.fail = (res) => {
      if (res && res.errMsg) {
        reject(new Error(res.errMsg));
      }
      else {
        reject(res || 'unknown error');
      }
    };
    wx[key](obj);
  });
}


function init(config) {
  Object.keys(wx).forEach((key) => {
    addAsyncFun(key, config);
  });
}

module.exports = {
  init,
};
