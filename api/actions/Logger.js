const winston = require('winston')

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: './logs/info.log',
      level: 'info'
    }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ]
})
