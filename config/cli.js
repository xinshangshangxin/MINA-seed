const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));
const path = require('path');
const yargs = require('yargs');
const { getAppName, isRegExp, isNumber, spawnDefer } = require('./utilities');
const { pageJsData } = require('./data');

let argv = yargs
  .option('a', {
    alias: 'add',
    describe: 'add a new page',
    type: 'string',
  })
  .option('t', {
    alias: 'title',
    describe: 'add pageName.json with navigationBarTitleText when add new page',
    default: '__title__',
    type: 'string',
  })
  .option('noTitle', {
    describe: 'do not add pageName.json when add new page',
    type: 'boolean',
  })
  .option('noTop', {
    alias: 'bottom',
    describe: 'add pageName to app.json at bottom not top when add new page',
    type: 'boolean',
  })
  .option('e', {
    alias: 'eslintFix',
    describe: 'gulp eslintFix',
    type: 'boolean',
  })
  .help('help')
  .argv;

const gulpfilePath = path.join(__dirname, '../gulpfile.js');
const eslintFixCmd = {
  cmd: 'gulp',
  arg: ['--gulpfile', gulpfilePath, 'eslintFix'],
};

const args = argv._;

if (argv.add || argv.a || checkArgs(2, 'add', args[1])) {
  addPage(argv.a || args[1]);
}
else if (argv.eslintFix || argv.e || checkArgs(1, 'eslintFix')) {
  spawnDefer(eslintFixCmd);
}
else {
  yargs.showHelp();
}


function getPagePath(name) {
  const directoryPath = path.join(__dirname, `../pages/${name}`);
  const wxmlPath = path.join(__dirname, `../pages/${name}/${name}.wxml`);
  const jsPath = path.join(__dirname, `../pages/${name}/${name}.js`);
  const jsonPath = path.join(__dirname, `../pages/${name}/${name}.json`);
  const scssPath = path.join(__dirname, `../scss/${name}.scss`);
  const pagePath = `pages/${name}/${name}`;

  return {
    directoryPath,
    wxmlPath,
    jsPath,
    jsonPath,
    scssPath,
    pagePath,
  };
}

function checkNotExists(filePath) {
  return fs.accessAsync(filePath)
    .then(() =>
        Promise.reject(new Error(`${filePath} exists`))
      , () => true);
}

function addPageToAppJson(directoryPath, top) {
  const appJsonPath = path.resolve(__dirname, '../app.json');
  fs.readJsonAsync(appJsonPath)
    .then((obj) => {
      obj.pages = obj.pages || [];

      if (top) {
        obj.pages.unshift(directoryPath);
      }
      else {
        obj.pages.push(directoryPath);
      }
      return fs.writeJsonAsync(appJsonPath, obj);
    });
}

function addPageJson(jsonPath, title) {
  if (title === true) {
    return Promise.resolve();
  }

  return Promise
    .try(() => {
      if (title === '__title__') {
        return getAppName();
      }
      return title;
    })
    .then(t =>
      fs.ensureFileAsync(jsonPath)
        .then(() =>
          fs.writeJsonAsync(jsonPath, {
            navigationBarTitleText: t,
          })
        )
    );
}

function addPageJs(jsPath) {
  return fs.ensureFileAsync(jsPath)
    .then(() => fs.writeFileAsync(jsPath, pageJsData));
}

function createFileIfNotExists(name, title, pageIsTop) {
  const { directoryPath, wxmlPath, jsPath, pagePath, scssPath, jsonPath } = getPagePath(name);

  return Promise
    .props({
      directory: checkNotExists(directoryPath),
      scss: checkNotExists(scssPath),
    })
    .then(() =>
      Promise.props({
        wxml: fs.ensureFileAsync(wxmlPath),
        js: addPageJs(jsPath),
        json: addPageJson(jsonPath, title),
        scss: fs.ensureFileAsync(scssPath),
        addPageToAppJson: addPageToAppJson(pagePath, pageIsTop),
      })
    );
}

function addPage(name) {
  // true为不添加, __title__ 为添加 app.json中定义的内容(默认), 其它为用户自定义
  let title = argv.noTitle || argv.t || argv.title;
  let pageIsTop = !argv.noTop;
  return createFileIfNotExists(name, title, pageIsTop)
    .then(() => {
      console.info('create success');
    })
    .catch(e => console.warn(e));
}

function checkArgs(len, firstStr, returnValue = true) {
  if (args.length !== len) {
    return false;
  }

  if (isNumber(returnValue)) {
    returnValue = args[returnValue];
  }

  if (isRegExp(firstStr) && firstStr.test(args[1])) {
    return returnValue;
  }
  else if (firstStr === args[0]) {
    return returnValue;
  }

  return false;
}
