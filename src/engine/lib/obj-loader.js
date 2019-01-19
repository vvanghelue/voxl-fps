import 'three/OBJLoader'

export default {
	load({ path }) {
		return new Promise((resolve) => {

			var loader = new THREE.OBJLoader();

			// load a resource
			loader.load(
				// resource URL
				path,
				// called when resource is loaded
				function ( object ) {
					resolve(object)
				},
				// called when loading is in progresses
				function ( xhr ) {

					// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

				},
				// called when loading has errors
				function ( error ) {
					throw new Error(error)
				}
			);

		})
	}
}