import engine from '../engine/engine'
import Level from '../engine/level'

import * as THREE from 'three'
import 'three/OrbitControls'

import editorUI from './ui/editor-ui'

let currentWorldInstance = null

export default {
  render() {
    if (currentWorldInstance) {
      currentWorldInstance.destroy()
    }

    let controls

    const world = (currentWorldInstance = engine.createWorld({
      onRender(dt) {
        if (controls) {
          controls.update()
        }
      },
    }))

    controls = new THREE.OrbitControls(world.camera, world.canvasDomElement)
    controls.addEventListener('change', world.render)
    //controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = true
    controls.enablePan = true

    const level = Level()

    for (const cube of level.getCubes()) {
      world.addCube({
        size: cube.size,
        position: cube.position,
      })
    }

    world.camera.position.copy(new THREE.Vector3(0, 3, 10))
    world.camera.lookAt(new THREE.Vector3(0, 0, 0))

    var dir = new THREE.Vector3(1, 2, 0)

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize()

    var origin = new THREE.Vector3(0, 0, 0)
    var length = 1
    var hex = 0xffff00

    var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
    world.scene.add(arrowHelper)

    const ui = editorUI()

    const element = new DOMParser().parseFromString('<div></div>', 'text/html').body.firstChild
    element.appendChild(world.canvasDomElement)
    element.appendChild(ui.domElement)
    return element
  },

  destroy() {
    if (currentWorldInstance) {
      currentWorldInstance.destroy()
      currentWorldInstance = null
    }
  },
}
