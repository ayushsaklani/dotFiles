"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = depcheck;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _check = _interopRequireDefault(require("./check"));

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function isIgnored(ignoreMatches, dependency) {
  const match = _lodash.default.partial(_minimatch.default, dependency);

  return ignoreMatches.some(match);
}

function hasBin(rootDir, dependency) {
  try {
    const metadata = (0, _utils.readJSON)(_path.default.join(rootDir, 'node_modules', dependency, 'package.json'));
    return {}.hasOwnProperty.call(metadata, 'bin');
  } catch (error) {
    return false;
  }
}

function filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, dependencies) {
  return (0, _lodash.default)(dependencies).keys().reject(dep => isIgnored(ignoreMatches, dep) || ignoreBinPackage && hasBin(rootDir, dep)).value();
}

function depcheck(rootDir, options, callback) {
  const getOption = key => _lodash.default.isUndefined(options[key]) ? _constants.defaultOptions[key] : options[key];

  const withoutDev = getOption('withoutDev');
  const ignoreBinPackage = getOption('ignoreBinPackage');
  const ignoreMatches = getOption('ignoreMatches');

  const ignoreDirs = _lodash.default.union(_constants.defaultOptions.ignoreDirs, options.ignoreDirs);

  const skipMissing = getOption('skipMissing');
  const detectors = getOption('detectors');
  const parsers = (0, _lodash.default)(getOption('parsers')).mapValues(value => _lodash.default.isArray(value) ? value : [value]).merge({
    '*': getOption('specials')
  }).value();
  const metadata = options.package || (0, _utils.readJSON)(_path.default.join(rootDir, 'package.json'));
  const dependencies = metadata.dependencies || {};
  const devDependencies = !withoutDev && metadata.devDependencies ? metadata.devDependencies : {};
  const peerDeps = Object.keys(metadata.peerDependencies || {});
  const optionalDeps = Object.keys(metadata.optionalDependencies || {});
  const deps = filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, dependencies);
  const devDeps = filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, devDependencies);
  return (0, _check.default)({
    rootDir,
    ignoreDirs,
    skipMissing,
    deps,
    devDeps,
    peerDeps,
    optionalDeps,
    parsers,
    detectors
  }).then(results => _extends(results, {
    missing: _lodash.default.pick(results.missing, filterDependencies(rootDir, ignoreBinPackage, ignoreMatches, results.missing))
  })).then(callback);
}

depcheck.parser = _constants.availableParsers;
depcheck.detector = _constants.availableDetectors;
depcheck.special = _constants.availableSpecials;
module.exports = exports.default;