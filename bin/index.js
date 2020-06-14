#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const server = require('../src/server')

var config = server.defaultConfig()

const optionList = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage help.' },
  { name: 'host', alias: 'a', type: String, description: 'Server ip address or hostname.', defaultValue: config.host },
  { name: 'port', alias: 'p', type: Number, description: 'Server port number.', defaultValue: config.port },
  { name: 'engine', alias: 'e', type: String, description: 'Default dice roller engine.', defaultValue: config.engine },
  { name: 'history', type: Number, description: 'Dice roll history size.', defaultValue: config.historyLength },
]

var options = {}

try {
  options = commandLineArgs(optionList)
} catch (e) {
  // Assume e is UNKNOWN_OPTION error
  options.help = true
}

if (options.help) {
  console.log(commandLineUsage([
    {
      header: 'dice.io',
      content: 'A simple dice roller server.',
    },
    {
      header: 'Options',
      optionList: optionList,
    }
  ]))
  process.exit()
}

options.host && (config.host = options.host)
options.port && (config.port = options.port)
options.history && (config.historyLength = options.history)

if (server.hasEngine(options.engine)) {
  config.engine = options.engine
} else {
  console.log('Error: unknown "' + options.engine + '" engine : fallback to "' + config.engine + '"')
}

server.create(config)
  .listen(config.port, config.host, () => {
    console.log('Dice roller server listening on ' + config.host + ':' + config.port)
  })
