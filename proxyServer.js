const webpack = require('webpack')
const opn = require('opn')
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
app.use(express.static(path.resolve(__dirname, 'dist', '../')))

app.use((req, res, next) => {
    let url = req.url
    var arr = url.match(/\w+(_\w+)\.js$/, (match, p1, p2) => {
        return p1
    })
    if(arr && arr[1]) {
        url = url.replace(arr[1], '').replace('/wechat/', '')
    }
    if(fs.existsSync(url)) {
        res.redirect('http://localhost/' + url)
    }
    next()
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})

const compiler = webpack(require('./webpack.config.dev.js'))

process.nextTick(() => {
    compiler.watch({}, (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return
        }
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true // Shows colors in the console
        }))
    })
    process.nextTick(() => {
        opn('http://localhost/dist')
    })
})
