"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _lodash = require("lodash");

var _SpotifyManager = _interopRequireDefault(require("../lib/SpotifyManager"));

var _Icon = _interopRequireDefault(require("../components/Icon"));

var _TrackInfo = _interopRequireDefault(require("../components/TrackInfo"));

const HyperSpotifyWidgetFactory = React => {
  const {
    Component
  } = React;
  const Icon = (0, _Icon["default"])(React); // eslint-disable-line no-unused-vars

  const TrackInfo = (0, _TrackInfo["default"])(React); // eslint-disable-line no-unused-vars

  const skipActions = {
    previous: 'PREV',
    next: 'NEXT'
  };
  const initialState = {
    isRunning: false,
    isPlaying: false,
    track: {
      name: '',
      artist: ''
    }
  };
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isRunning: false,
        isPlaying: false,
        track: {
          name: '',
          artist: ''
        }
      };
      this.spotifyManager = new _SpotifyManager["default"]();
    }

    performSoundCheck() {
      // console.log('SoundCheck...', new Date(), 'at', this)
      const {
        spotifyManager
      } = this; // _reactInternalInstance (Hyper 1.x) || _reactInternalFiber (Hyper 2.x)

      if (!this._reactInternalInstance && !this._reactInternalFiber) {
        // Kill this interval since its container does not exists anymore
        if (this.soundCheck) {
          clearInterval(this.soundCheck);
        }

        return;
      }

      spotifyManager.isRunning().then(isRunning => {
        this.setState({
          isRunning
        });

        if (isRunning) {
          // Get Play/Pause state
          spotifyManager.getState().then(({
            state
          }) => {
            this.setState({
              isPlaying: state === 'playing'
            }); // Get Track details

            return spotifyManager.getTrack();
          }).then(track => {
            // console.log('currentTrack', track)
            this.setState({
              track
            });
          })["catch"](() => {
            this.setState((0, _objectSpread2["default"])({}, initialState));
          });
        } else {
          this.setState((0, _objectSpread2["default"])({}, initialState));
        }
      })["catch"](() => {
        this.setState((0, _objectSpread2["default"])({}, initialState));
      });
    }

    togglePlayState() {
      const {
        spotifyManager,
        state: {
          isRunning
        }
      } = this;

      if (isRunning) {
        spotifyManager.togglePlayPause().then(spotifyState => {
          this.setState({
            isPlaying: spotifyState.state === 'playing'
          });
        })["catch"](() => {
          this.setState((0, _objectSpread2["default"])({}, initialState));
        });
      }
    }

    _getSkipPromise(skipAction) {
      const {
        spotifyManager
      } = this;
      const {
        previous,
        next
      } = skipActions;

      switch (skipAction) {
        case previous:
          return spotifyManager.previousTrack();

        case next:
          return spotifyManager.nextTrack();
      }
    }

    skipTo(skipAction) {
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
          this.setState((0, _objectSpread2["default"])({}, initialState));
        });
      }
    }

    _launchSpotify() {
      // console.log('Start Spotify')
      this.spotifyManager.launchSpotify();
    }

    componentDidMount() {
      // console.log('HyperSpotifyWidget didMount')
      if (!this.soundCheck) {
        this.soundCheck = setInterval(() => this.performSoundCheck(), 5000);
      }

      this.performSoundCheck();
    }

    componentWillUnmount() {
      // console.log('HyperSpotifyWidget willUnmount')
      if (this.soundCheck) {
        clearInterval(this.soundCheck);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !(0, _lodash.isEqual)(nextState, this.state);
    }

    renderControls() {
      const {
        previous,
        next
      } = skipActions;
      const {
        controlsContainerStyle,
        leftControlsContainerStyle,
        rightControlsContainerStyle,
        iconStyle,
        playIconStyle
      } = styles;
      const {
        isRunning,
        isPlaying
      } = this.state;
      const {
        pluginConfig: {
          controlsPosition
        }
      } = this.props;
      const {
        spotifyManager
      } = this;

      if (isRunning) {
        let controlsStyle = controlsContainerStyle;

        switch (controlsPosition) {
          case 'left':
            controlsStyle = (0, _objectSpread2["default"])({}, controlsContainerStyle, leftControlsContainerStyle);
            break;

          case 'right':
            controlsStyle = (0, _objectSpread2["default"])({}, controlsContainerStyle, rightControlsContainerStyle);
            break;

          default:
            controlsStyle = (0, _objectSpread2["default"])({}, controlsContainerStyle);
        }

        const supportedActions = spotifyManager.supportedActions();
        return React.createElement("div", {
          style: controlsStyle
        }, React.createElement(Icon, {
          iconName: "previous",
          onClick: () => this.skipTo(previous),
          style: (0, _objectSpread2["default"])({}, iconStyle, {
            display: !supportedActions.includes('previousTrack') ? 'none' : 'inherit'
          })
        }), React.createElement(Icon, {
          iconName: isPlaying ? 'pause' : 'play',
          onClick: () => this.togglePlayState(),
          style: (0, _objectSpread2["default"])({}, iconStyle, playIconStyle, {
            display: !supportedActions.includes('togglePlayPause') ? 'none' : 'inherit'
          })
        }), React.createElement(Icon, {
          iconName: "next",
          onClick: () => this.skipTo(next),
          style: (0, _objectSpread2["default"])({}, iconStyle, {
            display: !supportedActions.includes('nextTrack') ? 'none' : 'inherit'
          })
        }));
      }

      return React.createElement(Icon, {
        iconName: "spotify",
        onClick: () => this._launchSpotify(),
        style: iconStyle
      });
    }

    render() {
      const {
        track
      } = this.state;
      const {
        widgetStyle
      } = styles;
      return React.createElement("div", {
        style: widgetStyle
      }, this.renderControls(), React.createElement(TrackInfo, {
        track: track
      }));
    }

  };
};

const styles = {
  'widgetStyle': {
    height: 30,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'controlsContainerStyle': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 6
  },
  'leftControlsContainerStyle': {
    position: 'absolute',
    left: 14,
    marginRight: 0
  },
  'rightControlsContainerStyle': {
    position: 'absolute',
    right: 14,
    marginRight: 0
  },
  'iconStyle': {
    height: 16,
    width: 18
  },
  'playIconStyle': {
    marginLeft: 6,
    marginRight: 6
  }
};
var _default = HyperSpotifyWidgetFactory;
exports["default"] = _default;