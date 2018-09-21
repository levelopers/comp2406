/* 
Traditional synchronous function calls

The functions return AFTER their work is done.

Execution of the work happens in the
order in which the functions are called.
*/
  
function read() { 
  console.log("read data");
}
function process() { 
  console.log("process data");
}
function output() { 
  console.log("output data");
}
    
read();
process();
output();



