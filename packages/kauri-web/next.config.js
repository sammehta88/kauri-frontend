const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const config = require('./config').default
const withSourceMaps = require('@zeit/next-source-maps')
const { join } = require('path')
global.process.env = Object.assign(process.env, config)

const processedConfig = Object.keys(config).reduce((current, next, i) => {
  current[`process.env.${next}`] = JSON.stringify(config[next])
  return current
}, {})

console.log(processedConfig)

module.exports = withSourceMaps({
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.IgnorePlugin(/^\/lib\/languages\/*$/, /highlight\.js$/),
      new webpack.IgnorePlugin(/^\.\/lib\/languages$/, /highlight\.js$/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin(processedConfig)
    )
    if (!isServer) {
      config.plugins.push(new webpack.IgnorePlugin(/jsdom$/))
    }
    if (process.env.NODE_ENV === 'production' || process.env.BUILD_CSS === 'true') {
      config.module.rules.push({
        test: /\.(css|less)$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      })
      config.module.rules.push(
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract({
            use: 'css-loader!less-loader',
          }),
        },
        {
          test: /\.(css)$/,
          loader: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        }
      )
      config.plugins.push(new ExtractTextPlugin(join(__dirname, '/static/styles.css')))
    } else {
      config.module.rules.push({
        test: /\.(css|less)$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      })
      config.module.rules.push(
        {
          test: /\.less$/,
          use: 'ignore-loader',
        },
        {
          test: /\.css$/,
          use: 'ignore-loader',
        }
      )
      config.devtool = 'cheap-module-source-map'
    }

    return config
  },
})
