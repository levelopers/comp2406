/*
Defining the callback as part of the function call
*/
function read(callback) {
  setTimeout(function() {
      console.log("read data")
      callback()
    },
    Math.floor((Math.random() * 1000) + 1));
}

function output() {
  setTimeout(function() {
      console.log("output data")
    },
    Math.floor((Math.random() * 1000) + 1));
}

//Here the function passed to read() has no name.
//How do we keep track that this is the "process" function.

read(function() {
  setTimeout(function() {
      console.log("process data")
      output()
    },
    Math.floor((Math.random() * 1000) + 1));
});
