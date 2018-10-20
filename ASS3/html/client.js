

const window_width  = window.innerWidth
const window_height = window.innerHeight
const startX = 800
const startY = 600
const ball_radius = 15 //actual radius


let allBalls = [
  {name:`ball1`,x:startX+ball_radius, y:startY-ball_radius, x_speed:0, y_speed:0, direction:[0,0]},
  {name:`ball2`,x:startX + ball_radius, y:505, x_speed:0, y_speed:0, direction:[0,0]},
  {name:`ball3`,x:startX+100, y:37, x_speed:0, y_speed:0, direction:[0,0]},
  {name:`ball4`,x:startX+150, y:37, x_speed:0, y_speed:0, direction:[0,0]},
  {name:`ball5`,x:startX+175, y:37, x_speed:0, y_speed:0, direction:[0,0]}


] //array of object

let selectedBall //one word object
let hit_ball
let deltaX, deltaY //mouseX - word.x
let x_speed = 0
let y_speed = 0






function drawCanvas() {





//draw svg background
let container1 = document.getElementById('draw1')

let ball_svg_s = ''
let ball_svg_l = ''

for (ball of allBalls) {
  ball_svg_s += `<ellipse   rx=${ball_radius-5}  cy=${ball.y} cx=${ball.x} stroke-width="5" stroke="grey" fill="red" />`
  if (ball.y<200) {
    ball_svg_l += `<ellipse   rx=${(ball_radius-5)*3}  cy=${ball.y*3} cx=${(ball.x-startX)*3} stroke-width="15" stroke="grey" fill="red" />`
  }
}
//draw canvas
//600*600
//200*500
  container1.innerHTML = `<svg id = "svg"xmlns = "http://www.w3.org/2000/svg" width = ${window_width} height = ${window_height}>

  <ellipse   rx="225" id="svg_1" cy="300" cx="300" stroke-width="75" stroke="blue" fill="#fff"/>
  <ellipse   rx="75" id="svg_2" cy="300" cx="300" stroke-width="75" stroke="red" fill="#fff"/>

  <ellipse   rx="75" id="svg_3" cy="100" cx=${startX+100} stroke-width="25" stroke="blue" fill="#fff"/>
  <ellipse   rx="25" id="svg_4" cy="100" cx=${startX+100} stroke-width="25" stroke="red" fill="#fff"/>
  <line  id="svg_5" y2=${startY} x2=${startX} y1="0" x1=${startX} stroke-width="1.5" stroke="#000" fill="none"/>
  <line  id="svg_6" y2=${startY} x2= ${startX+200} y1=${startY} x1=${startX} stroke-width="1.5" stroke="#000" fill="none"/>
  <line  id="svg_5" y2=${startY} x2=${startX+200} y1="0" x1=${startX+200} stroke-width="1.5" stroke="#000" fill="none"/>
  ${ball_svg_s}
  ${ball_svg_l}
  </svg>`;



}

//return ball object
function getBall(mouseX,mouseY) {
  for (var i = 0; i < allBalls.length; i++) {
      let ball = allBalls[i]
      // console.log(ball);
     if((mouseX > ball.x - ball_radius && mouseX < ball.x + ball_radius)
          &&(mouseY> ball.y-ball_radius && mouseY < ball.y+ball_radius
          )) {
        return ball

        console.log('select : '+JSON.stringify(allBalls[i]))
      }

  }
  return null
}//end getBall


function handleMouseDown(e) {

  console.log("mouse down:" + e.pageX + ", " + e.pageY)

  selectedBall = getBall(e.pageX, e.pageY)

console.log(selectedBall);

if (selectedBall != null) {
  deltaX = selectedBall.x - e.pageX
  deltaY = selectedBall.y - e.pageY
  //document.addEventListener("mousemove", handleMouseMove, true)
  //document.addEventListener("mouseup", handleMouseUp, true)
  $("#draw1").mousemove(handleMouseMove)
  $("#draw1").mouseup(handleMouseUp)

}


  e.stopPropagation()
  e.preventDefault()

  drawCanvas()
}//end mousedown


function handleMouseMove(e) {

let curr_x = selectedBall.x
let curr_y = selectedBall.y

  selectedBall.x = e.pageX + deltaX
  selectedBall.y = e.pageY + deltaY

 x_speed = selectedBall.x - curr_x
 y_speed = selectedBall.y - curr_y


  e.stopPropagation()

  drawCanvas()
  // isCollision(allBalls[0])
}//end mousemove


function handleMouseUp(e) {

//update ball speed
selectedBall.x_speed = x_speed
selectedBall.y_speed = y_speed






  e.stopPropagation()

  $("#draw1").off("mousemove", handleMouseMove) //remove mouse move handler
  $("#draw1").off("mouseup", handleMouseUp) //remove mouse up handler

  drawCanvas() //redraw the canvas






}//end mouseup



function updateBall(ball) {
  hitBoundary(ball)
  isCollision(ball)

ball.x_speed = ball.x_speed
ball.y_speed = ball.y_speed

  if (Math.abs(ball.y_speed)<1) {
    ball.y_speed=0
  }
  if (Math.abs(ball.x_speed)<1) {
    ball.x_speed=0
  }

  ball.y +=ball.y_speed
  ball.y_speed*=0.95

  ball.x +=ball.x_speed
  ball.x_speed*=0.95


  drawCanvas()
}


