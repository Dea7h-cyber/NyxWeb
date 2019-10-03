const express = require('express');

const app = express();
const port = 4000;

app.use(express.json({ extended: true }));

// Log with url and method
app.use((req, _, next) => {
  console.log('Request made', req.method, req.url);
  next();
});

// Routes
// app.use('/api/user', require('./routes/user.js'));
app.use('/api/characters', require('./routes/characters'));

// if no route was handled we display not found
app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

app.listen(port, () => console.log(`API running on port ${port}!`));