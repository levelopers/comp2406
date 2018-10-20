

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
  ball1.x_speed = Number(v1x).toFixed(6)
  ball1.y_speed = Number(v1y).toFixed(6)
  ball2.x_speed = Number(v2x).toFixed(6)
  ball2.y_speed = Number(v2y).toFixed(6)


// console.log(ball2);

// return ball1,ball2

}

let ball1 = {
  x:50,
  y:100,
  x_speed:5,
  y_speed:-5
}

let ball2 = {
  x:50,
  y:50,
  x_speed:0,
  y_speed:0
}

ballCollision(ball1,ball2)
console.log(ball1,ball2);
