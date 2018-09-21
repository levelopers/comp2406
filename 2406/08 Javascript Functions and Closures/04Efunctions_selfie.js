/*
Example of javascript functions re-writing themselves

This examples shows a function re-writing itself.
Each time the function runs it rewrites itself.
*/

function f() {
  console.log("initialize")
  f = function() {
    console.log("run")
    f = function() {
      console.log("stop")
    }
  }
}

f() //initialize
f() //run
f() //stop