/* Example of javascript eval function

WARNING: eval() is considered dangerous in general
because it leaves the code more open to malicious injection.

Injection occurs when we expect a client to provide data
and they give us code instead.

"Eval is Evil"
*/

function f(x, y) {
  console.log("" + x + " " + y)
}

//make a string that looks like code examples
var codeString = "f('Lou','Nel'); f('Bobby','Sue')"
eval(codeString)
//Lou Nel
//Bobby Sue

codeString = "var n = 'John'; f(n,'Smith');"
eval(codeString)
//John Smith

var string1 = "function f(){console.log('running f');}; f();"
eval(string1)
//running f

//multiple statements
var string2 = "var name = 'Sam';"
var string3 = "console.log(name)"
eval(string2)
eval(string3)
//Sam
