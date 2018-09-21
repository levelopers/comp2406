/*
Asynch functions with for-loop using var
FOR-LOOPS in javascript using var variables
have caused many problems
*/

console.log("-----------")
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000)
}

//"fixed" for loop based on var
//fixed establishing a closure
console.log("-----------")
for (var i = 0; i < 10; i++) {
  (function(x) {
    setTimeout(function() {
      console.log(x)
    }, 1000)
  })(i)
}

/*
Compare to (ES6) using let variable
*/
console.log("-----------")
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 1000)
}

//GUESS THE OUTPUT
