// DiceIO

const crypto = require('crypto')
const engines = require('./engines')
const eventNames = require('./event-names')
const History = require('./history')
const makeEngine = require('./engines/factory')

function DiceIO(io, config) {
  this._cfg = config
  this._history = new History(config.historyLength)
  io.on(eventNames.CONNECT, (socket) => {
    console.log('[ %s ] connected', socket.id)
    socket
      .on(eventNames.DISCONNECT, () => console.log('[ %s ] disconnected', socket.id))
      .on(eventNames.HISTORY, (data) => {
        var length = data && data.length || 0
        socket.emit(eventNames.HISTORY, this.history(length))
      })
      .on(eventNames.ROLL, (data) => {
        var result = this.roll(data)
        if (result.error) {
          socket.emit(eventNames.ERROR, result)
        } else {
          io.emit(eventNames.ROLL, result)
        }
      })
  })
}

DiceIO.prototype.uuid = function () {
  // https://gist.github.com/jed/982883
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b=>(b^crypto.rng(1)[0]%16>>b/4).toString(16))
}

DiceIO.prototype.resolveEngine = function (engine) {
  // Fallback to default engine if unknown
  return engines.has(engine) ? engine : this._cfg.engine
}

DiceIO.prototype.history = function (length) {
  return this._history.get(length)
}

DiceIO.prototype.roll = function (data) {
  var engineName = this.resolveEngine(data.engine)
  try {
    var diceRoller = makeEngine(engineName)
    var result = {
      id: this.uuid(),
      nickname: data.nickname,
      roll: diceRoller.roll(data.formula),
      timestamp: Date.now(),
    }

    this._history.push(result)

    return result
  } catch (error) {
    return {
      error: error,
      message: 'Roll has failed',
      roll: {
        engine: {
          name: engineName,
        },
        formula: data.formula,
      }
    }
  }
}

exports = module.exports = DiceIO
