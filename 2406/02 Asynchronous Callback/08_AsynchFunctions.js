/*
MOST javascript node.js modules provide asynchronous functions that accept
a SINGLE callback parameter. That provides a standard (expected) approach
*/

function read(callback) {
  setTimeout(function() {
      console.log("read data")
      callback()
    },
    Math.floor((Math.random() * 1000) + 1))
}

function process(callback) {
  setTimeout(function() {
      console.log("process data")
      callback()
    },
    Math.floor((Math.random() * 1000) + 1))
}

function output(callback) {
  setTimeout(function() {
      console.log("output data")
      callback()
    },
    Math.floor((Math.random() * 1000) + 1))
}
let callback = ()=>{
  console.log("callback");
}

//HOW WOULD WE INVOKE THESE FUNCTIONS?
read(()=>{
  process(()=>{
    output(()=>{
    callback()
    })
  })
})
