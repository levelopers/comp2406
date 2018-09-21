/* Example of javascript functions

Functions are data objects and can be assigned to
variables and passed as arguments to other functions.
Functions are objects of type function.
*/

var counter = 100;

//function definitions can be assignmed to variables
var increment = function(x) {
  return counter += x;
}
var decrement = function(x) {
  return counter -= x;
}

//functions can be passed as arguments
function doAction(anAction, anArg) {
  return anAction(anArg);
}

console.log(doAction(increment, 8)); //108
console.log(doAction(decrement, 2)); //106

console.log(typeof increment); //function
console.log(typeof doAction); //function