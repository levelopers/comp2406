/* Example of javascript nameed function expression

*/

//Using both Variable and Named Function does NOT result in the function name
//being available outside the function.

let fact = function factorial(n) {
  //BASIS CASES:
  if (n < 0) return NaN; //not defined for n<0
  if (n <= 1) return 1;
  //RECURSIVE CASE
  return n * factorial(n - 1);
}


//for(let i=0; i<10; i++) console.log("" + i + "! =" + factorial(i)); //COMPILE ERROR
for (let i = 0; i < 10; i++) console.log("" + i + "! =" + fact(i));
console.log(typeof factorial); //undefined
console.log(typeof fact); //function