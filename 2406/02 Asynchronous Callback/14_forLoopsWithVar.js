/*
FOR-LOOP HELL: Asynchronous functions with for-loops using var

FOR-LOOPS in javascript using var variables var counter variables
that use asynch functions have caused many problems
*/

//
(function() {
  for (var i = 0; i < 10; i++) {
    setTimeout(function() {
      console.log(i)
    }, 2000)
  }
})()


//GUESS THE OUTPUT