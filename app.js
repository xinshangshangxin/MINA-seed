// app.js
const util = require('./utils/util.js');

App({
  onLaunch() {
    // 调用API从本地缓存中获取数据
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    logs.splice(100, logs.length);
    wx.setStorageSync('logs', logs);
    console.log('launch at: ', util.formatDate('yy/MM/dd hh:mm:ss'));
    this.init();
  },
  init() {
    // 修改/注入一些方法, 如 Promise, console, wx 接口Promise化
    // eslint-disable-next-line global-require
    require('./utils/inject');
  },
});
