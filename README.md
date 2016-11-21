# MINA seed

## what is MINA-seed

- a Wechat Mini-app seed, use gulp, eslint and others
- inject bluebird, promisify wx interface, change vConsole e.g.
- use gulp to build sass and eslint check js

## Documentation

- change `./config/gulp/config.js` to change your gulp task config, like inject which `npmModules` e.g.
- use `npm run add some-page-name` to add a new page, it will create `./pages/${some-page-name}/${some-page-name}.js` and `./pages/${some-page-name}/${some-page-name}.wxml` and `./scss/${some-page-name}.scss`
- use `sass` to replace `wxss`, it will auto inject into pages directory


## LICENSE
**MIT**


## 微信小程序起步

## 什么是 MINA-seed

- 一个使用了 `gulp` `eslint` 和 其它工具的 微信小程序起步工程
- 注入了 bluebird, promisify了wx.xxx接口, 修改了 vConsole时不输出function和error
- 使用gulp 构建 sass, eslint检查 js规范

## 文档
- 修改  `./config/gulp/config.js` 来修改 gulp 任务, 比如修改 `npmModules` 来修改注入哪些库
- 使用 `npm run add some-page-name` 来添加一个新的页面, 这会创建 `./pages/${some-page-name}/${some-page-name}.js` 和 `./pages/${some-page-name}/${some-page-name}.wxml` 和 `./scss/${some-page-name}.scss`文件.
-  使用 `./scss/${some-page-name}.scss` 动态生成 `wxss`

## LICENSE
**MIT**