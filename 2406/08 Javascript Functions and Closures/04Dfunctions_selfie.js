/*
Another Example of javascript function IIFE
*/

(function() {
  function initialize() {
    console.log("...initializing")
  }

  function run() {
    console.log("...running")
  }
  initialize()
  return run
}())()
//...initializing
//...running

//function "selfie" that initializes and starts an application