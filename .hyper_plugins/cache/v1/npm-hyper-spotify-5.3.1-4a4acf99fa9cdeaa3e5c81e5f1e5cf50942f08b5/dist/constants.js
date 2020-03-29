"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.defaultKeymaps = exports.RPCEvents = void 0;
const pluginName = 'hyper-spotify';
const RPCEvents = {
  nextSong: `${pluginName}:next`,
  prevSong: `${pluginName}:prev`,
  togglePlayPause: `${pluginName}:togglePlay`
};
exports.RPCEvents = RPCEvents;
const defaultKeymaps = {
  [RPCEvents.togglePlayPause]: 'CmdOrCtrl+Shift+Space',
  [RPCEvents.prevSong]: 'CmdOrCtrl+Shift+P',
  [RPCEvents.nextSong]: 'CmdOrCtrl+Shift+N'
};
exports.defaultKeymaps = defaultKeymaps;