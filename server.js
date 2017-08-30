const http = require('http')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const app = express()
const compiler = webpack(webpackConfig)

// compiler.run((err, stats) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(stats.toString({
//     chunks: false, // Makes the build much quieter
//     colors: true // Shows colors in the console
//   }))
// })

// compiler.watch({}, (err, stats) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//     console.log(stats.toString({
//           chunks: false, // Makes the build much quieter
//           colors: true // Shows colors in the console
//       }))
// })

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true,
  publicPath: webpackConfig.output.publicPath
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  noInfo: true,
  heartbeat: 2000,
  reload: true,
  quiet: true,
  path: '/__webpack_hmr',
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.use('/static', express.static('./static'))

console.log('> Starting dev server...')
// devMiddleware.waitUntilValid(() => {
//   console.log('> Listening at ' + 'localhost:8080' + '\n')
// // when env is testing, don't need open it
// })
var server = http.createServer(app)

server.listen(8080, function() {
  console.log("Listening on %j", server.address());
})