/*javascript has had many semicolon woes.

The language uses "automatic semicolon insertion"
The idea is that it tries to put a semicolon where it thinks
you forgot to put one.

Alternatively, many suggest that semicolons are optional
or that you should never use them when programming in javascript

Google "semicolons in javascript" and you will likely see strongly
differing opinions.
*/

//EXAMPLE 1

function f1(n){
   return n + 4
}

function f2(n){
   return n +
   4
}

function f3(n){
  return n
  + 4
}

function f4(n){
  return
  n + 4
}

console.log("f1: " + f1(5))
console.log("f2: " + f2(5))
console.log("f3: " + f3(5))
console.log("f4: " + f4(5))

//EXAMPLE 2
let i = 0;
[0,1,2,3,4,5].forEach(item => console.log(item))

//this will be an error:
let j = 0
[0,1,2,3,4,5].forEach(item => console.log(item))
