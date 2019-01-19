import * as THREE from 'three'

window.THREE = THREE

import editor from './editor/editor'
// import game from './game/game'

const renderApp = () => {
  editor.destroy()

  document.body.querySelector('.app-container').innerHTML = ''
  if (app.mode == 'editor') {
    document.body.querySelector('.app-container').appendChild(editor.render())
  }
}

export const app = {
  mode: 'editor',
  switchToEditorMode() {
    app.mode = 'editor'
    renderApp()
  },
  switchToGameMode() {
    app.mode = 'game'
    renderApp()
  },
}

renderApp()

// setInterval(() => {
//   renderApp()
// }, 10000)

// document.addEventListener('DOMContentLoaded', (e) => {

// })
