/*
Asynch functions with for-loop using let

FOR-LOOPS in javascript using let variables
(ES6) attempt to do this better (as in more what the
programmer might have expected)
*/


for( let i = 0; i<10; i++){
  setTimeout(function() {
    console.log(i)
  }, 1000)
}

//GUESS THE OUTPUT
