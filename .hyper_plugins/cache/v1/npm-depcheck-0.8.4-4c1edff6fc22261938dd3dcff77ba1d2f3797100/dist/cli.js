"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _yargs = _interopRequireDefault(require("yargs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _deprecate = _interopRequireDefault(require("deprecate"));

var _index = _interopRequireDefault(require("./index"));

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkPathExist(dir, errorMessage) {
  return new Promise((resolve, reject) => _fs.default.exists(dir, result => result ? resolve() : reject(errorMessage)));
}

function getParsers(parsers) {
  return _lodash.default.isUndefined(parsers) ? undefined : (0, _lodash.default)(parsers).split(',').map(keyValuePair => keyValuePair.split(':')).fromPairs().mapValues(value => value.split('&').map(name => _index.default.parser[name])).value();
}

function getDetectors(detectors) {
  return _lodash.default.isUndefined(detectors) ? undefined : detectors.split(',').map(name => _index.default.detector[name]);
}

function getSpecials(specials) {
  return _lodash.default.isUndefined(specials) ? undefined : specials.split(',').map(name => _index.default.special[name]);
}

function noIssue(result) {
  return _lodash.default.isEmpty(result.dependencies) && _lodash.default.isEmpty(result.devDependencies) && _lodash.default.isEmpty(result.missing);
}

function prettify(caption, deps) {
  const list = deps.map(dep => `* ${dep}`);
  return list.length ? [caption].concat(list) : [];
}

function print(result, log, json) {
  if (json) {
    log(JSON.stringify(result, (key, value) => _lodash.default.isError(value) ? value.stack : value));
  } else if (noIssue(result)) {
    log('No depcheck issue');
  } else {
    const deps = prettify('Unused dependencies', result.dependencies);
    const devDeps = prettify('Unused devDependencies', result.devDependencies);
    const missing = prettify('Missing dependencies', Object.keys(result.missing));
    const content = deps.concat(devDeps, missing).join('\n');
    log(content);
  }

  return result;
}

function checkDeprecation(argv) {
  if (argv.dev === false) {
    (0, _deprecate.default)('depcheck', 'The option `dev` is deprecated. It leads a wrong result for missing dependencies' + ' when it is `false`. This option will be removed and enforced to `true` in next' + ' major version.');
  }
}

function cli(args, log, error, exit) {
  const opt = (0, _yargs.default)(args).usage('Usage: $0 [DIRECTORY]').boolean(['dev', 'ignore-bin-package', 'skip-missing']).default({
    dev: true,
    'ignore-bin-package': false,
    'skip-missing': false
  }).describe('dev', '[DEPRECATED] Check on devDependecies').describe('ignore-bin-package', 'Ignore package with bin entry').describe('skip-missing', 'Skip calculation of missing dependencies').describe('json', 'Output results to JSON').describe('ignores', 'Comma separated package list to ignore').describe('ignore-dirs', 'Comma separated folder names to ignore').describe('parsers', 'Comma separated glob:parser pair list').describe('detectors', 'Comma separated detector list').describe('specials', 'Comma separated special parser list').version('version', 'Show version number', _package.version).help('help', 'Show this help message');
  checkDeprecation(opt.argv);
  const dir = opt.argv._[0] || '.';

  const rootDir = _path.default.resolve(dir);

  checkPathExist(rootDir, `Path ${dir} does not exist`).then(() => checkPathExist(_path.default.resolve(rootDir, 'package.json'), `Path ${dir} does not contain a package.json file`)).then(() => (0, _index.default)(rootDir, {
    withoutDev: !opt.argv.dev,
    ignoreBinPackage: opt.argv.ignoreBinPackage,
    ignoreMatches: (opt.argv.ignores || '').split(','),
    ignoreDirs: (opt.argv.ignoreDirs || '').split(','),
    parsers: getParsers(opt.argv.parsers),
    detectors: getDetectors(opt.argv.detectors),
    specials: getSpecials(opt.argv.specials),
    skipMissing: opt.argv.skipMissing
  })).then(result => print(result, log, opt.argv.json)).then(result => exit(opt.argv.json || noIssue(result) ? 0 : -1)).catch(errorMessage => {
    error(errorMessage);
    exit(-1);
  });
}

module.exports = exports.default;