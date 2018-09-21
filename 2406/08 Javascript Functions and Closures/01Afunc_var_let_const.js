/* var, let, and const variables
   function vs block scope


Observations:
ES5 and ES6:
variables declared without var have global scope
variables declared with var have function scope and are hoisted
ES6:
variables declared with let have block scope and are not "hoisted".
(actually they are hoisted to block scope but reference to them before initialization
 is not allowed);
variables declared with const are like those declare with let but
cannot be re-assigned.

Hoisting:
var x = thing;
gets compiled as:
var x = undefined; //hoisted to top of function
x = thing; //assigned where expression occurred.

Because ES5 only has function scope, the bracket structure

(function(){
   var x = 42; //"fake" block scope
})()

is often used to "fake" block scope.
That is, an annonymous function defintion that invokes itself.
*/

var global = 100;

function f(x) { //ES5
  console.log("local: " + local); //allowed because vars are "hoisted"
  if (true) {
    fX = 42;
    var local = 1000;
    console.log("inside f: " + (global + local));
  }
  return global + local + x; //allowed because var have function, not block, scope
}

function g(x) { //ES6
  //console.log("local: " + local); //would be an error
  //variables declared with let are not "hoisted" and have block scope.
  if (true) {
    //console.log(local); not allowed because let variables are not "hoisted"
    let local = 1000;
    console.log("inside g: " + (global + local));
  }
  //return global + local + x;  //not allowed because let variables have block scope
  return global + x; //OK
}


console.log(f(7));
console.log(g(7));
console.log(fX); //allowed because fX not delcared with var or let or const