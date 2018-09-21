/* Example of javascript functions

Functions can be created from within other functions
and returned as data (function) objects
*/


function make(n){
   var initial = n
   return function(x){return x + initial}
}

var add100 = make(100)

console.log(add100(8)) //108
console.log(add100(20)) //120
