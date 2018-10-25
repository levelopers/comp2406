const fs = require('fs');

if (process.argv.length<4) {
  console.log(`try this : node words-sync.js fileRead.txt fileWrite.txt`);
}

let fileRead = process.argv[2]
let fileWrite = process.argv[3]

let rawContent = fs.readFileSync(fileRead,'utf-8')
let array = rawContent.split(/[\W]/).filter(Boolean)
// console.log(array);
array.sort()
let str = array.join('\n')
// console.log(str);
fs.writeFileSync(fileWrite,str,'utf-8')
