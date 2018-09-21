/*
Javascript accepts arguments without defined parameters

*/

function sum(x, y) {
  return x + y
}

console.log(sum(7, 10)) //17
console.log(sum(7, 10, 6, 11)) //17 (additional arguments ignored without error

function showArgs() {
  console.log(typeof arguments); //<--what is arguments
  return arguments;

}
console.log(showArgs(1, 2, 3, true, "Louis"));

/*
object
{ '0': 1, '1': 2, '2': 3, '3': true, '4': 'Louis' }
*/

function sumAll() {
  result = 0
  for (var i = 0; i < arguments.length; i++)
    result = result + arguments[i]
  return result

}
console.log(sumAll(1, 2, 3)) //6
console.log(sumAll(5, 10, 15, 20)) //50
console.log(sumAll(5, 10, 15, 20, "Louis")) //50Louis