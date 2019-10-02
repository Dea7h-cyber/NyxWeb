const express = require('express');
const router = express.Router();
const { sequelize } = require('../sequelize');

/**
 * @route   POST /api/carts
 * @desc    Create a new cart
 */

router.get('/', async (req, res) => {

  const characters = await sequelize.query("SELECT TOP 5 [Name] FROM Character");

  res.status(200).json({ characters: characters[0] });

  // sequelize.query("SELECT TOP 5 * FROM Character")
  //   .then(users => {
  //     res.status(200).json({ test: users });
  //   });
})

router.post('/register', (req, res) => {
  // If carts folder do not exist, create it
  // res.setHeader('location', `/api/carts/${id}`);
  res.status(200).json({ params: req.body });
});

module.exports = router;