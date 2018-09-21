/*
Exercise:
What are the implications of swapping line 1 and line 2?
Explain the outcome.
*/

var counter = 100 //line 1

function foo(x) {
  return counter + x
} //line 2

console.log(foo(7))
