'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var opn = _interopDefault(require('open'));
var os = _interopDefault(require('os'));
var spotify = _interopDefault(require('spotify-node-applescript'));
var dbus = _interopDefault(require('dbus-next'));
var lodash = require('lodash');

var SpotifyDarwin =
/*#__PURE__*/
function () {
  function SpotifyDarwin() {
    this.supportedActions = ['togglePlayPause', 'previousTrack', 'nextTrack'];
  }

  var _proto = SpotifyDarwin.prototype;

  _proto.isRunning = function isRunning() {
    return new Promise(function (resolve, reject) {
      spotify.isRunning(function (err, isRunning) {
        if (err) {
          reject(err);
        } else {
          resolve(isRunning);
        }
      });
    });
  };

  _proto.getState = function getState() {
    return new Promise(function (resolve, reject) {
      spotify.getState(function (err, state) {
        if (err) {
          reject(err);
        } else {
          resolve({
            state: state.state
          });
        }
      });
    });
  };

  _proto.getTrack = function getTrack() {
    return new Promise(function (resolve, reject) {
      spotify.getTrack(function (err, track) {
        if (err) {
          reject(err);
        } else {
          resolve(track);
        }
      });
    });
  };

  _proto.togglePlayPause = function togglePlayPause() {
    try {
      var _this2 = this;

      return Promise.resolve(new Promise(function (resolve) {
        spotify.playPause(resolve);
      })).then(function () {
        return _this2.getState();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.previousTrack = function previousTrack() {
    try {
      var _this4 = this;

      return Promise.resolve(new Promise(function (resolve) {
        spotify.previous(resolve);
      })).then(function () {
        return _this4.getTrack();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.nextTrack = function nextTrack() {
    try {
      var _this6 = this;

      return Promise.resolve(new Promise(function (resolve) {
        spotify.next(resolve);
      })).then(function () {
        return _this6.getTrack();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return SpotifyDarwin;
}();

var SpotifyDefault =
/*#__PURE__*/
function () {
  function SpotifyDefault() {
    this.supportedActions = [];
    console.error('Unsupported OS');
  }

  var _proto = SpotifyDefault.prototype;

  _proto.isRunning = function isRunning() {
    return Promise.reject('Not implemented');
  };

  _proto.getState = function getState() {
    return Promise.reject('Not implemented');
  };

  _proto.getTrack = function getTrack() {
    return Promise.reject('Not implemented');
  };

  _proto.togglePlayPause = function togglePlayPause() {
    try {
      return Promise.reject('Not implemented');
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.previousTrack = function previousTrack() {
    try {
      return Promise.reject('Not implemented');
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.nextTrack = function nextTrack() {
    try {
      return Promise.reject('Not implemented');
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return SpotifyDefault;
}();

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

dbus.setBigIntCompat(true);

var SpotifyLinux =
/*#__PURE__*/
function () {
  function SpotifyLinux() {
    this.supportedActions = ['togglePlayPause', 'previousTrack', 'nextTrack'];

    this._getInterfaces();
  }

  var _proto = SpotifyLinux.prototype;

  _proto.isRunning = function isRunning() {
    var _this = this;

    return Promise.resolve(_catch(function () {
      return Promise.resolve(_this._getInterfaces()).then(function (_ref) {
        var player = _ref.player,
            properties = _ref.properties;
        return !!player && !!properties;
      });
    }, function () {
      return false;
    }));
  };

  _proto.getState = function getState() {
    try {
      var _this3 = this;

      return Promise.resolve(_this3._getInterfaces()).then(function (_ref2) {
        var properties = _ref2.properties;
        return Promise.resolve(properties.Get('org.mpris.MediaPlayer2.Player', 'PlaybackStatus')).then(function (state) {
          return {
            state: lodash.toLower(state.value)
          };
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getTrack = function getTrack() {
    try {
      var _this5 = this;

      return Promise.resolve(_this5._getInterfaces()).then(function (_ref3) {
        var properties = _ref3.properties;
        return Promise.resolve(properties.Get('org.mpris.MediaPlayer2.Player', 'Metadata')).then(function (metadata) {
          var trackMeta = lodash.reduce(metadata.value, function (dst, meta, k) {
            var key = lodash.last(lodash.split(k, ':'));

            if (key) {
              var value = meta.value;
              dst[key] = lodash.isArray(value) ? lodash.join(value, ' & ') : value;
            }

            return dst;
          }, {});
          trackMeta.name = trackMeta.title;
          return trackMeta;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.togglePlayPause = function togglePlayPause() {
    try {
      var _this7 = this;

      return Promise.resolve(_this7._getInterfaces()).then(function (_ref4) {
        var player = _ref4.player;
        return Promise.resolve(player.PlayPause()).then(function () {
          return _this7.getState();
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.previousTrack = function previousTrack() {
    try {
      var _this9 = this;

      return Promise.resolve(_this9._getInterfaces()).then(function (_ref5) {
        var player = _ref5.player;
        return Promise.resolve(player.Previous()).then(function () {
          return _this9.getTrack();
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.nextTrack = function nextTrack() {
    try {
      var _this11 = this;

      return Promise.resolve(_this11._getInterfaces()).then(function (_ref6) {
        var player = _ref6.player;
        return Promise.resolve(player.Next()).then(function () {
          return _this11.getTrack();
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  } // Internal methods
  ;

  _proto._getInterfaces = function _getInterfaces() {
    try {
      var _this13 = this;

      if (!_this13._player || !_this13._properties) {
        return Promise.resolve(dbus.sessionBus().getProxyObject('org.mpris.MediaPlayer2.spotify', '/org/mpris/MediaPlayer2').then(function (spotifyProxy) {
          _this13._player = spotifyProxy.getInterface('org.mpris.MediaPlayer2.Player');
          _this13._properties = spotifyProxy.getInterface('org.freedesktop.DBus.Properties');
          return {
            player: _this13._player,
            properties: _this13._properties
          };
        })["catch"](function (err) {
          throw err;
        }));
      }

      return Promise.resolve({
        player: _this13._player,
        properties: _this13._properties
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return SpotifyLinux;
}();

var SpotifyManager =
/*#__PURE__*/
function () {
  function SpotifyManager() {
    switch (os.platform()) {
      case 'darwin':
        this.spotifySrv = new SpotifyDarwin();
        break;

      case 'linux':
        this.spotifySrv = new SpotifyLinux();
        break;

      default:
        this.spotifySrv = new SpotifyDefault();
    }
  }

  var _proto = SpotifyManager.prototype;

  _proto.launchSpotify = function launchSpotify() {
    return opn('spotify://', {
      url: true
    });
  };

  _proto.supportedActions = function supportedActions() {
    return this.spotifySrv.supportedActions;
  };

  _proto.isRunning = function isRunning() {
    return this.spotifySrv.isRunning();
  };

  _proto.getState = function getState() {
    return this.spotifySrv.getState();
  };

  _proto.togglePlayPause = function togglePlayPause() {
    return this.spotifySrv.togglePlayPause();
  };

  _proto.previousTrack = function previousTrack() {
    return this.spotifySrv.previousTrack();
  };

  _proto.nextTrack = function nextTrack() {
    return this.spotifySrv.nextTrack();
  };

  _proto.getTrack = function getTrack() {
    return this.spotifySrv.getTrack();
  };

  return SpotifyManager;
}();

exports.SpotifyManager = SpotifyManager;
//# sourceMappingURL=spotify-js.cjs.development.js.map
