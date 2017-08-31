const Koa = require('koa')
const app = new Koa();
const common = require('koa-common')
const webpack = require('webpack')

const compiler = webpack(require('./webpack.config.dev.js'))

process.nextTick(() => {
    compiler.watch({}, (err, stats) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true // Shows colors in the console
        }))
    })
})


app.use(common.static(__dirname + '/dist'))

app.listen(3000);