/* Example of javascript function IIFE

Functions can be invoked right after declaration
IIFE: Immediate Invocation of Function Expression.
The javascript function equivalent of a "selfie".
You will see this a lot of this in javascript code.

Form is:
(function(){...}())
or
(function(){...})()
both seem to work.
but not this:
function(){...}();

The extra outer brackets seem un-needed
but are required for correct evaluation.

This appears to be a helpful mechanism to hide things.
That is because functions are the basis to scoping in javascript, not blocks.
Here it is used to make an object with method like functions.
ES5 has no concept of classes used for traditional OO programming.
ES6 has introduced classes and more features for OO programming.
*/

var lightbulb = (function() {
  var isOn = false,
    toggle = function toggle() {
      isOn = !isOn;
      return isOn;
    },
    getState = function getState() {
      return isOn
    },
    off = function off() {
      isOn = false;
      return isOn;
    },
    on = function on() {
      isOn = true;
      return isOn;
    };

  return {
    toggle: toggle,
    getState: getState,
    off: off,
    on: on
  }

}()) //IIFE "selfie"

//later
lightbulb.on()
console.log(lightbulb.getState())
lightbulb.toggle()
console.log(lightbulb.getState())


//Makes it easy to hide detail and not pollute global, or outer, scope
//with functions and variables.
