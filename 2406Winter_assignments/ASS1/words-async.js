const fs = require('fs');

if (process.argv.length<4) {
  console.log(`try this : node words-sync.js fileRead.txt fileWrite.txt`);
}

let fileRead = process.argv[2]
let fileWrite = process.argv[3]

let rawContent = fs.readFile(fileRead,'utf-8',(err,data)=>{
  if (err) throw error

  let array = data.split(/[\W]/).filter(Boolean)
  array.sort()
  let str = array.join('\n')
  
  fs.writeFile(fileWrite,str,'utf-8',(err)=>{
    if (err) throw error
    console.log('file has been saved!!');
  })


})
// console.log(array);

// console.log(str);
