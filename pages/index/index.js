const { bindNavigate } = require('../../utils/util');

Page({
  data: {},
  onLoad() {
    console.info('onLoad');
  },
  navigate: bindNavigate(),
});
