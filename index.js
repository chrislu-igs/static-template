var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var path = require('path')

// 服務當前目錄
var serveMain = serveStatic('./public', { index: false, setHeaders })


// Set header to force download
function setHeaders(res, path) {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Access-Control-Allow-Origin', '*')
}

// Create server
var server = http.createServer(function onRequest(req, res) {
  serveMain(req, res, finalhandler(req, res))
})

// Listen
server.listen(3001)
console.log('可以用此網址顯示圖片: http://localhost:3001/')
