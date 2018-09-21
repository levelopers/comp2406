/*
All functions are now asynch.
The read, process, and output functions return right away and
their work gets done some random time in the future.

This simulates how file access and network access actually work:
they take some indeterminate amount of time to complete
the  task (based on when the data arrives).
*/

function read() {
  setTimeout(function() {
      console.log("read");
    },
    Math.floor((Math.random() * 1000) + 1));
}

function process() {
  setTimeout(function() {
      console.log("process");
    },
    Math.floor((Math.random() * 1000) + 1));
}

function output() {
  setTimeout(function() {
      console.log("output");
    },
    Math.floor((Math.random() * 1000) + 1));
}
read();
process();
output();
//BUT WHAT ORDER WILL THE WORK GET DONE?