"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

class SpotifyDefault {
  constructor() {
    console.error('[hyper-spotify] Unsupported OS');
  }

  supportedActions() {
    return [];
  }

  isRunning() {
    _promise["default"].resolve(false);
  }

}

var _default = SpotifyDefault;
exports["default"] = _default;