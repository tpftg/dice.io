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

function sanitize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '')
}

async function init() {
  // Attempt to get current user id (dice roller nickname)
  const userInfo = await miro.board.getUserInfo().catch((e) => {
    console.log('[Dice Roller] Failed to get user info', e)
  })

  // Attempt to get board id (dice roller channel)
  const boardInfo = await miro.board.getInfo().catch((e) => {
    console.log('[Dice Roller] Failed to get board info', e)
  })

  // Attempt to get online users (dice roller nickname)
  const users = await miro.board.getOnlineUsers().catch((e) => {
    console.log('[Dice Roller] Failed to get online users', e)
  })

  // Ensure user id and board id are available
  if (! userInfo.id || ! boardInfo.id) {
    throw new Error('[Dice Roller] failed to get required info')
  }

  // Attempt to find username
  const user = Array.isArray(users) ? users.find(u => u.id && u.id === userInfo.id) : null

  // Start the app
  const nickname = user && user.name ? user.name : 'user_' + sanitize(userInfo.id)
  const channel = 'miro' + sanitize(boardInfo.id)
  startApp(nickname, channel)
}

init()
