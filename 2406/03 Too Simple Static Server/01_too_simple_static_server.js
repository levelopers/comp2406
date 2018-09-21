/*
"TOO SIMPLE HTTP SERVER"
First attempt at an HTTP static server.
It simply reads the contents of the requested file and sends that
contents to the client.

Here our node server does not try to analyse the url to "route" the requests,
it simply serves whatever files happen to be in the ROOT_DIR directory.

This is pretty much how you would set things up with an apache http server.
It's too simple because no attempt is made to correctly set the
the content type for the client response.

See what goes wrong when you visit http://localhost:3000/06externalCSS.html


Use browser to view pages at http://localhost:3000/01index.html.
*/


const http = require('http') //needed for http communication
const fs = require('fs') //needed to read static files
const url = require('url') //helpful module to parse url string


const ROOT_DIR = 'html' //dir for our static files

http.createServer(function (request,response){
     let urlObj = url.parse(request.url, true, false)
     console.log("PATHNAME: " + urlObj.pathname)
     console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)

	 //asynchronous file read
     fs.readFile(ROOT_DIR + urlObj.pathname, function(err,data){
       if(err){
          console.log('ERROR: ' + JSON.stringify(err))
          response.writeHead(404)
          response.end(JSON.stringify(err))
          return
         }
         response.writeHead(200, {'Content-Type': 'text/html'})
         response.end(data)
       })

 }).listen(3000)

console.log('Server Listening on port: 3000  CNTL-C to quit')
console.log('To Test:')
console.log('http://localhost:3000/01index.html')
console.log('http://localhost:3000/02index.html')
console.log('try other pages in html directory')
