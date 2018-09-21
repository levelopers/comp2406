/* Example of javascript functions

Recursion: Solving a big problem as smaller instances of
the same kind of problem.

E.g. 
n! = n*(n-1)*(n-2)*...*1
//n! expressed as an iteration

OR RECURSIVELY:
n! = n*(n-1)!  BASIS: 1!=1, 0!=1
//n! expressed in terms of (n-1)!

E.g.
Fibonacci Sequence: 1, 1, 2, 3, 5, 8, 13, 21, ...
RECURSIVELY: F(n) = F(n-1) + F(n-2)  BASIS: F(1)=1, F(0) = 1 

In programming recursion would manifest itself 
as a function defined in terms of invoking itself. 
*/

//Named Function
function factorial(n) {
  //BASIS CASES:
  if (n < 0) return NaN; //not defined for n<0
  if (n <= 1) return 1;
  //RECURSIVE CASE   
  return n * factorial(n - 1);
}

//Function Literal Form (Annonymous functions assigned to variable)
let fact = function(n) {
  //BASIS CASES:
  if (n < 0) return NaN; //not defined for n=0
  if (n <= 1) return 1;
  //RECURSIVE CASE   
  return n * fact(n - 1);
}

//let fact = function factorial(){...} //<==WRONG "factorial" won't be recognized
//handled inconsistently by different browsers
for (let i = 0; i < 10; i++)
  console.log("" + i + "! =" + factorial(i));
for (let i = 0; i < 10; i++)
  console.log("" + i + "! =" + fact(i));
console.log(factorial(-1)); //NaN
console.log(typeof factorial); //function
console.log(typeof fact); //function