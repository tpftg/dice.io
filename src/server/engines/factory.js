// Dice roller engine factory

const DiceJsEngine = require('./dice-js-engine')
const engines = require('./index')
const RpgdicejsEngine = require('./rpgdicejs-engine')
const RpgDiceRoller = require('./rpg-dice-roller-engine')

var instances = {}

function make(engine) {
  // Check if already created
  if (instances[engine]) {
    return instances[engine]
  }

  switch (engine) {
    case engines.DICE_JS:
        return instances[engine] = new DiceJsEngine()

    case engines.RPG_DICE_JS:
        return instances[engine] = new RpgdicejsEngine()

    case engines.RPG_DICE_ROLLER:
        return instances[engine] = new RpgDiceRoller()

    default:
      throw new Error('Failed to create engine')
  }
}

exports = module.exports = make
