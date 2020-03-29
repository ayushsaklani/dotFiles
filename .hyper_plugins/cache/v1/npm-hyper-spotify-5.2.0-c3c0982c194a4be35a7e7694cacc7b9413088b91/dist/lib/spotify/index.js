"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "SpotifyDarwin", {
  enumerable: true,
  get: function () {
    return _spotifyDarwin["default"];
  }
});

_Object$defineProperty(exports, "SpotifyDefault", {
  enumerable: true,
  get: function () {
    return _spotifyDefault["default"];
  }
});

_Object$defineProperty(exports, "SpotifyLinux", {
  enumerable: true,
  get: function () {
    return _spotifyLinux["default"];
  }
});

var _spotifyDarwin = _interopRequireDefault(require("./spotifyDarwin"));

var _spotifyDefault = _interopRequireDefault(require("./spotifyDefault"));

var _spotifyLinux = _interopRequireDefault(require("./spotifyLinux"));