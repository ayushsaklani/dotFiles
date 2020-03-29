"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.HyperSpotifyFooterFactory = void 0;

var _HyperOverlay = _interopRequireDefault(require("./HyperOverlay"));

var _HyperSpotifyWidget = _interopRequireDefault(require("../containers/HyperSpotifyWidget"));

const HyperSpotifyFooterFactory = React => {
  const HyperSpotifyOverlay = (0, _HyperOverlay["default"])(React); // eslint-disable-line no-unused-vars

  const HyperSpotifyWidget = (0, _HyperSpotifyWidget["default"])(React); // eslint-disable-line no-unused-vars

  return ({
    pluginConfig
  }) => React.createElement("footer", {
    className: "hyper-spotify hoverable",
    style: styles.footerStyle
  }, React.createElement(HyperSpotifyOverlay, null), React.createElement(HyperSpotifyWidget, {
    pluginConfig: pluginConfig
  }));
};

exports.HyperSpotifyFooterFactory = HyperSpotifyFooterFactory;
const styles = {
  'footerStyle': {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5'
  }
};