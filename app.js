const { formatDate } = require('./utils/util.js');
const inject = require('./utils/inject');

App({
  onLaunch() {
    console.log('launch at: ', formatDate('yy/MM/dd hh:mm:ss'));

    this.init();

    return this.addLog();
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
  addLog() {
    let logs = [];
    wx
      .getStorageAsync({
        key: 'logs',
      })
      .then((data) => {
        logs = data.data;
      })
      .catch(e => console.warn(e))
      .then(() => {
        logs.unshift(Date.now());
        logs.splice(100, logs.length);

        return wx.setStorageAsync({
          key: 'logs',
          data: logs,
        });
      });
  },
});
