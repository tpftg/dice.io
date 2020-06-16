// DiceIO

const channel = require('./channel')
const crypto = require('crypto')
const engines = require('./engines')
const eventNames = require('./event-names')
const History = require('./history')
const makeEngine = require('./engines/factory')

function DiceIO(io, config) {
  this._cfg = config
  this._histories = {}
  io.on(eventNames.CONNECT, (socket) => {
    console.log('[ %s ] connected', socket.id)
    socket
      .on(eventNames.DISCONNECT, () => console.log('[ %s ] disconnected', socket.id))
      .on(eventNames.HISTORY, (data) => {
        var length = data && data.length || 0
        this._setupChannel(socket, data)
        socket.emit(eventNames.HISTORY, this.history(socket.diceioChannel).get(length))
      })
      .on(eventNames.ROLL, (data) => {
        this._setupChannel(socket, data)
        var result = this.roll(data)

        if (result.error) {
          socket.emit(eventNames.ERROR, result)
        } else {
          this.history(socket.diceioChannel).expireIn(this._cfg.historyExpiry).push(result)
          io.to(socket.diceioChannel).emit(eventNames.ROLL, result)
        }
      })
  })
  this._startHistoryGC(this._cfg.historyInterval)
}

DiceIO.prototype._setupChannel = function (socket, data) {
  // Check if already setup
  if (socket.diceioChannel) {
    return socket
  }

  // Setup channel
  socket.diceioChannel = channel.resolve(data, this._cfg.channel)
  socket.join(socket.diceioChannel)

  return socket
}

DiceIO.prototype._startHistoryGC = function (delay) {
  this._hgcInterval = setInterval(() => { this._performHistoryGC() }, delay)
}

DiceIO.prototype._performHistoryGC = function () {
  for (const channel in this._histories) {
    if (this._histories[channel].expired()) {
      delete this._histories[channel]
      console.log('%s channel history has expired', channel)
    }
  }
}

DiceIO.prototype._stopHistoryGC = function () {
  this._hgcInterval && clearInterval(this._hgcInterval)
  delete this._hgcInterval
}

DiceIO.prototype.uuid = function () {
  // https://gist.github.com/jed/982883
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b=>(b^crypto.rng(1)[0]%16>>b/4).toString(16))
}

DiceIO.prototype.resolveEngine = function (engine) {
  // Fallback to default engine if unknown
  return engines.has(engine) ? engine : this._cfg.engine
}

DiceIO.prototype.history = function (channel) {
  if (!this._histories[channel]) {
    this._histories[channel] = new History(this._cfg.historyLength)
  }

  return this._histories[channel]
}

DiceIO.prototype.roll = function (data) {
  var engineName = this.resolveEngine(data.engine)
  try {
    var diceRoller = makeEngine(engineName)

    return {
      id: this.uuid(),
      nickname: data.nickname,
      roll: diceRoller.roll(data.formula),
      timestamp: Date.now(),
    }
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
