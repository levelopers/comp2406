
/*
Example of a SYNCHRONOUS file read.
the readFileSync() function blocks (waits) and only returns once the file is read.

See
Node.js v8.x.x API:
https://nodejs.org/dist/latest-v8.x/docs/api/
File System Module fs API:
https://nodejs.org/dist/latest-v8.x/docs/api/fs.html
and more specifically:
https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_readfilesync_path_options

*/

let fs = require('fs')
let buffer = fs.readFileSync('songs/sister_golden_hair.txt')
let array = buffer.toString().split("\n");
for(let i=0; i<array.length; i++) {
    console.log(array[i])
}
console.log("DONE")
