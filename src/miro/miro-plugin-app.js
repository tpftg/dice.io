// Miro Web plugin application

import { el, str, make, addOneClass, removeClass } from '../demo/dom'

export default class MiroPluginApp {
  constructor(diceRoller) {
    this._diceRoller = diceRoller
    this._setupDiceRoller()
    this._setupApp()
  }

  get formula() {
    return el('.diceroller-bottom__formula')
  }

  get rolls() {
    return el('.diceroller-rolls')
  }

  _setupApp() {
    // Dice formula input text
    this.formula.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        if (str(this.formula.value).length > 1) {
          this._diceRoller.roll(this.formula.value)
        } else {
          this._inputErrorAnimation(this.formula)
        }
      }
    })

    // Date time formatter
    this._IntlDateFormatter = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
  }

  _setupDiceRoller() {
    this._diceRoller
      .onError(() => {
        this._inputErrorAnimation(this.formula)
      })
      .onDisconnect((config) => {
        // TODO: display disconnect error in miro sidebar ?
        console.log('Disconnected from ' + config.serverUrl)
      })
      .onConnect((config) => {
        console.log('Connected to ' + config.serverUrl)
      })
      .onHistory((history) => { this._onHistory(history) })
      .onRoll((result) => { this._onRoll(result) })
      .connect()
  }

  _onHistory(history) {
    this._empty(this.rolls)

    // history is an Array of roll results
    history.forEach(result => {
      this._appendRoll(result)
    })

    this._scrollToBottom(this.rolls)
  }

  _onRoll(result) {
    // console.log('onRoll', result)
    this._appendRoll(result)
    this._scrollToBottom(this.rolls)
  }

  _appendRoll(result) {
    let roll = make('div', {
      class: 'diceroller-roll',
    })

    let name = make('div', {
      class: 'diceroller-roll__name',
    })

    name.appendChild(make('span', {
      attr: {
        title: result.nickname,
      },
      text: result.nickname,
    }))

    roll.appendChild(name)

    let time = make('div', {
      class: 'diceroller-roll__time',
    })

    time.appendChild(make('span', {
      text: this._formatTimestamp(result.timestamp),
    }))

    roll.appendChild(time)

    roll.appendChild(make('div', {
      class: 'clear',
    }))

    roll.appendChild(make('div', {
      class: 'diceroller-roll__formula',
      text: result.roll.formula,
    }))

    roll.appendChild(make('div', {
      class: 'diceroller-roll__message',
      text: result.roll.message,
    }))

    roll.appendChild(make('div', {
      class: 'diceroller-roll__value',
      text: result.roll.value,
    }))

    this.rolls.appendChild(roll)

    this.rolls.appendChild(make('div', {
      class: 'diceroller-rolls__border',
    }))
  }

  _formatTimestamp(timestamp) {
    return this._IntlDateFormatter.format(new Date(timestamp))
  }

  _empty(element) {
    let last
    while (last = element.lastChild) { // eslint-disable-line no-cond-assign
      element.removeChild(last)
    }
  }

  _scrollToBottom(element) {
    element.scrollTop = element.scrollHeight - element.clientHeight
  }

  _inputErrorAnimation(inputElement, className = 'input-error', duration = 300) {
    // (plugin.css): default input error animation is 0.1 * 3 = 300 milliseconds
    addOneClass(inputElement, className)
    setTimeout(() => {
      removeClass(inputElement, className)
    }, duration)
  }
}
