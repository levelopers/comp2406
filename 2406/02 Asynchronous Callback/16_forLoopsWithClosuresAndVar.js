/*
Asynch functions with for-loop using var

FOR-LOOPS in javascript using var variables
have caused many problems even when
no asynch functions are involved.
(Here the problem has to do with closures.)
*/

var funcs = []
for (var i = 0; i < 10; i++) {
  funcs[i] = function() {
    console.log(i)
  }
}

funcs[0]()
funcs[3]()
funcs[9]()

//GUESS THE OUTPUT