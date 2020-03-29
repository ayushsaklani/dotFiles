"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _os = _interopRequireDefault(require("os"));

var _opn = _interopRequireDefault(require("opn"));

var _spotify = require("./spotify");

class SpotifyManager {
  constructor() {
    switch (_os["default"].platform()) {
      case 'darwin':
        this.spotifyService = new _spotify.SpotifyDarwin();
        break;

      case 'linux':
        this.spotifyService = new _spotify.SpotifyLinux();
        break;

      default:
        this.spotifyService = new _spotify.SpotifyDefault();
    }
  }

  launchSpotify() {
    return (0, _opn["default"])('spotify://');
  }

  supportedActions() {
    return this.spotifyService.supportedActions();
  }

  isRunning() {
    return this.spotifyService.isRunning();
  }

  getState() {
    return this.spotifyService.getState();
  }

  togglePlayPause() {
    return this.spotifyService.togglePlayPause();
  }

  previousTrack() {
    return this.spotifyService.previousTrack();
  }

  nextTrack() {
    return this.spotifyService.nextTrack();
  }

  getTrack() {
    return this.spotifyService.getTrack();
  }

}

var _default = SpotifyManager;
exports["default"] = _default;