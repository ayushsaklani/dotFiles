"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _spotifyNodeApplescript = _interopRequireDefault(require("spotify-node-applescript"));

class SpotifyDarwin {
  supportedActions() {
    return ['togglePlayPause', 'previousTrack', 'nextTrack'];
  }

  isRunning() {
    return new _promise["default"]((resolve, reject) => {
      _spotifyNodeApplescript["default"].isRunning((err, isRunning) => {
        if (err) {
          reject(err);
        } else {
          resolve(isRunning);
        }
      });
    });
  }

  getState() {
    return new _promise["default"]((resolve, reject) => {
      _spotifyNodeApplescript["default"].getState((err, state) => {
        if (err) {
          reject(err);
        } else {
          resolve(state);
        }
      });
    });
  }

  getTrack() {
    return new _promise["default"]((resolve, reject) => {
      _spotifyNodeApplescript["default"].getTrack((err, track) => {
        if (err) {
          reject(err);
        } else {
          resolve(track);
        }
      });
    });
  }

  togglePlayPause() {
    return new _promise["default"]((resolve, reject) => {
      _spotifyNodeApplescript["default"].playPause(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }).then(() => this.getState());
  }

  previousTrack() {
    return new _promise["default"]((resolve, reject) => {
      _spotifyNodeApplescript["default"].previous(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }).then(() => this.getTrack());
  }

  nextTrack() {
    return new _promise["default"]((resolve, reject) => {
      _spotifyNodeApplescript["default"].next(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }).then(() => this.getTrack());
  }

}

var _default = SpotifyDarwin;
exports["default"] = _default;