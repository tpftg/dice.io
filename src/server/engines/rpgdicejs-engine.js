// rpgdicejs engine

const engines = require('./index')
const Engine = require('./base-engine')
const rpgdicejs = require('rpgdicejs')

function RpgdicejsEngine() {
  Engine.call(this, engines.RPG_DICE_JS)
}

// RpgdicejsEngine extends Engine
RpgdicejsEngine.prototype = Object.create(Engine.prototype)
RpgdicejsEngine.prototype.constructor = RpgdicejsEngine

RpgdicejsEngine.prototype.roll = function (formula) {
  var result = rpgdicejs.parse(formula)
  result.eval()

  // (formula, value, message, result)
  return this.makeRoll(
    formula,
    result.value,
    result.render(),
    result
  )
}

exports = module.exports = RpgdicejsEngine
