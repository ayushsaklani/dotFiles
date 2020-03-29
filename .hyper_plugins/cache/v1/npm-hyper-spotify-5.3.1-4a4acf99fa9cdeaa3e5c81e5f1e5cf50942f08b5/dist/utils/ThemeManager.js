"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = exports.getThemeCssByName = exports.getThemeCssByVariables = void 0;
const defaultTheme = `
  .hyper-spotify .hyper-spotify-overlay {
    background-color: #FFF;
  }
  
  .hyper-spotify .hyper-spotify-icon {
    background-color: #FFF;
  }

  .hyper-spotify .hyper-spotify-icon-spotify {
    background-color: #1ED760;
  }

  .hyper-spotify .hyper-spotify-track {
    color: #FFF;
  }
`;
const lightTheme = `
  .hyper-spotify .hyper-spotify-overlay {
    background-color: #FFF;
  }

  .hyper-spotify .hyper-spotify-icon {
    background-color: #FFF;
  }

  .hyper-spotify .hyper-spotify-track {
    color: #FFF;
  }
`;
const darkTheme = `
  .hyper-spotify .hyper-spotify-overlay {
    background-color: #000;
  }

  .hyper-spotify .hyper-spotify-icon {
    background-color: #000;
  }

  .hyper-spotify .hyper-spotify-track {
    color: #000;
  }
`; // spotify:track:6wYJJ8AEhgS2euFsuTvZ1g

const halloweenTheme = `
  .hyper-spotify .hyper-spotify-overlay {
    background-color: #000;
  }

  .hyper-spotify .hyper-spotify-icon {
    background-color: #D75C1B;
  }

  .hyper-spotify .hyper-spotify-track {
    color: #D75C1B;
  }
`;

const getThemeCssByVariables = (overlayColor, iconColor, spotifyIconColor, textColor) => {
  return `
    .hyper-spotify .hyper-spotify-overlay {
      background-color: ${overlayColor || '#FFF'};
    }
    
    .hyper-spotify .hyper-spotify-icon {
      background-color: ${iconColor || '#FFF'};
    }

    .hyper-spotify .hyper-spotify-icon-spotify {
      background-color: ${spotifyIconColor || iconColor || '#1ED760'};
    }

    .hyper-spotify .hyper-spotify-track {
      color: ${textColor || '#FFF'};
    }
  `;
};

exports.getThemeCssByVariables = getThemeCssByVariables;

const getThemeCssByName = (themeName, {
  overlayColor,
  iconColor,
  spotifyIconColor,
  textColor
} = {}) => {
  switch (themeName) {
    case 'light':
      return lightTheme;

    case 'dark':
      return darkTheme;

    case 'halloween':
      return halloweenTheme;

    case 'custom':
      return getThemeCssByVariables(overlayColor, iconColor, spotifyIconColor, textColor);

    default:
      return defaultTheme;
  }
};

exports.getThemeCssByName = getThemeCssByName;
var _default = {
  getThemeCssByName,
  getThemeCssByVariables
};
exports["default"] = _default;