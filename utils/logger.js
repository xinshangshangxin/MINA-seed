const util = require('./util');

if (typeof MutationObserver !== 'undefined') {
  // 对console进行修改; 微信vConsole无法显示error 和 function
  ['log', 'info', 'debug', 'warn', 'error'].forEach((key) => {
    let originFun = console[key];
    console[key] = (...args) => {
      args = args.map((item) => {
        if (util.isError(item)) {
          return `${item.toString()}  ${item.stack || 'no stack'}`;
        }
        else if (util.isFunction(item)) {
          return item.toString();
        }
        return item;
      });
      args.unshift(util.formatDate('yy/MM/dd hh:mm:ss:SSS'));
      originFun.apply(console, args);
    };
  });
}
