const Promise = require('bluebird');
const chalk = require('chalk');
const notifier = require('node-notifier');
const spawn = require('child_process').spawn;
const path = require('path');
const fs = Promise.promisifyAll(require('fs-extra'));

const svc = {
  appName: undefined,
  eshintReporter(result) {
    let isNotify = false;
    if (result.messages.length) {
      result.messages.forEach((item) => {
        let location = `${result.filePath.replace(/.*?\/(?=wxMall\/)/, '')}:${item.line}:${item.column}`;
        let ruleId = `${item.ruleId}`;
        let message = `${item.message}`;

        if (item.severity === 1) {
          console.log(`${chalk.yellow(location)}\n${chalk.blue(ruleId)} ${chalk.gray(message)}\n`);
        }
        else {
          console.log(`${chalk.red(location)}\n${chalk.blue(ruleId)} ${chalk.gray(message)}\n`);
        }

        if (!isNotify) {
          isNotify = true;
          notifier.notify({
            title: `${message}    ${svc.formatDate('hh:mm:ss')}`,
            subtitle: ruleId,
            message: location,
          });
        }
      });
    }
  },
  formatDate(fmt, date = new Date()) {
    let o = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S+': date.getMilliseconds(), // 毫秒
    };

    Object.keys(o).forEach((key) => {
      if (new RegExp(`(${key})`).test(fmt)) {
        // eslint-disable-next-line no-param-reassign
        fmt = fmt.replace(RegExp.$1, (`00${o[key]}`).substr(-RegExp.$1.length));
      }
    });

    return fmt;
  },
  defer() {
    let resolve;
    let reject;
    let promise = new Promise((...args) => {
      resolve = args[0];
      reject = args[1];
    });
    return {
      resolve,
      reject,
      promise,
    };
  },
  spawnDefer(option) {
    let deferred = svc.defer();
    if (!option) {
      return deferred.reject(new Error('no option'));
    }

    if (option.platform) {
      option.cmd = (process.platform === 'win32' ? (`${option.cmd}.cmd`) : option.cmd);
    }
    let opt = {
      stdio: 'inherit',
    };
    // set ENV
    let env = Object.create(process.env);
    env.NODE_ENV = option.NODE_ENV || process.env.NODE_ENV;
    opt.env = env;

    let proc = spawn(option.cmd, option.arg, opt);
    deferred.promise.proc = proc;
    proc.on('error', (err) => {
      console.log(err);
    });
    proc.on('exit', (code) => {
      if (code !== 0) {
        return deferred.reject(code);
      }
      return deferred.resolve();
    });
    return deferred.promise;
  },
  getAppName() {
    if (svc.appName) {
      return Promise.resolve(svc.appName);
    }

    const appJsonPath = path.resolve(__dirname, '../app.json');
    return fs.readJsonAsync(appJsonPath)
      .then((obj) => {
        svc.appName = obj && obj.window && obj.window.navigationBarTitleText || 'MINA';
        return svc.appName;
      });
  },
};

['Arguments', 'Array', 'Date', 'Error', 'Function', 'Number', 'Object', 'RegExp', 'String'].forEach((name) => {
  svc[`is${name}`] = obj => Object.prototype.toString.call(obj) === `[object ${name}]`;
});

module.exports = svc;
