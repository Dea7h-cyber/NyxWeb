const { check, query } = require('express-validator')

const getMany = [
  query('page')
    .optional()
    .isInt({ min: 1 }),
  query('Class')
    .optional()
    .isInt({ min: 0, max: 64 }),
  query('Name').optional()
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
