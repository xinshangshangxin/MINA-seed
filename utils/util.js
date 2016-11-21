const svc = {
  formatDate(fmt, date = new Date()) {
    let o = {
      '(y+)': date.getFullYear(),
      '(M+)': date.getMonth() + 1, // 月份
      '(d+)': date.getDate(), // 日
      '(h+)': date.getHours(), // 小时
      '(m+)': date.getMinutes(), // 分
      '(s+)': date.getSeconds(), // 秒
      '(q+)': Math.floor((date.getMonth() + 3) / 3), // 季度
      '(S+)': date.getMilliseconds(), // 毫秒
    };

    Object.keys(o).forEach((key) => {
      if (new RegExp(key).test(fmt)) {
        // eslint-disable-next-line no-param-reassign
        fmt = fmt.replace(RegExp.$1, (`00${o[key]}`).substr(-RegExp.$1.length));
      }
    });

    return fmt;
  },
  throttle,
  setWatch: throttle(function setWatch(e) {
    let key = svc._.get(e, 'currentTarget.dataset.watch');
    if (!key) {
      console.warn('no currentTarget.dataset.watch');
      return;
    }
    let result = {
      [key]: e.detail.value,
    };
    console.info('set setData: ', result);
    this.setData(result);
  }),
  navigate(params = {}) {
    let url = params.url;
    let qs = params.qs || {};

    if (!url) {
      console.warn('no url found', params);
      return svc.Promise.reject(new Error('no url found'));
    }

    let temp = [];
    Object.keys(qs).forEach((key) => {
      if (svc.isObject(qs[key])) {
        qs[key] = encodeURIComponent(JSON.stringify(qs[key]));
      }
      temp.push(`${encodeURIComponent(key)}=${qs[key]}`);
    });

    if (temp && temp.length) {
      if (/\?/.test(url)) {
        temp = `&${temp.join('&')}`;
      }
      else {
        temp = `?${temp.join('&')}`;
      }
    }

    return wx.navigateToAsync({
      url: url + temp,
    });
  },
};


// 微信开发者工具 有时会出现一个事件触发多次
function throttle(fn, delay = 150) {
  let timer = null;

  return function getThrottleFun(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach((name) => {
  svc[`is${name}`] = obj => Object.prototype.toString.call(obj) === `[object ${name}]`;
});


module.exports = svc;
