// Dice browser client

import socketIO from 'socket.io-client'
import {random, isFunction} from './utils'
import engines from '../server/engines'
import eventNames from '../server/event-names'

export default class DiceRoller {

  constructor(config = {}) {
    this._validate(config)
    this._configure(config)
    this._cfg.connect && this._connect()
  }

  static get engines() {
    return engines
  }

  get defaultConfig() {
    return {
      connect: false,
      historyOnConnect: true,
      nickname: 'User' + random(100, 999),
      serverUrl: window.location.origin,
      socketOptions: { path: window.location.pathname + 'socket.io' },
    }
  }

  get config() {
    return this._cfg
  }

  get connected() {
    return this._socket ? this._socket.connected : false
  }

  get nickname() {
    return this._cfg.nickname
  }

  _validate(config) {
    // Fast & dirty configuration validation
    if (Object.prototype.hasOwnProperty.call(config, 'nickname') && (config.nickname + '').length < 1) {
      this._throwConfigError('nickname')
    }

    if (config.engine && !engines.has(config.engine)) {
      this._throwConfigError('engine')
    }

    ['onDisconnect', 'onConnect', 'onError', 'onHistory', 'onRoll'].forEach(key => {
      if (Object.prototype.hasOwnProperty.call(config, key) && !isFunction(config[key]))
        this._throwConfigError(key)
    })
  }

  _configure(config) {
    this._cfg = Object.assign({}, this.defaultConfig, config)
  }

  _throwConfigError(key) {
      throw new Error('Bad "' + key + '" configuration value')
  }

  _connect() {
    this._socket = socketIO(this._cfg.serverUrl, this._cfg.socketOptions)
      .on(eventNames.ERROR, error => this._onError(error))
      .on(eventNames.HISTORY, result => this._onHistory(result))
      .on(eventNames.ROLL, result => this._onRoll(result))
      .on(eventNames.DISCONNECT, () => this._onDisconnect())
      .on(eventNames.CONNECT, () => this._onConnect())
  }

  _onDisconnect() {
    isFunction(this._cfg.onDisconnect) && this._cfg.onDisconnect(this._cfg)
  }

  _onConnect() {
    isFunction(this._cfg.onConnect) && this._cfg.onConnect(this._cfg)
    this._cfg.historyOnConnect && isFunction(this._cfg.onHistory) && this.getHistory()
  }

  _onError(error) {
    isFunction(this._cfg.onError) && this._cfg.onError(error)
  }

  _onRoll(result) {
    isFunction(this._cfg.onRoll) && this._cfg.onRoll(result)
  }

  _onHistory(result) {
    isFunction(this._cfg.onHistory) && this._cfg.onHistory(result)
  }

  connect() {
    this.connected || this._connect()
  }

  disconnect() {
    if (this.connected) {
      this._socket.disconnect()
      this._socket = null
    }
  }

  setNickname(nickname) {
    if ((nickname + '').length > 0) {
      this._cfg.nickname = nickname
    }

    return this
  }

  setEngine(engine) {
    if (engines.has(engine)) {
      this._cfg.engine = engine
    }

    return this
  }

  onConnect(callback) {
    if (isFunction(callback)) {
      this._cfg.onConnect = callback
    }

    return this
  }

  onDisconnect(callback) {
    if (isFunction(callback)) {
      this._cfg.onDisconnect = callback
    }

    return this
  }

  onError(callback) {
    if (isFunction(callback)) {
      this._cfg.onError = callback
    }

    return this
  }

  onHistory(callback) {
    if (isFunction(callback)) {
      this._cfg.onHistory = callback
    }

    return this
  }

  onRoll(callback) {
    if (isFunction(callback)) {
      this._cfg.onRoll = callback
    }

    return this
  }

  getHistory(length) {
    this.connected && this._socket.emit(eventNames.HISTORY, {
      length: length
    })
  }

  roll(formula, scope) {
    this.connected && this._socket.emit(eventNames.ROLL, {
      engine: this._cfg.engine,
      formula: formula,
      nickname: this._cfg.nickname,
      scope: scope,
    })
  }
}
