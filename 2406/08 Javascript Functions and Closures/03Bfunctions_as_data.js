/* Javascript Functions as Objects

Functions are javacript objects and can have properties added to them.
Can you think of why you might want to do this.

Basically functions are just like any other javascript object
with one exception: they have a () invocation operator that
other objects don't have.
*/

function f(n) {
  let sum = 0
  for (let i = 0; i < n; i++)
    sum += i
  return sum
}

f.email = "ldnel@carleton.ca"
f.times10 = function(n) {
  return n * 10
}

console.log(f)
console.log(f(5))
console.log(f.email)
console.log(f.times10(5))