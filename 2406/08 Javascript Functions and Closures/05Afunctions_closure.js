/* Example of javascript functions

Functions can be declared from within other functions
and returned as data objects (function pointers)

Question: what happens when a function creates another
function that depends on a local variable of the creator?

ISSUE: function make() will no longer be represented on the stack
when action() is run.

SIGNIFICANCE: "Everything you were probably taught in
1st year about how procedure calls work just went bye bye"
*/

var outer = 1000;

function make() {
  var local = 100;
  return function(x) {
    local *= 2;
    return x + local + outer;
  }
}

var action = make();
var action2 = make();

console.log(action(8)); //1208
console.log(action(8)); //1408
console.log(action2(8)); //1208
console.log(action2(8)); //1408