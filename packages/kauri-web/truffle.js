module.exports = {
  networks: {
    development: {
      protocol: 'http://',
      host: 'localhost',
      port: 8545,
      network_id: '*'
    }
  },
  migrations_directory: './migrations'
}
