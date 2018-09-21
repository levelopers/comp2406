// dragNDrop.js
//   Example adapted from: Sebesta "Programming The World Wide Web" 6th ed. chapter 6
//   An example using the DOM 2 Event model
//   Allows the user to drag and drop words defined by HTML, <span> elements

//  In this example the javascript code move all elements that have the
//  same CSS selector as the element being dragged.

//  Define variables for the values computed by 
//  the grabber event handler but needed by mover
//  event handler

//tutorial on setting CSS based styles with javascript
//http://www.kirupa.com/html5/setting_css_styles_using_javascript.htm

      var theElement; //element being dragged
      var currentMouseX, currentMouseY; //cache current mouse location
// *******************************************************

// The event handler function for grabbing the word

function grabber(event) {
//mouse down handler

// Set the global variable for the element to be moved and mouse location
// this uses a DOM 2 feature to ask for event's currentTarget
  currentMouseX =  event.clientX;
  currentMouseY = event.clientY;
  
  theElement = event.currentTarget;

  
  /*
  var theCCSClass = theElement.className; //CCS class selector of element
  console.log(theCCSClass);

  if(theCCSClass != ""){
      var myElements = document.querySelectorAll("." + theCCSClass);
 
     for (var i = 0; i < myElements.length; i++) {
       console.log(myElements[i].innerHTML);
     }
  }
  */


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
 //mouse move handler

// Compute the new position, add the units, and move the word

  //position of element being dragged
  var posX = parseInt(theElement.style.left); 
  var posY = parseInt(theElement.style.top);
  
  //amount that mouse moved since last move event
  var deltaX = event.clientX - currentMouseX;
  var deltaY = event.clientY - currentMouseY;
  
  //new location of mouse
  currentMouseX = event.clientX;
  currentMouseY = event.clientY;
  
  //CCS class selector of element being dragged
  var theCCSClass = theElement.className; //CCS class selector of element
 
  //move all the elements with the same class selector as a whole
  //notice need to add "." in front of class name
  
  if(theCCSClass != ""){
      var myElements = document.querySelectorAll("." + theCCSClass);
 
     for (var i = 0; i < myElements.length; i++) {
       posX = parseInt(myElements[i].style.left);
       posY = parseInt(myElements[i].style.top);
		 
       myElements[i].style.left = (posX + deltaX) + "px";
       myElements[i].style.top = (posY + deltaY) + "px";
     }
  }
  else
  {
	 //move element without CSS class selector
     theElement.style.left = (posX + deltaX) + "px";
     theElement.style.top = (posY + deltaY) + "px";
  }

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of mover

// *********************************************************
// The event handler function for dropping the word

function dropper(event) {
//mouse release handler

// Unregister the event handlers for mouseup and mousemove
// DOM 2 feature

  document.removeEventListener("mouseup", dropper, true);
  document.removeEventListener("mousemove", mover, true);

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of dropper
