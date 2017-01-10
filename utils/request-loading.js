
function init(config = {}) {
  const originRequet = wx.requestAsync;

  let requestIndex = 0;
  wx.requestAsync = function requestAsync(...args) {
    requestIndex += 1;
    if (requestIndex === 1) {
      wx.showToastAsync({
        icon: 'loading',
        duration: 10000,
        title: config.title || '',
      });
    }

    return originRequet.apply(wx, args)
      .finally(() => {
        requestIndex -= 1;
        if (requestIndex === 0) {
          wx.hideToast();
        }
      });
  };
}

module.exports = {
  init,
};
