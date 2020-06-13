// plugin.js

import './plugin.css'
import MiroPluginApp from './miro-plugin-app'

/* global DiceIO, miro */

miro.onReady(() => {
    // Create dice roller client instance
    let pathname = window.location.pathname.replace(/miro\/sidebar\.html$/gi, '')
    let diceRoller = new DiceIO({
        serverUrl: window.location.origin,
        socketOptions: { path: pathname + 'socket.io' },
    })

    // Attempt to get current user nickname
    miro.currentUser.getId()
      .then((id) => {
        fetch('https://miro.com/api/v1/users/' + id)
          .then(response => response.json())
          .then(data => {
            diceRoller.setNickname(data.name)
          })
          .catch(e => {
            console.log('Failed to get user nickname', e)
          })
      })

    // Start Miro web plugin application
    let app = new MiroPluginApp(diceRoller) // eslint-disable-line no-unused-vars
})
