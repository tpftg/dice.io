// HTTP Server

const cors = require('cors')
const DiceIO = require('./dice-io')
const engines = require('./engines')
const express = require('express')
const http = require('http')
const path = require('path')
const serveStatic = require('serve-static')
const socketIO = require('socket.io')

const rootPath = path.resolve(__dirname, '../../public')

exports.defaultConfig = function () {
  return {
    host: '127.0.0.1',
    port: 8080,
    engine: engines.RPG_DICE_ROLLER,
    historyLength: 50,
  }
}

exports.hasEngine = function (engine) {
  return engines.has(engine)
}

exports.create = function (config) {
  const server = http.createServer(
    express()
      .use(cors({origin: true}))
      .use(serveStatic(rootPath, {index: 'index.html'}))
  )

  const io = socketIO(server)
  const diceRoller = new DiceIO(io, config) // eslint-disable-line no-unused-vars

  return server
}
