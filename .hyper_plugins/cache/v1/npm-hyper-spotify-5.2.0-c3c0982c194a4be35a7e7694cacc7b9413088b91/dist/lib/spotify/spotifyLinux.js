"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _dbusNative = _interopRequireDefault(require("dbus-native"));

var _lodash = require("lodash");

class SpotifyLinux {
  constructor() {
    this.sessionBus = _dbusNative["default"].sessionBus();
    this.spotifyService = this.sessionBus.getService('org.mpris.MediaPlayer2.spotify');
  }

  supportedActions() {
    return ['togglePlayPause', 'previousTrack', 'nextTrack'];
  }

  isRunning() {
    return this._getSpotifyInterface().then(() => _promise["default"].resolve(true))["catch"](() => _promise["default"].resolve(false));
  }

  getState() {
    return this._getSpotifyInterface().then(spotify => this._getPlaybackStatus(spotify)).then(status => _promise["default"].resolve({
      state: (0, _lodash.toLower)(status)
    }));
  }

  getTrack() {
    return this._getSpotifyInterface().then(spotify => this._getMetadata(spotify));
  }

  togglePlayPause() {
    return this._getSpotifyInterface().then(spotify => this._playPause(spotify)).then(spotify => this._getPlaybackStatus(spotify)).then(status => _promise["default"].resolve({
      state: (0, _lodash.toLower)(status)
    }));
  }

  previousTrack() {
    return this._getSpotifyInterface().then(spotify => this._previous(spotify)).then(spotify => this._getMetadata(spotify));
  }

  nextTrack() {
    return this._getSpotifyInterface().then(spotify => this._next(spotify)).then(spotify => this._getMetadata(spotify));
  } // Internal methods


  _getSpotifyInterface() {
    return new _promise["default"]((resolve, reject) => {
      this.spotifyService.getInterface('/org/mpris/MediaPlayer2', 'org.mpris.MediaPlayer2.Player', function (err, spotify) {
        if (err) {
          reject(err);
        } else {
          resolve(spotify);
        }
      });
    });
  }

  _getPlaybackStatus(spotifyInterface) {
    return new _promise["default"](function (resolve, reject) {
      spotifyInterface.PlaybackStatus(function (err, status) {
        if (err) {
          reject(err);
        } else {
          resolve(status);
        }
      });
    });
  }

  _getMetadata(spotifyInterface) {
    return new _promise["default"](function (resolve, reject) {
      spotifyInterface.Metadata(function (err, metadata) {
        if (err) {
          reject(err);
        } else {
          const m = (0, _lodash.reduce)(metadata, (dst, m) => {
            const [k, v] = m;
            const [, values] = v;
            const key = (0, _lodash.split)(k, ':')[1];
            const val = values[0];
            dst[key] = (0, _isArray["default"])(val) ? (0, _lodash.join)(val, ' & ') : val;
            return dst;
          }, {});
          m.name = m.title;
          resolve(m);
        }
      });
    });
  }

  _playPause(spotifyInterface) {
    return new _promise["default"](function (resolve, reject) {
      try {
        spotifyInterface.PlayPause(function () {
          setTimeout(() => resolve(spotifyInterface), 500);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  _next(spotifyInterface) {
    return new _promise["default"](function (resolve, reject) {
      try {
        spotifyInterface.Next(function () {
          setTimeout(() => resolve(spotifyInterface), 500);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  _previous(spotifyInterface) {
    return new _promise["default"](function (resolve, reject) {
      try {
        spotifyInterface.Previous(function () {
          setTimeout(() => resolve(spotifyInterface), 500);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

}

var _default = SpotifyLinux;
exports["default"] = _default;