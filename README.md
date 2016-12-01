# MINA seed

## what is MINA-seed

- a Wechat Mini-app seed, use gulp, eslint and others
- inject bluebird, promisify wx interface, change vConsole e.g.
- use gulp to build sass and eslint check js

## Documentation

### npm run
- use `npm run add some-page-name` to add new page, it will add `./pages/${some-page-name}/${some-page-name}.js`, `./pages/${some-page-name}/${some-page-name}.wxml`, `./pages/${some-page-name}/${some-page-name}.json` and `./scss/${some-page-name}.scss`.
- `npm run add some-page-name -- -t --noTop --noTitle`
  - use`-t someTitle` will change   `navigationBarTitleText` value to `someTitle` in `./pages/${some-page-name}/${some-page-name}.json`, otherwise,  it will use `navigationBarTitleText` in `app.json`
  - use `--noTitle` will not add `./pages/${some-page-name}/${some-page-name}.json`
  - use `--noTop` or `--bottom` will add new page path into `app.json` `pages` at bottom, otherwise at top 
  
- `npm run cli -- -e` equal `gulp eslintFix`
- `npm run cli` echo help
- `npm start` equal `gulp default`. include `'clean', 'npmModules', 'lint', 'sass', 'watchLint', 'watchSass'`

### gulp 
- change  `./config/gulp/config.js` to change gulp task config.
- chang `./config/gulp/filterConfig.js` let npm modules adjust MINA, `bluebird` and `lodash` are  built-in
- `./scss/${some-page-name}.scss` will auto create `wxss` when use `gulp`

### utils/\*\*/\*.js
- inject.js
  demo at `app.js:27`
   ```js
  inject.init({
    debugLog: true,   
    bluebird: true,  
    wxPromise: true,
    requestLoading: true,
    lodash: true,
  });
   ```
- util.js
  - `formatDate(fmt, date)` // simple format date
  - `bindNavigate(obj)` // page navigate, demo at `pages/index/index.js:10` 


## LICENSE
**MIT**


## 微信小程序起步

## 什么是 MINA-seed

- 一个使用了 `gulp` `eslint` 和 其它工具的 微信小程序起步工程
- 注入了 bluebird, promisify了wx.xxx接口, 修改了 vConsole时不输出function和error
- 使用gulp 构建 sass, eslint检查 js规范

## 文档

### npm run
- 使用 `npm run add some-page-name` 来添加一个新的页面, 这会创建 `./pages/${some-page-name}/${some-page-name}.js` 和 `./pages/${some-page-name}/${some-page-name}.wxml` 和 `./pages/${some-page-name}/${some-page-name}.json` 和 `./scss/${some-page-name}.scss`文件.
- `npm run add some-page-name -- -t --noTop --noTitle`
  - 使用`-t someTitle`将会修改 `./pages/${some-page-name}/${some-page-name}.json` 中 `navigationBarTitleText`的值为 `someTitle`, 不使用则为 `app.json` 中的 `navigationBarTitleText`
  - 使用 `--noTitle` 将不会创建文件 `./pages/${some-page-name}/${some-page-name}.json`
  - 使用 `--noTop` 或者 `--bottom` 将新建的页面 插入至 `app.json`中 pages数组的最末尾, 否则为最前面
  
- `npm run cli -- -e` 将会执行 `gulp eslintFix`
- `npm run cli` 将会输出可选参数
- `npm start` 将会执行 `gulp default`. 包含 `'clean', 'npmModules', 'lint', 'sass', 'watchLint', 'watchSass'`

### gulp 
- 修改  `./config/gulp/config.js` 来修改 gulp 任务, 比如修改 `npmModules` 来修改注入哪些库
- 修改 `./config/gulp/filterConfig.js` 来使安装的包可以运行在微信小程序中, 其中内置了 `bluebird` 和 `lodash` 的修改
- `./scss/${some-page-name}.scss` 会动态生成 `wxss`

### utils/\*\*/\*.js
- inject.js
  在 `app.js:27`中使用, 用于注入某些方法
   ```js
  inject.init({
    debugLog: true,   // 使得微信vConsole显示error 和 function
    bluebird: true,   // 注入bluebird
    wxPromise: true, // wx 接口Promise化
    requestLoading: true, // 请求时显示loading框
    lodash: true,   // 注入lodash
  });
   ```
- util.js
  - formatDate(fmt, date) // 简易时间格式化
  - bindNavigate() // 页面跳转, 可以查看demo: `pages/index/index.js:10` 



## LICENSE
**MIT**