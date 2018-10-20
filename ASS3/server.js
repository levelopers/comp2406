const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 3000

app.listen(PORT)


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

function get_mine(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext,filename.length-ext.length)!==-1) {
      return MIME_TYPES[ext]
    }
  }
return MIME_TYPES['txt']
}


const ROOT_DIR = "html"
//handle req and res
function handler(request,response) {
    let urlObj = url.parse(request.url,true,false)

    console.log(`REQUEST URL PATH : ${urlObj.pathname}`);
    console.log(`REQUEST DIRECTORY : ${ROOT_DIR+urlObj.pathname}`);
    console.log(`REQUEST METHOD : ${request.method}`);

    let receivedData = ""

    request.on("data",function (chunk) {
      receivedData += chunk
    })

    request.on("end",function () {
      console.log(`REQUEST END`);
      console.log(`receivedData : ${receivedData}`);
      console.log(`type : ${typeof receivedData}`);

      if (request.method=="GET") {

        if (urlObj.pathname === "/") {
          urlObj.pathname += "index.html"
        }

        fs.readFile(ROOT_DIR+urlObj.pathname,function (err,data) {
          if (err) {
            console.log(err);
            response.writeHead(404)
            response.end(JSON.stringify(err))
          }

          response.writeHead(200,{
            "Content-Type" : get_mine(urlObj.pathname)
          })

          response.end(data)
        })
      }


    })//request end

}//end handler



io.on("connection",function (socket) {

  socket.on("ballOBJ",function (data) {//ball coor
    console.log(data);
    io.emit("ballOBJ",data)
  })


})


console.log("Server Running at PORT: 3000  CNTL-C to quit")
console.log("To Test:")
console.log("Open several browsers at: http://localhost:3000/")
