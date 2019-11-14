const models = require('../../models/')

module.exports = async (req, res) => {
  const Character = models.Character()

  try {
    Character.hasOne(models.MEMB_STAT, {
      as: 'status',
      sourceKey: 'AccountID',
      foreignKey: 'memb___id'
    })

    const character = await Character.findOne({
      where: { Name: req.params.name },
      attributes: ['Name', 'AccountID'],
      // raw: true
      include: [
        {
          as: 'status',
          model: models.MEMB_STAT
        }
      ]
    })

    if (character) {
      res.json(character)
    } else {
      res.json({ error: 'Character with this name could not be found' })
    }
  } catch (error) {
    console.log(error)
    res.json({
      error: 'Something went wrong. Please try again later.'
    })
  }
}
