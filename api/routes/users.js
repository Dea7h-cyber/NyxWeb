const express = require('express');
const router = express.Router();

const User = require('../models/user');

/**
 * @route   POST /api/users/authentication
 * @desc    User authentication
 */

router.post('/authentication', async (req, res) => {
  if (req.body.username && req.body.password) {
    const user = await User.findOne({
      where: { memb___id: req.body.username, memb__pwd: req.body.password },
      attributes: ['memb___id', 'memb__pwd']
    })

    if (user && user.memb___id === req.body.username && user.memb__pwd === req.body.password) {
      res.cookie('username', req.body.username);
      res.status(200).json({ message: 'success' });
      return;
    }
  }

  res.status(404).json({ error: 'User not found' });
});

module.exports = router;