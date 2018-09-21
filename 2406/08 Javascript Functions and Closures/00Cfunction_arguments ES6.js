/*
ES6 provides default parameter values and spread operator
*/

//ES6 allows default values for functions
function sum(x = 10, y = 100) {
  return x + y
}

console.log(sum(7)); //107
console.log(sum(undefined, 50)); //60 //undefined means absense of argument

//ES6 Rest parameters (must be the last parameter)
function sayLine(actor, ...words) {
  console.log(Array.isArray(words));
  console.log(actor + " : " + words); //ES5
  console.log(`${actor} : ${words}`); //alternative way ES6
}
sayLine("Clint", "Well punk", "go ahead", "make my day.");
/*
Clint : Well punk,go ahead,make my day.
Clint : Well punk,go ahead,make my day.
*/

//Spread operator ...
function add(x, y, z) {
  return x + y + z;
}

var values = [1, 2, 3, 4, 5];
//ES5: apply
console.log(add.apply(null, values)); //6
//ES6: spread operator with functions
console.log(add(...values)); //6

//Spread operator with Arrays
var contents = ['Am7', 'D7', 'Gmaj7', 'C', 'Fm'];
var xml = ['<chords>', ...contents, '</chords>'];
console.log(xml);
/*
[ '<chords>', 'Am7', 'D7', 'Gmaj7', 'C', 'Fm', '</chords>' ]
*/