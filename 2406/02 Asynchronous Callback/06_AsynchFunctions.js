/*
All three functions are "Asynchronous" in that their
work gets done at some random time later

How do we ensure that work gets done a certain order?
Option: Embed the next function call within the previous

This option seems very "hard-code". No variability (or parameterization) in what
is going to happen.
*/
function read() {
  setTimeout(function() {
      console.log("read data")
process()
    },
    Math.floor((Math.random() * 1000) + 1)
  )
}

function process() {
  setTimeout(function() {
      console.log("process data")
      output()
    },
    Math.floor((Math.random() * 1000) + 1)
  )
}

function output() {
  setTimeout(function() {
      console.log("output data")
    },
    Math.floor((Math.random() * 1000) + 1)
  )
}

read()
