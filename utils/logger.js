const util = require('./util');

function flatItem(item) {
  if (util.isError(item)) {
    return `${item.toString()}  ${item.stack || 'no stack'}`;
  }
  else if (util.isFunction(item)) {
    return item.toString();
  }
  else if (util.isObject(item)) {
    Object.keys(item).forEach((key) => {
      item[key] = flatItem(item[key]);
    });
  }
  return item;
}

function init() {
  // 微信环境中修改log输出
  if (typeof MutationObserver !== 'undefined' && typeof window === 'undefined') {
    // 对console进行修改; 微信vConsole无法显示error 和 function
    ['log', 'info', 'debug', 'warn', 'error'].forEach((key) => {
      let originFun = console[key];
      console[key] = (...args) => {
        args = args.map(flatItem);
        args.unshift(util.formatDate('yy/MM/dd hh:mm:ss:SSS'));
        originFun.apply(console, args);
      };
    });
  }
}

module.exports = {
  init,
};
