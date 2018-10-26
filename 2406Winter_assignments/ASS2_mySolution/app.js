

const fs = require('fs');
const http = require('http');
let Console = require('console').Console;
const path = require('path');

let server = http.createServer(handler)

let PORT = process.argv[2] || 3000
let CONFIG = process.argv[3]
const ROOT = `html`


//myconsole to myLogFile
let configObj,logStream,errorPage,myConsole;


let default_configObj = {
  "host": "localhost",
  "port": 3000,
  "index": "/index.html",
}

let MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/text'
};

function get_mime(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return null;
};


//try read config file
try {
  configObj = JSON.parse(fs.readFileSync(CONFIG, "utf-8"));
    //create log file write stream (dist file)
    if (configObj!==undefined) {
      console.log('read config file sueccess!!')
    }
    if (configObj.logfile) {
      logStream = fs.createWriteStream(configObj.logfile)
    }
    if (configObj.errorPage) {
      errorPage = ROOT+'/'+configObj.errorPage
    }
} catch (e) {
  //error1: readfile error
  if (configObj) {
    console.error("Error: reading/parsing.");
  }else {
    //error2: no CONFIG file
    let LogFileName = `myLogFile${new Date().toUTCString()}.log`.replace(/[^A-Za-z0-9]+/g,'-')
    logStream = fs.createWriteStream(LogFileName,{'flags': 'a'})
    console.error("Error: No config file specified, using defaults.")

  }
  configObj = default_configObj
}


function handler(req,res) {
  let dir,url,status

   url = req.url

   myConsole.log(`request method: ${req.method}`);
   myConsole.log(`request url: ${req.url}`)



   //logfile headers
   if (configObj['logged-headers']!==undefined) {
     configObj['logged-headers'].forEach((header)=>{
       if (req.headers[header]) {
         myConsole.log(`request headers '${header}' info: ${req.headers[header]}`)
       }
     })
   }

   //redirct url by looking in config file
   if (configObj.aliases!==undefined) {
     if (configObj.aliases.hasOwnProperty(url)) {
       let original_url = url
       url = configObj.aliases[url]
       myConsole.log(`from ${original_url} redirct to ${url}`)
     }
   }


   //redirct url '/'
   if (url==='/') {
       dir = ROOT + configObj['index']
   }else {
     dir = ROOT+ url
     myConsole.log(`request directory: ${dir}`)
   }


   //check lucky status code
   if (dir.indexOf('lucky')!==-1) {
     status = 777
   }else {
     status = 200
   }
   myConsole.log(`status code:${status}`)

   // check file exists
   fs.exists(dir,(exists_req)=>{
     if (!exists_req) {
       //check errorpage exists
       fs.exists(errorPage,(exists_err)=>{
         if (exists_err!==undefined) {
           fs.readFile(errorPage,(err,data)=>{
             if(err) throw err
             myConsole.log(`Error! no page found redirect to error page`)
             res.writeHead(status, { "Content-Type": get_mime(errorPage) })
             res.end(data)
           })
         }else {
           myConsole.log(`Error! no errorPage found`)
           res.writeHead(404)
           res.end()
         }
       })
     }else {
       //can find file dir
         fs.readFile(dir, function(err, data) {
           if (err) throw err
           myConsole.log(`sueccess read file: ${dir}`)
           res.writeHead(status, { "Content-Type": get_mime(dir) })
           res.end(data)
         })
     }
   })
}

//if no logStream replace with stdout
if (!logStream) {
  logStream = process.stdout
}
myConsole = new Console(logStream)


server.listen(PORT,()=>{
  return myConsole.log("Server listening at http://" + ":" + PORT)
})
