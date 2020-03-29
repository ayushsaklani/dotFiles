"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

const HyperSpotifyOverlayFactory = React => function HyperOverlay() {
  return React.createElement("span", {
    className: "hyper-spotify-overlay",
    style: styles.overlayStyle
  });
};

const styles = {
  overlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.07
  }
};
var _default = HyperSpotifyOverlayFactory;
exports["default"] = _default;