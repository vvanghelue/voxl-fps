import engine from '../engine/engine'
import Level from '../engine/level'
import ObjLoader from '../engine/lib/obj-loader'
import GltfLoader from '../engine/lib/gltf-loader'

import * as THREE from 'three'
import 'three/OrbitControls'

import editorUI from './ui/editor-ui'


let currentWorldInstance = null

export default {
  async create() {
    if (currentWorldInstance) {
      currentWorldInstance.destroy()
    }

    const level = Level({ name: 'New level 01' })

    let controls

    const world = (currentWorldInstance = engine.createWorld({
      onRender(dt) {
        if (controls) {
          controls.update()
        }
      },
    }))

    // world.loadLevel()

    controls = new THREE.OrbitControls(world.camera, world.canvasDomElement)
    controls.addEventListener('change', world.render)
    //controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = true
    controls.enablePan = true


    for (const cube of level.getCubes()) {
      world.addCube({
        size: cube.size,
        position: cube.position,
      })
    }

    world.camera.position.copy(new THREE.Vector3(-9, 3, 6))
    world.camera.lookAt(new THREE.Vector3(0, 0, 0))

    //
    //
    //
    const spawnMesh = (await ObjLoader.load({ path: '/assets/editor/spawn/spawn.obj' })).children[0]
    window.spawnMesh = spawnMesh
    spawnMesh.material = new THREE.MeshStandardMaterial({ color: 0x4499ff, roughness: .7 })
    spawnMesh.castShadow = true
    spawnMesh.recieveShadow = true
    spawnMesh.position.copy(new THREE.Vector3(0, 0.22, -10))
    console.log(spawnMesh)
    world.scene.add(spawnMesh)
    //
    //
    //


    const ui = editorUI()

    const element = new DOMParser().parseFromString('<div class="editor"></div>', 'text/html').body.firstChild
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
