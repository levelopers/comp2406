/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read.

Instead its argument function(err,data) will be called once the file has been read.
function(err,data) is the "call back" function that will be called back
when readFile's task is done.

See
Node.js v8.x.x API:
https://nodejs.org/dist/latest-v8.x/docs/api/
File System Module fs API:
https://nodejs.org/dist/latest-v8.x/docs/api/fs.html
and more specifically:
https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readfile_path_options_callback
*/


let fs = require('fs')
fs.readFile('songs/sister_golden_hair.txt', (err, kk) => {
  if (err) throw err;
  let array = kk.toString().split("\n")
  for (let i = 0; i < array.length; i++) {
    console.log(array[i])
  }
  // console.log(data.toString());
})
console.log("DONE") //Notice when this appears in the output