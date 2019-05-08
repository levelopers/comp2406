
const window_width = window.innerWidth
const window_height = window.innerHeight
const startX = 800
const startY = 600
const ball_radius = 15 //actual radius

let allBalls = [
  { name: `ball1`, x: startX + ball_radius, y: startY - ball_radius, x_speed: 0, y_speed: 0, direction: [0, 0], color: `red` },
  { name: `ball2`, x: startX + ball_radius, y: 505, x_speed: 0, y_speed: 0, direction: [0, 0], color: `red` },
  { name: `ball3`, x: startX + 100, y: 37, x_speed: 0, y_speed: 0, direction: [0, 0], color: `red` },
  { name: `ball4`, x: startX + 150, y: 100, x_speed: 0, y_speed: 0, direction: [0, 0], color: `yellow` },
  { name: `ball5`, x: startX + 175, y: 200, x_speed: 0, y_speed: 0, direction: [0, 0], color: `yellow` },
  { name: `ball6`, x: startX + 190, y: 300, x_speed: 0, y_speed: 0, direction: [0, 0], color: `yellow` }
] //array of object

let selectedBall //one word object
let hit_ball
let deltaX, deltaY //mouseX - word.x
let x_speed = 0
let y_speed = 0

let socket = io("http://" + window.document.location.host)

function drawCanvas() {
  //draw svg background
  let container1 = document.getElementById('draw1')
  let ball_svg_s = ''
  let ball_svg_l = ''
  for (ball of allBalls) {
    ball_svg_s += `<ellipse   rx=${ball_radius - 5}  cy=${ball.y} cx=${ball.x} stroke-width="5" stroke="grey" fill=${ball.color} />`
    if (ball.y < 200) {
      ball_svg_l += `<ellipse   rx=${(ball_radius - 5) * 3}  cy=${ball.y * 3} cx=${(ball.x - startX) * 3} stroke-width="15" stroke="grey" fill=${ball.color} />`
    }
  }
  //draw canvas
  //600*600
  //200*500
  container1.innerHTML = `<svg id = "svg"xmlns = "http://www.w3.org/2000/svg" width = ${window_width} height = ${window_height}>
  <ellipse   rx="225" id="svg_1" cy="300" cx="300" stroke-width="75" stroke="blue" fill="#fff"/>
  <ellipse   rx="75" id="svg_2" cy="300" cx="300" stroke-width="75" stroke="red" fill="#fff"/>
  <ellipse   rx="75" id="svg_3" cy="100" cx=${startX + 100} stroke-width="25" stroke="blue" fill="#fff"/>
  <ellipse   rx="25" id="svg_4" cy="100" cx=${startX + 100} stroke-width="25" stroke="red" fill="#fff"/>
  <line  id="svg_5" y2=${startY} x2=${startX} y1="0" x1=${startX} stroke-width="1.5" stroke="#000" fill="none"/>
  <line  id="svg_6" y2=${startY} x2= ${startX + 200} y1=${startY} x1=${startX} stroke-width="1.5" stroke="#000" fill="none"/>
  <line  id="svg_5" y2=${startY} x2=${startX + 200} y1="0" x1=${startX + 200} stroke-width="1.5" stroke="#000" fill="none"/>
  ${ball_svg_s}
  ${ball_svg_l}
  </svg>`;
}

