const http = require('http')
const url = require('url')
const fs = require('fs')
const Root_dir = 'html'

//export chord pro format files

const extension_type = {
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

let songs = {
  "Peaceful Easy Feeling": "./songs/Peaceful Easy Feeling.txt",
  "Sister Golden Hair": "./songs/Sister Golden Hair.txt",
  "Brown Eyed Girl": "./songs/Brown Eyed Girl.txt",
  "x" : "./songs/Sister Golden Hair.txt",
  "Never My Love" : "./songs/Never My Love.txt"
};


// write header based on reqired file extension
const get_extension = function(fileName){
  for(let x in extension_type){ //for in loop in object : take attributes name as strings
    if (fileName.indexOf(x,fileName.length-x.length)!==-1) {
      return extension_type[x]
    }
  }
  return extension_type.txt
}



//create Server
http.createServer(function (req,res) {
  let urlObj = url.parse(req.url,true,false)

  console.log('URL pathname : ' + urlObj.pathname);
  console.log('request directory : ' + Root_dir + urlObj.pathname);
  console.log('request method : ' + req.method);
  console.log(`////////////////////////////////////////////////`);

//handle data and send back data
    let userData = ``

    //data event handle
    req.on("data",function (chunk) {
      userData+= chunk //text input text
    })

    //end event handle
    req.on("end",function () {

      //show userData
      console.log(`user data : ${userData}`);

      //POST METHOD : handle userdata, response to browser
      if (req.method==`POST`) {
        //parse JSON data
        let dataObj = JSON.parse(userData)
        console.log(`server received dataObj : ${dataObj}`);
        console.log("USER REQUEST: " + dataObj.text)


        //send back to browser
        let sendBackObj = {}


        if (dataObj.usage=='saveFile') { //.usage .title .wordArray

          fs.writeFile(`./songs/${dataObj.title}.txt`,dataObj.content,(err)=>{
            if (err) {
              console.log(err);
            }
            songs[dataObj.title] = `./songs/${dataObj.title}.txt`
            sendBackObj.text = 'done'

            res.writeHead(200,{"Content-Type" : extension_type["json"]})
            res.end(JSON.stringify(sendBackObj))

            console.log(`RETURN OBJECT :` + JSON.stringify(sendBackObj))
          })
        }

        if (songs.hasOwnProperty(dataObj.text)) {

        fs.readFile(songs[dataObj.text],function (err,data) {
          if (err) throw err

          sendBackObj.wordArray = data.toString().split('\n')

          res.writeHead(200,{"Content-Type" : extension_type["json"]})
          res.end(JSON.stringify(sendBackObj))

          console.log(`RETURN OBJECT :` + JSON.stringify(sendBackObj))

        })

        }
        //   //if no song send back input text
        //   sendBackObj.userText = dataObj.text
        //   console.log(`RETURN OBJECT :` + JSON.stringify(sendBackObj))
        //
        // //write head and end
        // res.writeHead(200,{"Content-Type" : extension_type["txt"]})
        // res.end(JSON.stringify(sendBackObj))
      }

      //GET METHOD : read files
      if (req.method=='GET') {
        //read file get data
        let filePath = Root_dir + urlObj.pathname
        if (urlObj.pathname=='/') {
           filePath = Root_dir + '/index.html'
        }
        fs.readFile(filePath,function (err,data) {
          //handle readfile err
          if (err) {
            console.log("ERROR : " + JSON.stringify(err));
            res.writeHead(404,)
            res.end(err)
            //break read file
            return
          }
          //otherwise read file, get data
          res.writeHead(200,{'Content-Type' : get_extension(filePath)})
          res.end(data)
        })// read file
      }// GET
    })//req.end
}).listen(3000)

//print create Server
console.log(`SERVER IS RUNNING AT PORT 3000`);
console.log(`TO TEST GO http://localhost:3000/`);
