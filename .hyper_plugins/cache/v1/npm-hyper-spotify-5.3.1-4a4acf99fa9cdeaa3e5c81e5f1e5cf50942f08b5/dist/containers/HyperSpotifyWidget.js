"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _spotifyJs = require("@panz3r/spotify-js");

var _lodash = require("lodash");

var _Icon = _interopRequireDefault(require("../components/Icon"));

var _PlayerControls = _interopRequireDefault(require("../components/PlayerControls"));

var _TrackInfo = _interopRequireDefault(require("../components/TrackInfo"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys["default"])(object); if (_getOwnPropertySymbols["default"]) { var symbols = (0, _getOwnPropertySymbols["default"])(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor["default"])(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3["default"])(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors["default"]) { (0, _defineProperties["default"])(target, (0, _getOwnPropertyDescriptors["default"])(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2["default"])(target, key, (0, _getOwnPropertyDescriptor["default"])(source, key)); }); } } return target; }

const getWidgetStyle = controlsPosition => {
  switch (controlsPosition) {
    case 'left':
      return _objectSpread({}, styles.widgetStyle, {}, styles.leftControlsWidgetStyle);

    case 'right':
      return _objectSpread({}, styles.widgetStyle, {}, styles.rightControlsWidgetStyle);

    default:
      return _objectSpread({}, styles.widgetStyle);
  }
};

const HyperSpotifyWidgetFactory = React => {
  var _temp;

  const Icon = (0, _Icon["default"])(React); // eslint-disable-line no-unused-vars

  const PlayerControls = (0, _PlayerControls["default"])(React); // eslint-disable-line no-unused-vars

  const TrackInfo = (0, _TrackInfo["default"])(React); // eslint-disable-line no-unused-vars

  const skipActions = {
    previous: 'PREV',
    next: 'NEXT'
  };
  const initialState = {
    isPlaying: false,
    isRunning: false,
    track: {
      artist: '',
      name: ''
    }
  };
  return _temp = class HyperSpotifyWidget extends React.Component {
    constructor(props) {
      super(props);
      (0, _defineProperty3["default"])(this, "togglePlayState", () => {
        const {
          isRunning
        } = this.state;

        if (isRunning) {
          this.spotifyManager.togglePlayPause().then(spotifyState => {
            this.setState({
              isPlaying: spotifyState.state === 'playing'
            });
          })["catch"](() => {
            this.setState(_objectSpread({}, initialState));
          });
        }
      });
      (0, _defineProperty3["default"])(this, "skipTo", skipAction => {
        const {
          isRunning
        } = this.state;

        if (isRunning) {
          this._getSkipPromise(skipAction).then(track => {
            // console.log('newTrack', track)
            this.setState({
              track
            });
          })["catch"](() => {
            this.setState(_objectSpread({}, initialState));
          });
        }
      });
      (0, _defineProperty3["default"])(this, "skipToNext", () => this.skipTo(skipActions.next));
      (0, _defineProperty3["default"])(this, "skipToPrevious", () => this.skipTo(skipActions.previous));
      (0, _defineProperty3["default"])(this, "_launchSpotify", () => this.spotifyManager.launchSpotify());
      this.state = _objectSpread({}, initialState);
      this.spotifyManager = new _spotifyJs.SpotifyManager();
      this.supportedSpotifyActions = this.spotifyManager.supportedActions();
    }

    componentDidMount() {
      // console.log('HyperSpotifyWidget didMount')
      if (!this.soundCheck) {
        this.soundCheck = setInterval(() => this.performSoundCheck(), 5000);
      }

      this.performSoundCheck(); // Attach shortcut handlers

      window.rpc.on(_constants.RPCEvents.togglePlayPause, this.togglePlayState);
      window.rpc.on(_constants.RPCEvents.prevSong, this.skipToPrevious);
      window.rpc.on(_constants.RPCEvents.nextSong, this.skipToNext);
    }

    componentWillUnmount() {
      // console.log('HyperSpotifyWidget willUnmount')
      if (this.soundCheck) {
        clearInterval(this.soundCheck);
      } // Remove shortcut handlers


      window.rpc.removeListener(_constants.RPCEvents.togglePlayPause, this.togglePlayState);
      window.rpc.removeListener(_constants.RPCEvents.prevSong, this.skipToPrevious);
      window.rpc.removeListener(_constants.RPCEvents.nextSong, this.skipToNext);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !(0, _lodash.isEqual)(nextState, this.state);
    }

    performSoundCheck() {
      // console.log('SoundCheck...', new Date(), 'at', this)
      // _reactInternalInstance (Hyper 1.x) || _reactInternalFiber (Hyper 2.x)
      if (!this._reactInternalInstance && !this._reactInternalFiber) {
        // Kill this interval since its container does not exists anymore
        if (this.soundCheck) {
          clearInterval(this.soundCheck);
        }

        return;
      }

      this.spotifyManager.isRunning().then(isRunning => {
        this.setState({
          isRunning
        });

        if (isRunning) {
          // Get Play/Pause state
          this.spotifyManager.getState().then(({
            state
          }) => {
            this.setState({
              isPlaying: state === 'playing'
            }); // Get Track details

            return this.spotifyManager.getTrack();
          }).then(track => {
            // console.log('currentTrack', track)
            this.setState({
              track
            });
          })["catch"](() => {
            this.setState(_objectSpread({}, initialState));
          });
        } else {
          this.setState(_objectSpread({}, initialState));
        }
      })["catch"](() => {
        this.setState(_objectSpread({}, initialState));
      });
    }

    _getSkipPromise(skipAction) {
      const {
        previous,
        next
      } = skipActions;

      switch (skipAction) {
        case previous:
          return this.spotifyManager.previousTrack();

        case next:
          return this.spotifyManager.nextTrack();
      }
    }

    renderSpacer(controlsPosition) {
      if (controlsPosition !== 'center') {
        return React.createElement("div", {
          style: styles.spacer
        });
      }

      return null;
    }

    render() {
      const {
        pluginConfig
      } = this.props;
      const {
        isPlaying,
        isRunning,
        track
      } = this.state;
      const {
        controlsPosition
      } = pluginConfig;

      if (!isRunning) {
        return React.createElement("div", {
          style: styles.widgetStyle
        }, React.createElement(Icon, {
          iconName: "spotify",
          onClick: this._launchSpotify,
          style: styles.iconStyle
        }));
      }

      return React.createElement("div", {
        style: getWidgetStyle(controlsPosition)
      }, React.createElement(PlayerControls, {
        isPlaying: isPlaying,
        onNext: this.skipToNext,
        onPrevious: this.skipToPrevious,
        onTogglePlayState: this.togglePlayState,
        supportedActions: this.supportedSpotifyActions
      }), React.createElement(TrackInfo, {
        track: track
      }), this.renderSpacer(controlsPosition));
    }

  }, _temp;
};

const styles = {
  widgetStyle: {
    width: '100%',
    height: 30,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftControlsWidgetStyle: {
    justifyContent: 'space-between'
  },
  rightControlsWidgetStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  controlsContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  iconStyle: {
    height: 16,
    width: 18
  },
  playIconStyle: {
    marginLeft: 6,
    marginRight: 6
  },
  spacer: {
    width: 86
  }
};
var _default = HyperSpotifyWidgetFactory;
exports["default"] = _default;