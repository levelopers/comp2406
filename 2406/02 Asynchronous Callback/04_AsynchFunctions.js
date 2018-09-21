/*
Asynch function:
The "process" work now gets done asynchronously because it invokes
an asynchronous untiliy function: setTimeout().
This effectively "condems" function process to be an asynch function too

i.e. process() returns right away and some time later
the "process data" work gets done.
*/

function read() {
  console.log("read data");
}

function process() {
  //process calls an asynch function
  setTimeout(function(){console.log("process data");}, 1000);
}

function output() {
  console.log("output data");
}

read();
process();
output();