function isCollision(movingBall) {
      for (ball of allBalls) {
        if (ball.x_speed!==0||ball.y_speed!==0) {
          continue
        }

        let dist = (movingBall.x-ball.x)*(movingBall.x-ball.x) + (movingBall.y-ball.y)*(movingBall.y-ball.y)
      if (dist>0 && Math.sqrt(dist)<2*ball_radius-5) { //-5 margin
        // console.log(dist);
        hit_ball = ball
        ballCollision(movingBall,hit_ball)
        return true
      }
  }

}//end isCollision

function hitBoundary(movingBall) {


  if (movingBall.x < startX + ball_radius ) {
    movingBall.x_speed = 0
    movingBall.x = startX + ball_radius
  }else if ( movingBall.x > startX + 200 - ball_radius ) {
    movingBall.x_speed = 0
    movingBall.x = startX + 200 -  ball_radius
  }
  if (movingBall.y <ball_radius ) {
    movingBall.y_speed = 0
    movingBall.y = ball_radius
  }

}//end hitBoundary

function ballCollision(ball1,ball2) {//change ball1, ball2 speed

  // double dx = (double) (Ball2.getLocation().x - Ball1.getLocation().x);
  let dx = Math.abs(ball1.x - ball2.x)
  let dy = Math.abs(ball1.y - ball2.y)
  let ball1_v = Math.sqrt(ball1.x_speed*ball1.x_speed + ball1.y_speed*ball1.y_speed)
  //         double dy = (double) (Ball1.getLocation().y - Ball2.getLocation().y);
  //         dx = Math.abs(dx); //horizontal distance between Balls
  //         dy = Math.abs(dy); //veritical distance between Balls
  //
  let dist = Math.sqrt(dx*dx + dy*dy)
  //         double dist12 = Math.sqrt (dx*dx + dy*dy); //dist between Balls
  //         if (dist12 == 0.0) return; //can do divide by zero
  if (dist==0) {
    return
  }
  //         //determine angle of line of impact with horizontal
  //         double angle_b = Math.asin(dy/dist12);
  //
  let angle_b = Math.asin(dy/dist)
  //         //determine angle of Ball 1 velocity with vertical
  //         double angle_d = Math.asin(Math.abs(Ball1.getvx())/v);
  let angle_d = Math.asin(Math.abs(ball1.x_speed)/ball1_v)

  //         //determine angle of Ball 1 velocity line of impact
  //         double angle_a = (3.14159/2.0) - angle_b - angle_d;
  //
  let angle_a = (Math.PI / 2) - angle_b - angle_d;
  //         //determine angle of Ball 1 departure with horizontal
  let angle_c = angle_b - angle_a;

  //         double v1, v2; //new velocity vectors;
  //         v1 = v * Math.abs(Math.sin(angle_a));
  //         v2 = v* Math.abs(Math.cos(angle_a));
  let v1 = ball1_v * Math.abs(Math.sin(angle_a))
  let v2 = ball1_v * Math.abs(Math.cos(angle_a))
  //         double v1x,v1y,v2x,v2y;

  //
  let v1x = v1 * Math.abs(Math.cos(angle_c));
  let  v1y = v1 * Math.abs(Math.sin(angle_c));
  let  v2x = v2 * Math.abs(Math.cos(angle_b));
  let  v2y = v2 * Math.abs(Math.sin(angle_b));
  //
  //         //set directions based on initial direction of hitting Ball
  //         //set horizontal directions
          if(ball1.x_speed > 0){//ball1 is going right
                 if(ball1.x < ball2.x) {
                   v1x = -v1x;

                 }else {
                    v2x = -v2x;
                  }
             }else {

                	if(ball1.x > ball2.x){
                    v2x = -v2x;

                  }else{
                     v1x = -v1x;
                   }
           }
  //
  //         //set vertical directions
          if(ball1.y_speed > 0){//ball1 is going right
                   if(ball1.y < ball2.y) {
                     v1y = -v1y;

                   }else{
                      v2y = -v2y;
                    }
          }else {
                	if(ball1.y > ball2.y){
                    v2y = -v2y;

                  }else{
                     v1y = -v1y;
                   }
           }
  //

          // if(ball1.y_speed < 0) {
          //   v1y = -v1y;
          //   v2y = -v2y;
          // }
  //
  //
  //         Ball1.setvx(v1x); //set new velocities for Balls
  //         Ball1.setvy(v1y);
  //         Ball2.setvx(v2x);
  //         Ball2.setvy(v2y);
ball1.x_speed = v1x
ball1.y_speed = v1y
ball2.x_speed = v2x
ball2.y_speed = v2y

// console.log(ball2);
return
// return ball1,ball2

}








$(document).ready(function() {

  $("#draw1").mousedown(handleMouseDown)
  drawCanvas()

  let moving_timer = setInterval(function () {


  for (ball of allBalls) {



  updateBall(ball)

  }

},30)

// ballCollision(allBalls[0],allBalls[1])
// console.log(allBalls[0],allBalls[1]);
})
