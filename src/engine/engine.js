import 'three/GLTFLoader'
import 'three/SkyShader'

import 'three/SSAOShader'
import 'three/CopyShader'
import 'three/EffectComposer'
import 'three/RenderPass'
import 'three/ShaderPass'
import 'three/MaskPass'
import 'three/SSAOPass'
import 'three/SimplexNoise'

import Stats from './lib/stats'

import SimplexNoise from './lib/SimplexNoise'
window.SimplexNoise = SimplexNoise

const createTerrain = () => {
  const geometry = new THREE.PlaneGeometry(1000, 1000, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
    // wireframe: true,
  })
  const terrainMesh = new THREE.Mesh(geometry, material)
  terrainMesh.receiveShadow = true
  terrainMesh.rotation.x = (-1 * Math.PI) / 2
  return terrainMesh
}

export default {
  createWorld({ onRender }) {
    let destroyed = false

    const scene = new THREE.Scene()
    // scene.fog = new THREE.Fog(new THREE.Color(0xffffff), 10, 50)
    const sky = new THREE.Sky()
    sky.scale.setScalar(450000)
    scene.add(sky)

    const sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(20000, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    )
    sunSphere.position.y = -700000
    sunSphere.visible = true
    scene.add(sunSphere)

    var distance = 400000
    const effectController = {
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
      inclination: 0.3, // elevation / inclination
      azimuth: 0.32, // Facing front,
      sun: !true,
    }

    const uniforms = sky.material.uniforms
    uniforms.turbidity.value = effectController.turbidity
    uniforms.rayleigh.value = effectController.rayleigh
    uniforms.luminance.value = effectController.luminance
    uniforms.mieCoefficient.value = effectController.mieCoefficient
    uniforms.mieDirectionalG.value = effectController.mieDirectionalG
    var theta = Math.PI * (effectController.inclination - 0.5)
    var phi = 2 * Math.PI * (effectController.azimuth - 0.5)

    sunSphere.position.x = distance * Math.cos(phi)
    sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta)
    sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta)

    uniforms.sunPosition.value.copy(sunSphere.position)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.x = 0
    camera.position.y = 3
    camera.position.z = 3
    camera.lookAt(scene.position)

    const renderer = new THREE.WebGLRenderer({  })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(1)
    renderer.setClearColor(0xabcdef)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const ambienLight = new THREE.AmbientLight(0xffffff) // soft white light
    scene.add(ambienLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(6, 13, -12)
    directionalLight.castShadow = true
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-20, 20, 20, -20, 1, 1000)
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500
    scene.add(directionalLight)
    const helper = new THREE.DirectionalLightHelper(directionalLight, 5)
    scene.add(helper)

    const terrain = createTerrain()
    scene.add(terrain)

    const addCube = ({ position }) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      // geometry.computeVertexNormals()
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      cube.castShadow = true
      cube.receiveShadow = true
      cube.position.copy(position)
      scene.add(cube)
      return cube
    }

    // const effectComposer = new THREE.EffectComposer(renderer)

    // const ssaoPass = new THREE.SSAOPass(scene, camera, 1400, 800)
    // ssaoPass.kernelRadius = 16
    // ssaoPass.renderToScreen = true
    // ssaoPass.output = THREE.SSAOPass.OUTPUT.SSAO
    // effectComposer.addPass(ssaoPass)

    const stats = new Stats()
    document.body.appendChild(stats.dom)

    const render = () => {
      renderer.render(scene, camera)
      // effectComposer.render()
    }

    const animate = () => {
      if (destroyed) {
        return
      }
      requestAnimationFrame(animate)
      stats.begin()
      onRender()
      render()
      stats.end()
    }
    animate()

    return {
      scene,
      render,
      addCube,
      camera,
      canvasDomElement: renderer.domElement,
      destroy() {
        destroyed = true
        while (scene.children.length > 0) {
          scene.remove(scene.children[0])
        }
        document.body.removeChild(stats.dom)
      },
    }
  },
}
