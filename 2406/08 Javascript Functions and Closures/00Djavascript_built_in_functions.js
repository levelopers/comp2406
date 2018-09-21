/* Javascript ES5/ES6 has some built-in global functions

parseInt() //parse strings into ints if possible
parseFloat() //parse strings into floats if possible
isNaN() //test if value is "Not a Number"
isFinite() //test if number is finite
encodeURI() //encodes special characters EXCEPT: ,/?:@&=+$#
decodeURI() //reverse of encodeURI
encodeURIComponent() //encodes special characters INCLUDING: ,/?:@&=+$#
decodeURIComponent() //reverse of encodeURIComponent
eval() //evaluate string as javascript code ("eval is evil")
Number(object) //return number representing value of object
String(object) //return string representation of object

//browsers (not javascript itself) also provide an
alert("Hello Word");
function that can be used to open a modal message for the user. (Modal messages block
other processing so should not be used for general UI design, but could
be used for debugging.
*/

console.log('\nparseInt--------------------------------');
console.log(parseInt('42')) //42
console.log(parseInt('Lou42')) //NaN
console.log(parseInt('42Lou')) //42

console.log('\nparseFloat------------------------------');
console.log(parseFloat('42')) //42
console.log(parseFloat('4.2')) //4.2
console.log(parseFloat('4.2Lou')) //4.2
console.log(parseFloat('Lou4.2')) //NaN

console.log('\nisNaN-----------------------------------');
console.log(isNaN(42)) //false
console.log(isNaN('42')) //false
console.log(isNaN(4.2)) //false
console.log(isNaN('Lou')) //true
console.log(NaN === parseInt(42)) //false
console.log(NaN === NaN) //false **this one means we cannot us NaN === x
//to check is x is a valid number

console.log('\nisFinite:-------------------------------');
console.log(isFinite(42)) //true
console.log(isFinite(Infinity)) //false
console.log(isFinite(-Infinity)) //false

console.log('\nencodeURI:-------------------------------');
var uri = "my test.asp?name=ståle&car=saab";
console.log(encodeURI(uri)) // my%20test.asp?name=st%C3%A5le&car=saab
console.log(encodeURIComponent(uri)) // my%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab

console.log('\ndecodeURI:-------------------------------');
var enc = "my%20test.asp?name=st%C3%A5le&car=saab"
console.log(decodeURI(enc)) //my test.asp?name=ståle&car=saab
enc = "my%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab"
console.log(decodeURIComponent(enc)) //my test.asp?name=ståle&car=saab

console.log('\neval:-------------------------------');
var x = 10,
  y = 20;
console.log(eval("x*y")) //200
console.log(eval("2*y + x")) //50

console.log('\nNumber:-------------------------------');
console.log(Number(true)) //1
console.log(Number(false)) //0
console.log(Number(new Date())) //1506726303830  //msec since midnight Jan. 1. 1970 UTC
console.log(Number("42")) //42
console.log(Number("4 2")) //NaN
console.log(Number("Lou")) //NaN

console.log('\nString:-------------------------------');
console.log(String(Boolean(1))) //true
console.log(String(Boolean(0))) //false
console.log(String(new Date())) //Fri Sep 29 2017 19:09:57 GMT-0400 (Eastern Daylight Time)
console.log(String("42")) //42
console.log(String(42)) //42