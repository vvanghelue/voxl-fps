const express = require('express')
const app = express()

app.use(
	'/3d-assets', 
	(req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	},
	express.static(__dirname + './assets')
)

app.listen(8811)