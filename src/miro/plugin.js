// plugin.js

import './plugin.css'
import MiroPluginApp from './miro-plugin-app'

/* global DiceIO, miro */

function startApp(nickname, channel) {
  // Create dice roller client instance
  let pathname = window.location.pathname.replace(/miro\/sidebar\.html$/gi, '')
  let diceRoller = new DiceIO({
    channel: channel,
    nickname: nickname,
    serverUrl: window.location.origin,
    socketOptions: { path: pathname + 'socket.io' },
  })

  // Start Miro web plugin application
  let app = new MiroPluginApp(diceRoller) // eslint-disable-line no-unused-vars
}

miro.onReady(() => {
  // Attempt to get current user name (dice roller nickname)
  // and team account id (dice roller channel)
  miro.board.getInfo()
    .then(data => {
      // Ensure data exists because it is an undocumented feature and might be updated/removed in the future
      if (! data.currentUserContext ||
          ! data.currentUserContext.user ||
          ! data.currentUserContext.user.name ||
          ! data.account ||
          ! data.account.id) {
        throw new Error('Failed to extract user name or account id from board info')
      }

      startApp(data.currentUserContext.user.name, 'miro' + data.account.id)
    })
    .catch(e => {
      console.log('[Dice Roller] Failed to get board info', e)
    })
})
