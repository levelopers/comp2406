/* Example of javascript function closures

Here is a summary of javascript function closures:

-Functions have access to the variables that were
in scope when the function was defined. Even if that
scope is no longer the current scope when the function is run.

-Functions can update variables that were in scope
when they were defined. Even if that scope is on longer
the current scope.


*/

let outer = 1000;

function make() {
  let local = 100
  return function(x) {
    temp = local
    local *= 2
    return x + outer + temp;
  }
}

let action = make()

console.log(action(8)) //1108
console.log(action(8)) //1208
