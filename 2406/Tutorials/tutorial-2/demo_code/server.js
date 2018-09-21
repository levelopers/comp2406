/*
COMP 2406 (c) LD Nel 2018

Example Server that is prepared to receive GET and POST HTTP requests.
GET requests are handled as a request for a file.
POST requests are expected to contain JSON data in the message body.
*/

/*
Testing: Use browser to view pages at http://localhost:3000/example1.html
Cntl+C in console to stop server.

Application:
When the blue cube is moved with the arrow keys, a POST message will be
sent to the server when the arrow key is released. The POST message will
contain a data string that is the location of the blue cube when the
arrow key was released. The server sends back a JSON string that the client could use
to put down a "waypoint" for where the arrow key was released.

If the client types in the app's text field and presses the "Submit Request" button
a JSON object containing the text field text is send to the
server in a POST message.

Notice in this code we attach an event listener to the request object
to receive data that might come in in chunks -typical of a POST message.
When the request "end" event is posted we look and see if it is a
GET or POST message. In the event of a POST message
the message body data is processed and a response sent back to the client.


Exercise: if the user types the title of a song that the server has,
  the server should send a JSON object back to the client to replace
  the words array in the client app.
*/

//hard coded partial song lyrics to serve client
let peacefulEasyFeeling = []
peacefulEasyFeeling.push({
  word: "I",
  x: 50,
  y: 50
})
peacefulEasyFeeling.push({
  word: "like",
  x: 70,
  y: 50
})
peacefulEasyFeeling.push({
  word: "the",
  x: 120,
  y: 50
})
peacefulEasyFeeling.push({
  word: "way",
  x: 170,
  y: 50
})
peacefulEasyFeeling.push({
  word: "your",
  x: 230,
  y: 50
})
peacefulEasyFeeling.push({
  word: "sparkling",
  x: 300,
  y: 50
})
peacefulEasyFeeling.push({
  word: "earrings",
  x: 430,
  y: 50
})
peacefulEasyFeeling.push({
  word: "lay",
  x: 540,
  y: 50
})

let sisterGoldenHair = []
sisterGoldenHair.push({
  word: "Well",
  x: 50,
  y: 50
})
sisterGoldenHair.push({
  word: "I",
  x: 110,
  y: 50
})
sisterGoldenHair.push({
  word: "tried",
  x: 130,
  y: 50
})
sisterGoldenHair.push({
  word: "to",
  x: 190,
  y: 50
})
sisterGoldenHair.push({
  word: "make",
  x: 220,
  y: 50
})
sisterGoldenHair.push({
  word: "it",
  x: 290,
  y: 50
})
sisterGoldenHair.push({
  word: "Sunday",
  x: 320,
  y: 50
})

let brownEyedGirl = []
brownEyedGirl.push({
  word: "Hey",
  x: 40,
  y: 50
})
brownEyedGirl.push({
  word: "where",
  x: 100,
  y: 50
})
brownEyedGirl.push({
  word: "did",
  x: 180,
  y: 50
})
brownEyedGirl.push({
  word: "we",
  x: 220,
  y: 50
})
brownEyedGirl.push({
  word: "go",
  x: 260,
  y: 50
})
brownEyedGirl.push({
  word: "Days",
  x: 40,
  y: 100
})
brownEyedGirl.push({
  word: "when",
  x: 110,
  y: 100
})
brownEyedGirl.push({
  word: "the",
  x: 190,
  y: 100
})
brownEyedGirl.push({
  word: "rains",
  x: 240,
  y: 100
})
brownEyedGirl.push({
  word: "came",
  x: 320,
  y: 100
})

const songs = {
  "Peaceful Easy Feeling": peacefulEasyFeeling,
  "Sister Golden Hair": sisterGoldenHair,
  "Brown Eyed Girl": brownEyedGirl
};
// for (var s in songs) {
//   for (var i = 0; i < songs[s.toString()].length; i++) {
//     console.log(songs[s.toString()][i].word);
//   }
// }
//Server Code
const http = require("http"); //need to http
const fs = require("fs"); //need to read static files
const url = require("url"); //to parse url strings

const ROOT_DIR = "html"; //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

const get_mime = function(filename) {
  //Use file extension to determine the correct response MIME type
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

http.createServer(function(request, response) {
  var urlObj = url.parse(request.url, true, false)
  console.log("\n============================")
  console.log("PATHNAME: " + urlObj.pathname)
  console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
  console.log("METHOD: " + request.method)

  var receivedData = ""

  //Event handlers to collect the message data
  request.on("data", function(chunk) {
    receivedData += chunk;
  })

  //Event handler for the end of the message
  request.on("end", function() {
    console.log("received data: ", receivedData)
    console.log("type: ", typeof receivedData)

    //if it is a POST request then echo back the data.
    if (request.method == "POST") {
      //Handle POST requests
      var dataObj = JSON.parse(receivedData)
      console.log("received data object: ", dataObj)
      console.log("type: ", typeof dataObj)
      //Here we can decide how to process the data object and what
      //object to send back to client.
      //FOR NOW EITHER JUST PASS BACK AN OBJECT
      //WITH "text" PROPERTY

      //TO DO: return the words array that the client requested
      //if it exists

      console.log("USER REQUEST: " + dataObj.text)
      var returnObj = {}



      if (songs.hasOwnProperty(dataObj.text)) {
        returnObj.text = "FOUND: ";
        returnObj.content = songs[dataObj.text];
      } else {
        returnObj.text = "NOT FOUND: " + dataObj.text
      }

      console.log(`RETURN OBJECT :` + returnObj.text);




      //object to return to client
      response.writeHead(200, {
        "Content-Type": MIME_TYPES["txt"]
      })
      response.end(JSON.stringify(returnObj)) //send just the JSON object as plain text
    }

    if (request.method == "GET") {
      //Handle GET requests
      //Treat GET requests as request for static file
      var filePath = ROOT_DIR + urlObj.pathname
      if (urlObj.pathname === "/") filePath = ROOT_DIR + "/index.html"

      fs.readFile(filePath, function(err, data) {
        if (err) {
          //report error to console
          console.log("ERROR: " + JSON.stringify(err))
          //respond with not found 404 to client
          response.writeHead(404)
          response.end(JSON.stringify(err))
          return
        }
        //respond with file contents
        response.writeHead(200, {
          "Content-Type": get_mime(filePath)
        })
        response.end(data)
      })
    }
  })
}).listen(3000)

console.log("Server Running at PORT 3000  CNTL-C to quit")
console.log("To Test:")
console.log("http://localhost:3000/example1.html")
