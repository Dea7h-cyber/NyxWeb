const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

// support parsing of application/json && application/x-www-form-urlencoded type post data
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// Log with url and method
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', '*')
  console.log(`Method: ${req.method} | URL: ${req.url} | IP: ${req.ip}`)
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
