/*
Idea: Defining the callback as part of the function call
*/
function read(callback) {
  setTimeout(function() {
      console.log("read data");
      callback();
    },
    Math.floor((Math.random() * 1000) + 1));
}

function output() {
  setTimeout(function() {
      console.log("output data");
    },
    Math.floor((Math.random() * 1000) + 1));
}

//idea: pass in the definition of the function when function is called
//notice the function does not necessarily need a name.
//BUT we have still hard coded the call to output()
//can we make the output a defined parameter as well?

read(function process() {
  setTimeout(function() {
      console.log("process data")
      output()
    },
    Math.floor((Math.random() * 1000) + 1));
})

//process(); //What would be wrong with this if uncommented?