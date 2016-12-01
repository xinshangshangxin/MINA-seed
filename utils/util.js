const redirectUrlList = [];
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
  joinParams(url, qs) {
    let temp = [];
    Object.keys(qs).forEach((key) => {
      if (!qs[key]) {
        qs[key] = '';
      }
      else if (!svc.isString(qs[key])) {
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
    else {
      temp = '';
    }

    return url + temp;
  },
  // eslint-disable-next-line max-len
  bindNavigate({ name, url, params = [], redirect = false, indexRedirect = false, filter = {} } = {}) {
    return function bindNavigate(e) {
      console.info(e);

      let navigateName = name || e.currentTarget.dataset.navigateName;
      let navigateUrl = url || `/pages/${navigateName}/${navigateName}`;

      let qs = {};
      params.forEach((paramName) => {
        let dataSetName = `navigate${paramName.substr(0, 1).toLocaleUpperCase()}${paramName.substr(1)}`;
        qs[paramName] = e.currentTarget.dataset[dataSetName];

        if (filter[paramName]) {
          if (svc.isFunction(filter[paramName])) {
            qs[paramName] = filter[paramName].bind(this)(qs[paramName]);
          }
          else {
            qs[paramName] = filter[paramName];
          }
        }
      });

      let fullUrl = svc.joinParams(navigateUrl, qs);
      console.info('navigateTo navigateUrl: ', navigateUrl, 'qs: ', qs, 'fullUrl: ', fullUrl);

      if (indexRedirect) {
        svc.indexRedirect(undefined, fullUrl);
      }

      if (redirect) {
        return wx.redirectToAsync({
          url: fullUrl,
        });
      }

      return wx.navigateToAsync({
        url: fullUrl,
      });
    };
  },
  indexRedirect(name, url) {
    if (!url) {
      url = `/pages/${name}/${name}`;
    }

    redirectUrlList.push(url);
    // 返回到首页
    return svc.Promise
      .try(() => wx.navigateBack({ delta: 100 }));
  },
  doIndexRedirect() {
    if (redirectUrlList && redirectUrlList.length) {
      let fullUrl = redirectUrlList.shift();
      redirectUrlList.length = 0;
      return wx.navigateToAsync({
        url: fullUrl,
      });
    }

    console.warn('no redirect page');
    return svc.Promise.reject(new Error('no redirect page'));
  },
};


function throttle(fn, delay = 150) {
  let timer = null;

  return function getThrottleFun(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

['Arguments', 'Array', 'Date', 'Error', 'Function', 'Number', 'Object', 'RegExp', 'String'].forEach((name) => {
  svc[`is${name}`] = obj => Object.prototype.toString.call(obj) === `[object ${name}]`;
});


module.exports = svc;
