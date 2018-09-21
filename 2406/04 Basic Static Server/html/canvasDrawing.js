/*

Javasript to handle mouse dragging and release
to drag a string around the html canvas

*/

var x = 20, y=80; //location of word
var deltaX, deltaY; //location where mouse is pressed

var drawCanvas = function(canvasID){

var canvas = document.getElementById(canvasID),
    context = canvas.getContext('2d');
	
context.fillStyle = 'white';
context.fillRect(0,0,canvas.width,canvas.height); //erase canvas
   
context.font = '30pt Arial';
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';

var date = Date().toString();
context.fillText(date, x, y);
context.strokeText(date, x, y);

								   
context.beginPath();
context.arc(canvas.width/2, //x co-ord
            canvas.height/2, //y co-ord
			canvas.height/2 - 5, //radius
			0, //start angle
			2*Math.PI //end angle
			);
context.stroke();
}

var handleMouseDown = function(event){
	console.log("mouse down");
	deltaX = x - event.clientX; 
	deltaY = y - event.clientY;
	document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mouseup", handleMouseUp, true);

// Stop propagation of the event and stop any default 
//  browser action

    event.stopPropagation();
    event.preventDefault();
	
	drawCanvas('canvas1');
	}
	
var handleMouseMove = function(event){
	console.log("mouse move");
	x = event.clientX + deltaX;
	y = event.clientY + deltaY;
	event.stopPropagation();
	drawCanvas('canvas1');
	}
var handleMouseUp = function(event){
	console.log("mouse up");
	x = event.clientX + deltaX;
	y = event.clientY + deltaY;
  
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
	
	event.stopPropagation();
	
	drawCanvas('canvas1');
	}

drawCanvas('canvas1');
