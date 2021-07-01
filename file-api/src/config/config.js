module.exports = {
  production: {
    jwtSecret: 'secret',
    port: process.env.FILE_SERVER_PORT,
    privateKey: '../../../../etc/letsencrypt/live/startrobot.ru/privkey.pem',
    certificate: '../../../../etc/letsencrypt/live/startrobot.ru/cert.pem'
  },
  development: {
    jwtSecret: 'secret',
    port: process.env.FILE_SERVER_PORT
  }
}
  
