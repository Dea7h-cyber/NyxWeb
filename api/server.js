const app = require('express')();
const port = 4000;

const bodyParser = require('body-parser');

// app.use(express.json({ extended: true }));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Log with url and method
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request made', req.method, req.url);
  next();
});

// Routes
// app.use('/api/user', require('./routes/user.js'));
app.use('/api/characters', require('./routes/characters'));
app.use('/api/users', require('./routes/users'));

// if no route was handled we display not found
app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

app.listen(port, () => console.log(`API running on port ${port}!`));