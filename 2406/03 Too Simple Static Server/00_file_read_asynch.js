
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read.

Instead its argument function(err,data) will be called once the file has been read.
function(err,data) is the "call back" function that will be called back
when readFile's task is done.

See
Node.js v6.x.x API:
https://nodejs.org/dist/latest-v6.x/docs/api/
File System Module fs API:
https://nodejs.org/dist/latest-v6.x/docs/api/fs.html
and more specifically:
*/


const fs = require('fs')
fs.readFile('html/sister_golden_hair.txt', function(err, data) {
  if(err) throw err
  let array = data.toString().split("\n")
  for(let i=0; i<array.length; i++) {
    console.log(array[i])
  }
})
console.log("DONE")
