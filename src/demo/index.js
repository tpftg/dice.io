// DiceIO demo application

import './style.css'
import { el, str, make, addOneClass, removeClass } from './dom'
import { getCookie, setCookie } from './cookie'

const COOKIE_NICKNAME = '__DiceIO_Demo_Nickname'

export default class DemoApp {
  constructor(diceRoller) {
    this._diceRoller = diceRoller
    this._setupApp()
    this._setupNickname(() => {
      this._setupDiceRoller()
    })
  }

  get formula() {
    return el('.formula')
  }

  get rolls() {
    return el('.rolls')
  }

  get modal() {
    return el('.modal')
  }

  get modalNickname() {
    return el('.modal-nickname')
  }

  get modalButton() {
    return el('.modal-button')
  }

  get showModalButton() {
    return el('.topnav-nickname')
  }

  _setupApp() {
    // Make locale date time formatter
    this._IntlDateFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })

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

    // Modal nickname input text
    this.modalButton.addEventListener('click', (event) => {
      event.preventDefault()
      if (str(this.modalNickname.value).length > 1) {
        this._useNickname(this.modalNickname.value)
        this._setModalVisibility(false)
      } else {
        this._inputErrorAnimation(this.modalNickname)
      }
    })

    // Top right nickname button
    this.showModalButton.addEventListener('click', (event) => {
      event.preventDefault()
      this._setModalVisibility(true)
    })
  }

  _setupNickname(next) {
    // Attempt to get previously saved nickname
    let savedNickname = getCookie(COOKIE_NICKNAME)

    // Use saved nickname if available (skip modal)
    if (savedNickname.length > 1) {
      this._useNickname(savedNickname)
      this._setFocus(this.formula)

      return next()
    }

    // Show nickname modal
    this._setModalVisibility(true)
    next()
  }

  _useNickname(nickname) {
    setCookie(COOKIE_NICKNAME, nickname, 365) // Store for 365 days
    this.modalNickname.value = nickname
    this.showModalButton.innerText = nickname
    this._diceRoller.setNickname(nickname)
  }

  _setModalVisibility(isShow) {
    if (isShow) {
      this.modalNickname.value = this._diceRoller.nickname
      this.modal.style.display = 'block'
      this._setFocus(this.modalNickname)
    } else {
      this.modal.style.display = 'none'
      this._setFocus(this.formula)
    }
  }

  _setupDiceRoller() {
    this._diceRoller
      .onError((error) => {
        console.log('Dice roll error', error)
        this._inputErrorAnimation(this.formula)
      })
      .onDisconnect((config) => {
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

    this._scrollToBottom(document.body)
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

  _setFocus(element, delay = 100) {
    setTimeout(() => { element.focus() }, delay)
  }

  _inputErrorAnimation(inputElement, className = 'input-error', duration = 300) {
    // (style.css): default input error animation is 0.1 * 3 = 300 milliseconds
    addOneClass(inputElement, className)
    setTimeout(() => {
      removeClass(inputElement, className)
    }, duration)
  }

  _formatTimestamp(timestamp) {
    return this._IntlDateFormatter.format(new Date(timestamp))
  }

  _appendRoll(result) {
    let roll = make('div', {
      class: 'roll',
    })

    roll.appendChild(make('div', {
      class: 'roll-nickname',
      text: result.nickname,
    }))

    roll.appendChild(make('div', {
      class: 'roll-time',
      text: this._formatTimestamp(result.timestamp),
    }))

    roll.appendChild(make('div', {
      class: 'roll-details',
      text: result.roll.message,
    }))

    roll.appendChild(make('div', {
      class: 'roll-result',
      text: result.roll.formula + ' = ' + result.roll.value,
    }))

    this.rolls.appendChild(roll)
  }

  _onRoll(result) {
    // console.log('onRoll', result)
    this._appendRoll(result)
    this._scrollToBottom(document.body)
  }
}
