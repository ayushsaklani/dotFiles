"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseBinary;

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const metadataCache = {};

function getCacheOrRequire(packagePath) {
  if (metadataCache[packagePath]) {
    return metadataCache[packagePath];
  }

  const metadata = (0, _utils.readJSON)(packagePath);
  metadataCache[packagePath] = metadata;
  return metadata;
}

function loadMetadata(dep, dir) {
  try {
    const packagePath = _path.default.resolve(dir, 'node_modules', dep, 'package.json');

    return getCacheOrRequire(packagePath);
  } catch (error) {
    return {}; // ignore silently
  }
}

function getBinaryFeatures(dep, [key, value]) {
  const binPath = _path.default.join('node_modules', dep, value).replace(/\\/g, '/');

  const features = [key, `--require ${key}`, `--require ${key}/register`, `$(npm bin)/${key}`, `node_modules/.bin/${key}`, `./node_modules/.bin/${key}`, binPath, `./${binPath}`];
  return features;
}

function getBinaries(dep, dir) {
  const metadata = loadMetadata(dep, dir);

  if (typeof metadata.bin === 'string') {
    return [[dep, metadata.bin]];
  }

  return _lodash.default.toPairs(metadata.bin || {});
}

function isBinaryInUse(dep, scripts, dir) {
  const binaries = getBinaries(dep, dir);
  return binaries.some(bin => getBinaryFeatures(dep, bin).some(feature => scripts.some(script => _lodash.default.includes(` ${script} `, ` ${feature} `))));
}

function parseBinary(content, filepath, deps, dir) {
  const scripts = (0, _utils.getScripts)(filepath, content);
  return deps.filter(dep => isBinaryInUse(dep, scripts, dir));
}

module.exports = exports.default;