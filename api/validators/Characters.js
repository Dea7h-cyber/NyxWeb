const { check, query } = require('express-validator')

const getMany = [
  query('page').isInt({ min: 1, max: 100 }),
  query('class')
    .isString()
    .isLength({ min: 0, max: 20 }),
  query('order')
    .isString()
    .isLength({ min: 1, max: 20 }),
  query('search')
    .optional()
    .isString()
    .isLength({ min: 1, max: 10 })
]

const addStats = [
  check('Strength').isInt({
    min: 0,
    max: 64000
  }),
  check('Dexterity').isInt({
    min: 0,
    max: 64000
  }),
  check('Vitality').isInt({
    min: 0,
    max: 64000
  }),
  check('Energy').isInt({ min: 0, max: 64000 }),
  check('Leadership').isInt({
    min: 0,
    max: 64000
  })
]

module.exports = {
  getMany,
  addStats
}
