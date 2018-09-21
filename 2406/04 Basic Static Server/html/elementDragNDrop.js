// dragNDrop.js
//   Example from: Sebesta "Programming The World Wide Web" 6th ed. chapter 6
//   An example to illustrate the DOM 2 Event model
//   Allows the user to drag and drop words defined by HTML, <span> elements

//  In this example the javascript code will identify the DOM element
//  being targeted and modify it's position properties.

//  Define variables for the values computed by 
//  the grabber event handler but needed by mover
//  event handler

      var diffX, diffY, theElement;

// *******************************************************

// The event handler function for grabbing the word

function grabber(event) {

// Set the global variable for the element to be moved
// this uses a DOM 2 feature to ask for event's currentTarget

  theElement = event.currentTarget;

// Determine the position of the word to be grabbed,
//  first removing the units from left and top

  var posX = parseInt(theElement.style.left);
  var posY = parseInt(theElement.style.top);

// Compute the difference between where it is and 
//  where the mouse click occurred

  diffX = event.clientX - posX;
  diffY = event.clientY - posY;

// Now register the event handlers for moving and 
//  dropping the word (DOM 2 feature)
 
  document.addEventListener("mousemove", mover, true);
  document.addEventListener("mouseup", dropper, true);

// Stop propagation of the event and stop any default 
//  browser action

  event.stopPropagation();
  event.preventDefault();

}  //** end of grabber

// *******************************************************

// The event handler function for moving the word

function mover(event) {

// Compute the new position, add the units, and move the word

  theElement.style.left = (event.clientX - diffX) + "px";
  theElement.style.top = (event.clientY - diffY) + "px";

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of mover

// *********************************************************
// The event handler function for dropping the word

function dropper(event) {

// Unregister the event handlers for mouseup and mousemove
// DOM 2 feature

  document.removeEventListener("mouseup", dropper, true);
  document.removeEventListener("mousemove", mover, true);

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of dropper
