import * as THREE from 'three'

const Team = ({ name, spawnPoints }) => {
  if (!name) {
    throw new Error('Team should have a name')
  }
  if (!spawnPoints) {
    throw new Error('Team should have a spawn points')
  }
}

export default () => {
  let name = 'Level 001'
  let teams = [
    Team({ name: 'team 1', spawnPoints: [new THREE.Vector3(20, 0, 0)] }),
    Team({ name: 'team 2', spawnPoints: [new THREE.Vector3(-20, 0, 0)] }),
  ]

  let cubes = [
    { size: 1, position: new THREE.Vector3(0, 0.5, 0) },
    { size: 1, position: new THREE.Vector3(0, 1.5, 0) },
    { size: 1, position: new THREE.Vector3(1, 0.5, 0) },
    { size: 1, position: new THREE.Vector3(-1, 0.5, 0) },
  ]

  const loadFromJSON = () => {}

  const saveAsJSON = () => {
    teams
  }

  return {
    loadFromJSON,
    saveAsJSON,
    getCubes() {
      return cubes
    },
  }
}
