// rpg-dice-roller engine

const { DiceRoller } = require('@dice-roller/rpg-dice-roller');
const engines = require('./index')
const Engine = require('./base-engine')

function RpgDiceRoller() {
  Engine.call(this, engines.RPG_DICE_ROLLER)
  this._diceRoller = new DiceRoller()
}

// RpgDiceRoller extends Engine
RpgDiceRoller.prototype = Object.create(Engine.prototype)
RpgDiceRoller.prototype.constructor = RpgDiceRoller

RpgDiceRoller.prototype.roll = function (formula) {
  var result = this._diceRoller.roll(formula)

  // (formula, value, message, result)
  return this.makeRoll(
    formula,
    result.total,
    result.toString(),
    result
  )
}

exports = module.exports = RpgDiceRoller
