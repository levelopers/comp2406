/*
COMP 2406 Assignment #1
(c) Louis D. Nel 2018

This is a simple static server for serving the applications files for assignment #1
It is also the POST request handler for song requests and requests to save songs.

The chords and lyric files are parsed only to an array of lines (strings)
and sent to the client.
Data exchanges are done as JSON strings.
*/

/*
Use browser to view pages at http://localhost:3000/assignment1.html

The client, via the text field can request songs
The server has a hardcoded set of song files:
"Peaceful Easy Feeling"
"Sister Golden Hair"
"Brown Eyed Girl"

*/

let songFiles = {
  "Peaceful Easy Feeling": "songs/Peaceful Easy Feeling.txt",
  "Sister Golden Hair": "songs/Sister Golden Hair.txt",
  "Brown Eyed Girl": "songs/Brown Eyed Girl.txt"
}

//Server Code
const http = require("http") //need to http
const fs = require("fs") //need to read and write  files
const url = require("url") //to parse url strings

const ROOT_DIR = "html" //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript", //should really be application/javascript
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mime(filename) {
  //Get MIME type based on extension of requested file name
  //e.g. index.html --> text/html
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true, false);
    console.log("\n============================");
    console.log("PATHNAME: " + urlObj.pathname);
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
    console.log("METHOD: " + request.method);

    var receivedData = "";

    //attached event handlers to collect the message data
    request.on("data", function(chunk) {
      receivedData += chunk;
    });

    //event handler for the end of the message
    request.on("end", function() {
      //Handle the client POST requests
      //console.log('received data: ', receivedData);

      //If it is a POST request then we will check the data.
      if (request.method == "POST") {
        //Do this for all POST messages
        var dataObj = JSON.parse(receivedData);
        console.log("received data object: ", dataObj);
        console.log("type: ", typeof dataObj);
        console.log("USER REQUEST: " + dataObj.text);
        var returnObj = {};
        returnObj.text = "NOT FOUND: " + dataObj.text;
      }

      if (request.method == "POST" && urlObj.pathname === "/fetchSong") {
        //a POST request to fetch a song
        var songFilePath = ""; //path to requested song file
        for (title in songFiles) {
          //console.log(title + " : " + dataObj.text);
          if (title === dataObj.text) {
            songFilePath = songFiles[title];
            returnObj.text = "FOUND";
          }
        }

        //look for the song file in the /songs directory
        if (songFilePath === "") {
          response.writeHead(200, { "Content-Type": MIME_TYPES["json"] });
          response.end(JSON.stringify(returnObj)); //send just the JSON object
        } else {
          //Found the song file
          fs.readFile(songFilePath, function(err, data) {
            //Read song data file and send lines and chords to client
            if (err) {
              returnObj.text = "FILE READ ERROR";
              response.writeHead(200, { "Content-Type": MIME_TYPES["json"] });
              response.end(JSON.stringify(returnObj));
            } else {
              var fileLines = data.toString().split("\n");
              //get rid of any return characters
              for (i in fileLines)
                fileLines[i] = fileLines[i].replace(/(\r\n|\n|\r)/gm, "");
              returnObj.text = songFilePath;
              returnObj.songLines = fileLines;
              returnObj.filePath = songFilePath;
              response.writeHead(200, { "Content-Type": MIME_TYPES["json"] });
              response.end(JSON.stringify(returnObj));
            }
          });
        }
      } else if (request.method == "POST") {
        //Not found or unknown POST request
        var returnObj = {};
        returnObj.text = "UNKNOWN REQUEST";
        response.writeHead(200, { "Content-Type": MIME_TYPES["json"] });
        response.end(JSON.stringify(returnObj));
      } else if (request.method == "GET") {
        //handle GET requests as static file requests
        var filePath = ROOT_DIR + urlObj.pathname;
        if (urlObj.pathname === "/") filePath = ROOT_DIR + "/index.html";

        fs.readFile(filePath, function(err, data) {
          if (err) {
            //report error to console
            console.log("ERROR: " + JSON.stringify(err))
            //respond with not found 404 to client
            response.writeHead(404);
            response.end(JSON.stringify(err))
            return
          }
          response.writeHead(200, { "Content-Type": get_mime(filePath) })
          response.end(data)
        })
      }
    })
  })
  .listen(3000)

  console.log("Server Running at PORT 3000  CNTL-C to quit")
  console.log("To Test")
  console.log("http://localhost:3000/assignment1.html")
