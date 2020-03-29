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

var _Icon = _interopRequireDefault(require("./Icon"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys["default"])(object); if (_getOwnPropertySymbols["default"]) { var symbols = (0, _getOwnPropertySymbols["default"])(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor["default"])(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3["default"])(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors["default"]) { (0, _defineProperties["default"])(target, (0, _getOwnPropertyDescriptors["default"])(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2["default"])(target, key, (0, _getOwnPropertyDescriptor["default"])(source, key)); }); } } return target; }

const PlayerControlsFactory = React => {
  const Icon = (0, _Icon["default"])(React);

  const PlayerControls = ({
    isPlaying,
    onNext,
    onPrevious,
    onTogglePlayState,
    supportedActions
  }) => React.createElement("div", {
    style: styles.controlsContainerStyle
  }, React.createElement(Icon, {
    iconName: "previous",
    onClick: onPrevious,
    style: _objectSpread({}, styles.iconStyle, {
      display: !supportedActions.includes('previousTrack') ? 'none' : 'inherit'
    })
  }), React.createElement(Icon, {
    iconName: isPlaying ? 'pause' : 'play',
    onClick: onTogglePlayState,
    style: _objectSpread({}, styles.iconStyle, {}, styles.playIconStyle, {
      display: !supportedActions.includes('togglePlayPause') ? 'none' : 'inherit'
    })
  }), React.createElement(Icon, {
    iconName: "next",
    onClick: onNext,
    style: _objectSpread({}, styles.iconStyle, {
      display: !supportedActions.includes('nextTrack') ? 'none' : 'inherit'
    })
  }));

  return PlayerControls;
};

const styles = {
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
  }
};
var _default = PlayerControlsFactory;
exports["default"] = _default;