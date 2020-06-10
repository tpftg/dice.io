// Dice roller supported engines

var has = function (engine) {
  switch (engine) {
    case engines.DICE_JS:
    case engines.RPG_DICE_JS:
    case engines.RPG_DICE_ROLLER:
      return true
    default:
      return false
  }
}

const engines = Object.freeze({
  DICE_JS: 'dice.js',
  RPG_DICE_JS: 'rpgdicejs',
  RPG_DICE_ROLLER: 'rpg-dice-roller',
  has: has,
})

exports = module.exports = engines