//return ball object
function getBall(mouseX, mouseY) {
  for (var i = 0; i < allBalls.length; i++) {
    let ball = allBalls[i]
    // console.log(ball);
    if ((mouseX > ball.x - ball_radius && mouseX < ball.x + ball_radius)
      && (mouseY > ball.y - ball_radius && mouseY < ball.y + ball_radius
      )) {
      return ball
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
  if (isCollision(ball)) {
    let dist_to_hit_ball = (ball.x - hit_ball.x) * (ball.x - hit_ball.x) + (ball.y - hit_ball.y) * (ball.y - hit_ball.y)
    if (Math.sqrt(dist_to_hit_ball) < 2 * ball_radius - 5) {
      let apartSpeed = 1
      ball.x_speed += ball.direction[0] * apartSpeed
      ball.y_speed += ball.direction[1] * apartSpeed
      hit_ball.x_speed += hit_ball.direction[0] * apartSpeed
      hit_ball.y_speed += hit_ball.direction[1] * apartSpeed
    }
  }

  //write direction
  ball.direction = getDirection(ball)

  //speed to coor
  if (Math.abs(ball.y_speed) < 0.98) {
    ball.y_speed = 0
  }
  if (Math.abs(ball.x_speed) < 0.98) {
    ball.x_speed = 0
  }
  ball.y += ball.y_speed
  ball.y_speed *= 0.95
  ball.x += ball.x_speed
  ball.x_speed *= 0.95
  drawCanvas()
}//end updateBall

//return array dirc
function getDirection(ball) {
  //-1 +1
  let dirc = []
  if (ball.x_speed > 0) {
    if (ball.y_speed > 0) {
      dirc = [1, 1]
    } else {
      dirc = [1, -1]
    }
  } else {//x_speed<0
    if (ball.y_speed > 0) {
      dirc = [-1, 1]
    } else {
      dirc = [-1, -1]
    }
  }
  return dirc
}//end getDirection

function hitBoundary(movingBall) {
  if (movingBall.x < startX + ball_radius) {
    movingBall.x_speed = 0
    movingBall.x = startX + ball_radius
  } else if (movingBall.x > startX + 200 - ball_radius) {
    movingBall.x_speed = 0
    movingBall.x = startX + 200 - ball_radius
  }
  if (movingBall.y < ball_radius) {
    movingBall.y_speed = 0
    movingBall.y = ball_radius
  }

}//end hitBoundary

function ballCollision(ball1, ball2) {//change ball1, ball2 speed
  let dx = Math.abs(ball1.x - ball2.x)
  let dy = Math.abs(ball1.y - ball2.y)
  let ball1_v = Math.sqrt(ball1.x_speed * ball1.x_speed + ball1.y_speed * ball1.y_speed)
  if (ball1_v === 0) {//handle error divide 0
    ball1_v += 1e-12
  }
  let dist = Math.sqrt(dx * dx + dy * dy)
  if (dist == 0) {
    console.log("warning!!!");
    return
  }
  let angle_b = Math.asin(dy / dist)
  let angle_d = Math.asin(Math.abs(ball1.x_speed) / ball1_v)//error!!
  let angle_a = (Math.PI / 2) - angle_b - angle_d;
  let angle_c = angle_b - angle_a;
  let v1 = ball1_v * Math.abs(Math.sin(angle_a))
  let v2 = ball1_v * Math.abs(Math.cos(angle_a))
  let v1x = v1 * Math.abs(Math.cos(angle_c));
  let v1y = v1 * Math.abs(Math.sin(angle_c));
  let v2x = v2 * Math.abs(Math.cos(angle_b));
  let v2y = v2 * Math.abs(Math.sin(angle_b));
  //set horizontal directions
  if (ball1.x_speed > 0) {//ball1 is going right
    if (ball1.x < ball2.x) {
      v1x = -v1x;
    } else {
      v2x = -v2x;
    }
  } else {
    if (ball1.x > ball2.x) {
      v2x = -v2x;
    } else {
      v1x = -v1x;
    }
  }
  //set vertical directions
  if (ball1.y_speed > 0) {//ball1 is going right
    if (ball1.y < ball2.y) {
      v1y = -v1y;
    } else {
      v2y = -v2y;
    }
  } else {
    if (ball1.y > ball2.y) {
      v2y = -v2y;
    } else {
      v1y = -v1y;
    }
  }
  ball1.x_speed = v1x
  ball1.y_speed = v1y
  ball2.x_speed = v2x
  ball2.y_speed = v2y
  return
}

socket.on("ballOBJ", function (data) {
  console.log(`received data : ${data}`);
  let dataObj = JSON.parse(data)
  for (ball of allBalls) {
    if (dataObj.name === ball.name) {
      // ball.name = dataObj.name
      ball.x = dataObj.x
      ball.y = dataObj.y
      updateBall(ball)
    }
  }
})

function handleTimer() {//trigger every 100
  let ball_coor = {}
  for (ball of allBalls) {
    if (ball.x_speed !== 0 || ball.y_speed !== 0) {
      ball_coor.name = ball.name,
        ball_coor.x = ball.x,
        ball_coor.y = ball.y,
        //send when exits ball move
        socket.emit("ballOBJ", JSON.stringify(ball_coor))
    }
    updateBall(ball)
  }
}

function isCollision(movingBall) {
  for (ball of allBalls) {
    if (ball.x_speed !== 0 || ball.y_speed !== 0) {
      continue
    }
    let dist = (movingBall.x - ball.x) * (movingBall.x - ball.x) + (movingBall.y - ball.y) * (movingBall.y - ball.y)
    if (dist > 0 && Math.sqrt(dist) < 2 * ball_radius - 5) { //-5 margin
      hit_ball = ball
      ballCollision(movingBall, hit_ball)
      return true
    }
  }
}//end isCollision

$(document).ready(function () {
  $("#draw1").mousedown(handleMouseDown)
  drawCanvas()
  moving_timer = setInterval(handleTimer, 30)
})
