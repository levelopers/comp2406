/* Example of javascript eval function

In javascript functions are first order objects -they
can be treated as data objects.

Code can also be treated as data.
The eval() function will evaluate a string as
though it is source code.
It will compile and run the code.

Notice in this example the dilemma of having
quotation marks within quotation marks.

SIGNIFICANCE: source code can be passed
around as data strings and compiled
and executed at any time within the program.

The program could even write itself --OK now we are
getting out there where the buses don't run!
*/

var first_name = 'Lou'
var last_name = 'Nel'

var codeString1 = "console.log(first_name + \" \" + last_name)"
var codeString2 = "console.log(first_name + ' ' + last_name)"

eval(codeString1)
eval(codeString2)
