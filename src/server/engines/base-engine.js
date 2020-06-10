// Base engine

function Engine(name) {
  this.engine = name
}

Engine.prototype.makeRoll = function (formula, value, message, result) {
  return {
    engine: {
      name: this.engine,
      result: result,
    },
    formula: formula,
    message: message,
    value: value,
  }
}

exports = module.exports = Engine
