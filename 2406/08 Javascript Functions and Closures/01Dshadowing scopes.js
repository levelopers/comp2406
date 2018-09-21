/* Inner scopes shadow outer scopes

Example from "Elequent Javascript" 2nd ed. by Marijn Haverbeke
http://eloquentjavascript.net/03_functions.html
*/

var x = "outside"

var f1 = function() {
  var x = "inside f1"
}
f1()
console.log(x); // outside

var f2 = function() {
  x = "inside f2"
}
f2()
console.log(x); // inside f2