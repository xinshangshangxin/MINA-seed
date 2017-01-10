const { bindNavigate } = require('../../utils/util');

Page({
  data: {
    initTime: new Date(),
  },
  onLoad() {
    console.info('onLoad');
    wx.requestAsync({
      url: 'https://github.com/xinshangshangxin/MINA-seed',
    });
  },
  navigate: bindNavigate({
    url: '/pages/logs/logs',
    params: ['name', 'fromPage', {
      key: 'key',
      filter: 'value',
    }, {
      key: 'upperCase',
      filter(value) {
        return value.toLocaleUpperCase();
      },
    }, {
      key: 'time',
      filter() {
        return `navigateTime| ${new Date()} ---- initTime| ${this.data.initTime}`;
      },
    }],
  }),
});
