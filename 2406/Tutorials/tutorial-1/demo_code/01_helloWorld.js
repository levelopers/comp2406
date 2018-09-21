/*
Hello World server example:
Serving string to a browser client

To test use Chrome browser to view
http://localhost:3000
Cntl+C to stop server
*/

let http = require('http')
let counter = 1000

http.createServer(function(request, response) {
  //respond to client
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  response.write('Hello\n')
  response.write('World\n')
  //end HTTP response: provide final data and send
  response.end("[" + counter++ + "]\n")
}).listen(3000)

console.log('HTTP Server Running at Port 3000  CNTL-C to quit')
console.log('To Test:')
console.log('Use Chrome browser and visit: http://localhost:3000')
console.log('or equivalently visit: http://127.0.0.1:3000')
