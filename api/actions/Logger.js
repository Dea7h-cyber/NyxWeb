const winston = require('winston')

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: './logs/errors.log'
    })
  ],
  transports: [new winston.transports.File({ filename: './logs/combined.log' })]
})
