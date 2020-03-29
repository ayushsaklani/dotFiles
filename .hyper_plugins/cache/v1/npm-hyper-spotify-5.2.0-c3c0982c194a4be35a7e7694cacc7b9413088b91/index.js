const _ = require('lodash')
const { getThemeCssByName } = require('./dist/utils/ThemeManager')
const { HyperSpotifyHeaderFactory } = require('./dist/components/HyperSpotifyHeader')
const { HyperSpotifyFooterFactory } = require('./dist/components/HyperSpotifyFooter')

exports.decorateConfig = (config) => {
  const hyperSpotify = Object.assign({
    position: 'bottom',
    margin: 'default',
    controlsPosition: 'default'
  }, config.hyperSpotify)

  const { position, margin } = hyperSpotify

  let marginValue = (position === 'top' ? 34 : 0)
  switch (margin) {
    case 'default':
      marginValue += 30
      break

    case 'double':
      marginValue += 60
      break

    default:
      marginValue = margin
  }

  return Object.assign({}, config, {
    css: `
      ${config.css || ''}
  
      .terms_terms {
          margin-${position}: ${marginValue}px;
      }

      .hyper-spotify {
        margin-${position}: ${marginValue - 30}px;
      }

      .hyper-spotify.hoverable:hover,
      .hyper-spotify .hoverable:hover {
        opacity: 1 !important;
      }
    `
  })
}

exports.reduceUI = (state, {type, config}) => {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperSpotify', config.hyperSpotify)
    }
  }

  return state
}

exports.mapHyperState = ({ ui: { hyperSpotify } }, map) => Object.assign({}, map, {
  hyperSpotify: Object.assign({}, hyperSpotify),
  customCSS: `${map.customCSS || ''} ${getThemeCssByName(_.get(hyperSpotify, 'theme', 'default'), hyperSpotify)}`
})

exports.decorateHyper = (Hyper, { React }) => {
  const HyperSpotifyHeader = HyperSpotifyHeaderFactory(React) // eslint-disable-line no-unused-vars
  const HyperSpotifyFooter = HyperSpotifyFooterFactory(React) // eslint-disable-line no-unused-vars

  return class extends React.PureComponent {
    render () {
      const {
        customInnerChildren: existingInnerChildren,
        hyperSpotify: pluginConfig
      } = this.props

      let customInnerChildren = existingInnerChildren ? existingInnerChildren instanceof Array ? existingInnerChildren : [existingInnerChildren] : []

      const position = _.get(pluginConfig, 'position', 'bottom')
      if (position === 'top') {
        customInnerChildren = [].concat(React.createElement(HyperSpotifyHeader, { pluginConfig }), customInnerChildren)
      } else if (position === 'bottom') {
        customInnerChildren = [].concat(customInnerChildren, React.createElement(HyperSpotifyFooter, { pluginConfig }))
      }

      return (
        React.createElement(Hyper, Object.assign({}, this.props, { customInnerChildren }))
      )
    }
  }
}
