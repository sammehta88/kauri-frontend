const path = require('path')
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const webpack = require('webpack')

module.exports = (baseConfig, env) => {
  const extendedDefaultConfig = genDefaultConfig(baseConfig, env)
  extendedDefaultConfig.module.rules.push({
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader'],
  })
  // let jsBabelFix = extendedDefaultConfig.module.rules[0]
  // jsBabelFix.test = /\.js$/
  // extendedDefaultConfig.module.rules.push(jsBabelFix)
  // console.log(extendedDefaultConfig)
  // console.log(extendedDefaultConfig.module.rules[0].query)
  // console.log(extendedDefaultConfig.module.rules[0])
  return extendedDefaultConfig
}
