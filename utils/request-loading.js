
function init() {
  const originRequet = wx.requestAsync;

  let requestIndex = 0;
  wx.requestAsync = function requestAsync(...args) {
    requestIndex += 1;
    if (requestIndex === 1) {
      console.info('-----------show loading----------');
      wx.showToast({
        icon: 'loading',
        duration: 10000,
      });
    }

    return originRequet.apply(wx, args)
      .finally(() => {
        requestIndex -= 1;
        if (requestIndex === 0) {
          console.info('----------hide loading----------');
          wx.hideToast();
        }
      });
  };
}

module.exports = {
  init,
};
