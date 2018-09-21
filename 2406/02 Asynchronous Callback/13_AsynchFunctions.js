/*
CALLBACK HELL
*/

function read(callback) {
  setTimeout(function() {
    console.log("read data")
    callback()
  }, Math.floor(Math.random() * 1000 + 1))
}

//CALLBACK HELL
//Here we have passed, and chained the definitions of the
//annonymous callback functions.

//GOOD: the invoking code can define whatever chain it wants
//BAD: the invokation requires defining functions "on the spot"
//BAD: the definitions tend to by annonymous -not self commenting

//BAD: Notice how hard it is getting to keep track of the brackets
//What is the best indentation scheme to make this clear?

//You will see a lot of this in node.js javascript programming.

read(function() {
  setTimeout(function() {
    console.log("process data")
    setTimeout(function() {
      console.log("output data")
    }, Math.floor(Math.random() * 1000 + 1))
  }, Math.floor(Math.random() * 1000 + 1))
})
