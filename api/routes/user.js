const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('MuOnline', 'sa', 'thepasswordis1', {
  host: "127.0.0.1",
  port: 60143,
  dialect: 'mssql'
});

/**
 * @route   POST /api/carts
 * @desc    Create a new cart
 */

router.get('/', (req, res) => {
  const Model = Sequelize.Model;
  class Character extends Model { }
  Character.init({
    // attributes
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Character'
    // options
  });

  Character.findOne({ where: { Name: 'ADAM' } }).then(project => {
    res.status(200).json({ test: project });
    // project will be the first entry of the Projects table with the title 'aProject' || null
  })
  // sequelize
  //   .authenticate()
  //   .then(() => {
  //     console.log('Connection has been established successfully.');
  //   })
  //   .catch(err => {
  //     console.error('Unable to connect to the database:', err);
  //   });

  // sequelize.close();

  // res.status(200).json({ test: 'yes' });
})

router.post('/register', (req, res) => {
  // If carts folder do not exist, create it
  // res.setHeader('location', `/api/carts/${id}`);
  res.status(200).json({ params: req.body });
});

module.exports = router;