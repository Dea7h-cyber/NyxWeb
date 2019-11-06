const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('./actions/Logger')

const app = express()
const port = 4000

// support parsing of application/json && application/x-www-form-urlencoded type post data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// Log with url and method
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  logger.info(`Method: ${req.method} | URL: ${req.url} | IP: ${req.ip}`, {
    date: new Date(),
    body: { ...req.body },
    params: { ...req.params },
    cookies: { ...req.cookies }
  })
  next()
})

// Routes
app.use('/api/characters', require('./routes/characters'))
app.use('/api/users', require('./routes/users'))

// if no route was handled we display not found
app.use((_, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => console.log(`API running on port ${port}!`))
