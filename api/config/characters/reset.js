module.exports = {
  /**
   * Level for reset type
   * 1: require the same level for all resets
   * 2: custom reset schema
   */
  levelResetType: 2,

  // Active if levelResetType: 1
  levelReset: 400,

  /**
   * Active if levelResetType: 2
   * 
   * Example:
   * 10: 300
   * requires level 300 for reset up until reset number 10
   */
  levelResetCustom: {
    10: 300,
    20: 330,
    30: 340,
    40: 350,
    50: 360,
    100: 400
  },

  /**
   * Reset cost type
   * 1: require the same zen for all resets
   * 2: formula: resetCost * resetNumber
   */
  resetCostType: 2,

  // Zen for each reset
  resetCost: 20000000,

  // Check for equipped items [true or false]
  checkForEquipment: true,

  /**
   * Stats per reset types
   * 1: Keep stats after reset
   * 2: Keep stats after reset +bonus points
   * 3: Reset stats
   */
  statsPerResetType: 3,

  // false -> use defaultStats
  // true -> use statsClasses
  statsPerClass: true,

  defaultStats: 500,

  statsClasses: {
    0: 400,
    1: 400,
    16: 350,
    17: 350,
    32: 370,
    33: 370,
    48: 420,
    64: 420
  },

  // Reset DL command
  // true = reset command
  // false = save command
  resetCommand: true
}