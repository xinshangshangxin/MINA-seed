const { formatDate } = require('./utils/util.js');
const inject = require('./utils/inject');

App({
  onLaunch() {
    console.log('launch at: ', formatDate('yy/MM/dd hh:mm:ss'));

    this.init();

    return wx
      .getStorageAsync({
        key: 'logs',
      })
      .then((data) => {
        let logs = data.data;
        logs.unshift(Date.now());
        logs.splice(100, logs.length);

        return wx.setStorageAsync({
          key: 'logs',
          data: logs,
        });
      })
      .catch(e => console.warn(e));
  },
  init() {
    // 注入一些方法, 如 bluebird, lodash, debugLog, wx 接口Promise化, requestLoading
    inject.init({
      debugLog: true,
      bluebird: true,
      wxPromise: true,
      requestLoading: true,
      lodash: true,
    });
  },
});
