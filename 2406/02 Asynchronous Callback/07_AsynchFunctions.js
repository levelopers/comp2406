/*
How do we ensure that work gets done in a certain order?

Option: Allow the various callback functions to be passed in as a parameters

This seems awkward since the desired number of callback parameters would
change in different call situations. Attractive though because callback
functions could be anything specified by the invoking code.
*/

function read(callback1, callback2) {
  setTimeout(function() {
    console.log("read data")
    callback1(callback2)
  }, Math.floor((Math.random() * 1000) + 1))
}

function process(callback) {
  setTimeout(function() {
    console.log("process data")
    callback()
  }, Math.floor((Math.random() * 1000) + 1))
}

function output() {
  setTimeout(function() {
      console.log("output data")
    },
    Math.floor((Math.random() * 1000) + 1))
}

read(process, output)
