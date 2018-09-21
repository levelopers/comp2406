/*
Example from Tutorial 01

Shows function is being defined as it is being passed
as a parameter to another function.

Notice the function being created has no formal name.
That is, the function named "createServer" is being passed an annonymous function.
This annonymous function is ofter referred to as a "callback function" as it
is called as an alternative to returning a value.


In javascript anonymous functions are lambda expressions (functions that can be passed
and returned anonymously as data).
(In fact all functions in javascript can act as a lambda expression.)

use browser to view http://localhost:3000/about.html
output should show request url to be: /about.html
we can use this information as the basis or routing
to the desired page
*/

//Cntl+C to stop server

const http = require('http');
const counter = 1000; //to count invocations of function(req,res)

http.createServer(function(request, response) {
  //var requestURL = request.url;
  //write HTTP header
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  //end HTTP response and provide final data to send
  response.end('Request[' + counter++ + ']' + '\n' +
    'requestURL: ' + request.url + '\n');
}).listen(3000);
console.log('Server Running at PORT 3000  CNTL-C to quit');
