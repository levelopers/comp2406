/* Example of javascript functions


Much of Javascript's popularity has to do with its rich notion of functions.
These include:

1)Functions are objects (The can be treaded as data: assigned to variables, passed to and
returned from other functions.)

2)Functions support closures (They remember the scope in which they were defined).

However, the various forms of brackets
used with functions can be confusing.

Ex.1: f(){...}

Ex.2: f()

Ex.3: f(){...g(){...}...g()}

Ex.4: f(){...return g(){...}}

Ex.5: f.g()

Ex.6: f(g(){...}){...g()}

Ex.7: (f(){...})()

Ex.8: (f(){...}())

Ex.9: f()()

Ex.10: (f(){}())()

Ex.11: function f(){... f=function(){}}

/*
Exercise: Complete the following code file that explains
what each bracketing configuration means and provide an example of
its use (defintion and invocation).
*/

//Ex.1: f(){...}
//Brackets: how a function is defined.
//Example of Use:
var f = function() {
  console.log("Hello World")
} //definition
f() //invokation

//Ex.2: f()
//Brackets: how a function is invoked.
//Example of Use:
var f = function() {
  console.log("Hello World")
} //definition
f() //invokation
