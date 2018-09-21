/* Example of javascript => Lambda Functions

ES6 introduces new => functions (Lambda Functions)
Instead of:
function(n){....}
the syntax is:
n => {...}

Instead of:
function(n) {...}    becomes: n => {...}
function() {...} becomes: () => {...}
function(a,b) {...} becomes: (a,b) => {...}

Arrow functions can have either {} block bodies, or just return expressions:
n => {return n*n} //block body
n => n*n   //return expression

IMPORTANT:
=> functions are always annonymous.
VERY IMPORTANT:
=> functions do not bind to the same "this" object as the
traditional annonymous functions do.
More on this when we investigate the keyword "this" in javascript.
(So => functions are NOT JUST a syntactic convenience)
*/

function square(n) {
  return n * n
}
console.log(`8 squared: ${square(8)}`)

const numbers = [1, 2, 3, 4]

const squares = numbers.map(function(n) {
  return n * n
})
const power2 = numbers.map(n => n * n)

console.log(`${numbers} squared: ${squares}`)
console.log(`${numbers} squared: ${power2}`)
