const express = require('express');
const router = express.Router();

const User = require('../models/user');

/**
 * @route   POST /api/users
 * @desc    Creates a new account
 */

router.post('/', async (req, res) => {
  console.log('sdsa? > ', req.body.username, req.body.password);

  if (req.body.username) {

    const user = await User.findOne({
      where: { memb___id: req.body.username },
      attributes: ['memb___id', 'memb__pwd']
    })

    if (user) {
      res.status(200).json(user);
      return;
    }

  }

  res.status(404).json({ error: 'User not found' });
});

module.exports = router;