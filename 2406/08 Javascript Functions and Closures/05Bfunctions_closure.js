/* Example of javascript function closures


***Here it is evident that the two functions returned
by make() SHARE the same var local.
They don't each have their own copy
*/

function make() {

  var local = 100;

  var add = function(x) {
    return x + local;
  }
  var set = function(x) {
    local = x;
    return local;
  }
  //return the two functions in a compound object
  return {
    add: add,
    set: set
  };
  //return { "add" : add, "set" : set}; also works
  //return { 'add' : add, 'set' : set}; also works
}

var result = make();

console.log(result.add(1)); //101
console.log(result.set(888)); //888
console.log(result.add(3)); //891