/*
Is it possible to have a single callback and chain the executions?
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

function output() {
  setTimeout(function() {
      console.log("output data")
      // callback()
    },
    Math.floor((Math.random() * 1000) + 1))
}


// let done = ()=>{
//   console.log("callback");
// }

 //<--- WILL THIS WORK -What is wrong here?
 read(()=>{
   process(()=>{
     output()
   })
 })
