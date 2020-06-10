// dice.js engine

const dicejs = require('dice.js')
const engines = require('./index')
const Engine = require('./base-engine')

function DiceJsEngine() {
  Engine.call(this, engines.DICE_JS)
}

// DiceJsEngine extends Engine
DiceJsEngine.prototype = Object.create(Engine.prototype)
DiceJsEngine.prototype.constructor = DiceJsEngine

DiceJsEngine.prototype.roll = function (formula) {
  var result = dicejs.roll(formula)

  // (formula, value, message, result)
  return this.makeRoll(
    formula,
    result,
    dicejs.stringify(result),
    Object.assign({}, result)
  )
}

exports = module.exports = DiceJsEngine
