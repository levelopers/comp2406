/*
Asynch functions with for-loop using let

FOR-LOOPS in javascript using let variables
try to remedy things

FOR-LOOPS in javascript cause many problems
even without Asynch function being used.
*/

var funcs = []
for( let i = 0; i<10; i++){   //<-uses let variable
  funcs[i] = function(){console.log(i)}
}

funcs[0]()
funcs[3]()
funcs[9]()

//GUESS THE OUTPUT
