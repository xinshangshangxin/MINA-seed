// logs.js
let util = require('../../utils/util.js');

Page({
  data: {
    logs: [],
  },
  onLoad(option) {
    this.setData({
      optionStr: JSON.stringify(option, null, 2),
      logs: (wx.getStorageSync('logs') || []).map(log =>
        util.formatDate('yyyy/MM/dd hh:mm:ss:SSS', new Date(log))
      ),
    });
  },
});
