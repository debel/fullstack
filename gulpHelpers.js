const fs = require('fs'),
  tap = require('gulp-tap'),
  commonData = JSON.parse(fs.readFileSync('./common_data.json').toString()),
  headerTemplate = fs.readFileSync('./templates/header-template.html'),
  footerTemplate = fs.readFileSync('./templates/footer-template.html');

const clone = data => JSON.parse(JSON.stringify(data)),
  _trimPath = path => path.substr(path.lastIndexOf('src') + 4),
  _trimTitle = path => {
    const linuxDelimiter = path.lastIndexOf('/');
    const windowsDelimiter = path.lastIndexOf('\\');
    return path.substr(0, linuxDelimiter > 0 ? linuxDelimiter : windowsDelimiter).trim();
  };

const _template = (view, data) => {
  return Object.keys(data).reduce(
    (result, key) => {
      const searchKey = new RegExp(`{{${key}}}`, 'g'),
        substituteValue = data[key];
      result = result.replace(searchKey, substituteValue);
      return result;
    },
    view
  );
}

const extractModuleNames = modules => tap(file => {
  const title = _trimTitle(_trimPath(file.path));
  modules.push(title);
});

const listModules = modules => `<ul id="all_modules">${(modules.reduce((acc, module) => acc += `<li><a href='/${module}'>${module}</a></li>`, ''))}</ul>`;

const mapModules = (modules, obj) => {
  obj = obj || Object.create(null);
  obj['all_modules'] = listModules(modules);

  return modules.reduce(
    (result, module) => {
      result[module] = `<a href='/${module}'>${module}</a>`;
      return result;
    },
    obj);
};

const wrapModule = (modules, headerAddon, footerAddon) => tap(file => {
  headerAddon = headerAddon || '';
  footerAddon = footerAddon || '';

  const data = mapModules(modules, clone(commonData)),
    header = headerTemplate + headerAddon,
    footer = footerAddon + footerTemplate;

  data['title'] = _trimTitle(_trimPath(file.path));
  file.contents = Buffer.concat(
    [
      new Buffer(_template(header.toString(), data)),
      new Buffer(_template(file.contents.toString(), data)),
      new Buffer(_template(footer.toString(), data))
    ]);
});

module.exports = {
  extractModuleNames: extractModuleNames,
  wrapModule: wrapModule,
  commonData: commonData
};
