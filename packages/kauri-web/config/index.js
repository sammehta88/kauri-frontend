const config = Object.assign(
  require('./default'),
  process.env.NODE_ENV === 'test'
    ? require('./test')
    : process.env.NODE_ENV === 'production'
      ? require('./production')
      : require('./development'),
  require('./custom-environment-variables'),
  process.env.NODE_ENV !== 'production' && require('./local')
)

exports.default = config
exports.config = config
