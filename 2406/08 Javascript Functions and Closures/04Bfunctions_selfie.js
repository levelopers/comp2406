/* Example of javascript "selfie" function IIFE

Functions can be invoked right after declaration
IIFE: Immediate Invocation of Function Expression.
The javascript function equivalent of a "selfie".

Form is:
(function(){...}());
or
(function(){...})();
both seem to work. The extra outer brackets seem un-needed but are
required for correct evaluation.

function(){...}();
does not work -why would compiler have trouble with this one?

Notice brackets are becoming harder to keep track of
*/

(function() {
  // all your code here
  var x = 100
  var foo = function() {
    x *= 2
  }
  foo()
  console.log(x)
  // ...
})()

// x and foo is unreachable here (it’s undefined)
//Makes it easy to hide detail and not pollute global, or outer, scope
//with functions and variables.
//Since ES5 has no block scope, only function scope this creates a
//"poor-man's" block scope. (not needed in ES6).

//This technique is popular with code that does some initialization
//and then returns a function for the app to use.
//e.g.
// let f = (function(){init stuff...return function(){...})();
// f();
