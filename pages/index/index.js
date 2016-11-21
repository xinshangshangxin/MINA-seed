const { navigate } = require('../../utils/util');

Page({
  data: {},
  onLoad() {
    console.info('onLoad');
  },
  navigate(e) {
    let name = e.currentTarget.dataset.navigateName;
    navigate({
      url: `/pages/${name}/${name}`,
      qs: {},
    });
  },
});
