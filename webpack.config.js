const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "."),
    port: 5003,
    proxy: {
      "/3d-assets": "http://localhost:5002"
    },
    overlay: true
  },
  devtool: "source-map",
  resolve: {
    alias: {
      'three/GLTFLoader': path.join(__dirname, 'node_modules/three/examples/js/loaders/GLTFLoader.js'),
      'three/SkyShader': path.join(__dirname, 'node_modules/three/examples/js/objects/Sky.js'),
      'three/OrbitControls': path.join(__dirname, 'node_modules/three/examples/js/controls/OrbitControls.js'),
      'three/TrackballControls': path.join(__dirname, 'node_modules/three/examples/js/controls/TrackballControls.js'),

      // ssao stuff
      'three/SSAOShader': path.join(__dirname, 'node_modules/three/examples/js/shaders/SSAOShader.js'),
      'three/CopyShader': path.join(__dirname, 'node_modules/three/examples/js/shaders/CopyShader.js'),
      'three/EffectComposer': path.join(__dirname, 'node_modules/three/examples/js/postprocessing/EffectComposer.js'),
      'three/RenderPass': path.join(__dirname, 'node_modules/three/examples/js/postprocessing/RenderPass.js'),
      'three/ShaderPass': path.join(__dirname, 'node_modules/three/examples/js/postprocessing/ShaderPass.js'),
      'three/MaskPass': path.join(__dirname, 'node_modules/three/examples/js/postprocessing/MaskPass.js'),
      'three/SSAOPass': path.join(__dirname, 'node_modules/three/examples/js/postprocessing/SSAOPass.js'),
      'three/SimplexNoise': path.join(__dirname, 'node_modules/three/examples/js/SimplexNoise.js'),

      'three/UnpackDepthRGBAShader': path.join(__dirname, 'node_modules/three/examples/js/shaders/UnpackDepthRGBAShader.js'),
      'three/DepthLimitedBlurShader': path.join(__dirname, 'node_modules/three/examples/js/shaders/DepthLimitedBlurShader.js'),
      'three/SAOShader': path.join(__dirname, 'node_modules/three/examples/js/shaders/SAOShader.js'),
      'three/SAOPass': path.join(__dirname, 'node_modules/three/examples/js/postprocessing/SAOPass.js'),
      'three/stats': path.join(__dirname, 'node_modules/three/examples/libs/stats.min.js'),

      'three/OBJLoader': path.join(__dirname, 'node_modules/three/examples/js/loaders/OBJLoader.js'),

    }
  },
  plugins:[
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new HtmlWebpackPlugin({
      title: "FPS Game",
      hash: true,
      template: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}