"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

const TrackInfoFactory = React => ({
  track
}) => {
  return React.createElement("div", {
    className: "hyper-spotify-track"
  }, React.createElement("b", null, track.name), " ", track.artist ? React.createElement("span", null, " by ", React.createElement("b", null, track.artist)) : '');
};

var _default = TrackInfoFactory;
exports["default"] = _default;