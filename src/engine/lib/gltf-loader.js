import 'three/GLTFLoader'

/*
	USAGE
	
    const secondMesh = await GltfLoader.load({ path: '/assets/editor/spawn2/spawn-point.glb' })
    console.log(secondMesh)
    secondMesh.children[1].geometry.computeVertexNormals()

    secondMesh.position.copy(new THREE.Vector3(0, 0.22, 10))
    world.scene.add(secondMesh)
*/
export default {
	load({ path }) {
		return new Promise((resolve) => {
			const loader = new THREE.GLTFLoader().setPath( path.split('/').slice(0, -1).join('/') + '/' );
			loader.load(path.split('/').slice(-1).join('/'), (gltf) => {
				resolve(
				  	gltf.scene.children.filter(
				  		(i) => {
				  			return !['Camera', 'Light'].includes(i.name)
				  		}
			  		)[0]
				)
			})
		})
	}
}