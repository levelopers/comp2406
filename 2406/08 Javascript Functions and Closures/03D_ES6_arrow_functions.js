/* Example of javascript => Lambda Functions

ES6 introduces new => functions (Lambda Functions)
Instead of:
function(n){....}
the syntax is:
n => {...}

Instead of:
http.createServer(function (request, response) {...}).listen(3000);
syntax is:
http.createServer((request, response) => {...}).listen(3000);
*/

//visit http://localhost:3000/about.html

const http = require('http')
let counter = 1000 //to count invocations of function(req,res)

http.createServer((request, response) => {
  //var requestURL = request.url;
  //write HTTP header
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  //end HTTP response and provide final data to send
  response.end('Request[' + counter++ + ']' + '\n' +
    'requestURL: ' + request.url + '\n')
}).listen(3000)
console.log('Server Running at PORT 3000  CNTL-C to quit')
