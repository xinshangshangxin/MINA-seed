const { bindNavigate } = require('../../utils/util');

Page({
  data: {
    initTime: new Date(),
  },
  onLoad() {
    console.info('onLoad');
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
