 import java.util.Vector;
import java.util.Enumeration;
import java.util.Random;
import java.math.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.io.*;

class CollisionSet {
   //This class represents a set of collisions between two Balls
   //Duplicate collisions are not added
   //Collisions are removed if the Balls are no longer touching
   //or both Balls have stopped moving
   //This class handles the redirecting the Balls that collide using the 
   // handleCollision() method


   private Vector collisions;

   CollisionSet() {collisions = new Vector();}

   public void add(Collision c) {
     boolean found = false;
     for(int i =0; i < collisions.size(); i++) 
        if( c == ((Collision) collisions.elementAt(i)) ) found = true;
        
     if( found == false ) { //don't handle same collision twice
         collisions.add(c); 
         //System.out.println("collision added");
         handleCollision(c); //redirect the colliding Balls

       }
       
   }


	// answer if two Balls are touching
        public boolean isTouching(Ball s, Ball aBall) {
          Point p = s.getLocation();
            int distance = (p.x - aBall.getLocation().x) * (p.x - aBall.getLocation().x) +
                           (p.y - aBall.getLocation().y) * (p.y - aBall.getLocation().y);
            if ((distance <= 4*(Ball.RADIUS * Ball.RADIUS)) && (aBall != s) )
                return true;

           return false;
        }

  
  public void add(Ball s1, Ball s2) {
    if( !includes(s1,s2) )add(new Collision(s1,s2) );
    }

  boolean includes(Collision c) {
     //answer if set already contains collision c, false otherwise
     for(int i =0; i< collisions.size(); i++) 
        if( c == ((Collision) collisions.elementAt(i)) ) return true;  
     return false; 
  }

  boolean includes(Ball s1, Ball s2) {
  //answer whether set currently has a collision between s1 and s2
     
     for(int i =0; i<collisions.size(); i++){
        Collision c = (Collision) collisions.elementAt(i); 
        if( c.includes(s1) && c.includes(s2) ) return true; 
        } 
     return false; 
  }
   
  public void removeOldCollisions() {
     //remove collisions if the Balls are no longer touching or
     //both Balls have stopped moving
     
     Collision old = null;
     for(int i =0; i<collisions.size(); i++){
        Collision c = (Collision) collisions.elementAt(i); 
        if( !isTouching(c.Ball1, c.Ball2) ) old = c;
        if( (!c.Ball1.isMoving()) && (!c.Ball2.isMoving()) ) old = c; 
        } 
     if (old != null ) {
       collisions.removeElement(old);
       //System.out.println("collision removed");
       }
  }

   public void handleCollision(Collision c){
         //set the new velocities of the Balls in the collision c
         //Here are simplifying assumptions:
         //Ball 1 moving and strikes Ball2
         //disregard initial motion of Ball 2 --its probably stopped
         //if Ball 1 is going up, both will have upwards final velocity
         //if Ball 1 is going down, both should have downward velocity
         //if Ball 1 is going left it will bounce right & vice vera
         //Using these simplifications we do all the math in one quadrant
         //using absolute values and use Ball 1's initial directions to
         //set the directions for the final velocities

 
         Ball Ball1 = c.Ball1;   //assume c.Ball1 is the moving Ball
         Ball Ball2 = c.Ball2;

         
         if(!Ball1.isMoving() ) return; //Ball1 must be moving

         double v = Ball1.velocity(); //velocity vector magnitude


         double dx = (double) (Ball2.getLocation().x - Ball1.getLocation().x);
         double dy = (double) (Ball1.getLocation().y - Ball2.getLocation().y);
         dx = Math.abs(dx); //horizontal distance between Balls
         dy = Math.abs(dy); //veritical distance between Balls

         
         double dist12 = Math.sqrt (dx*dx + dy*dy); //dist between Balls
         if (dist12 == 0.0) return; //can do divide by zero

         //determine angle of line of impact with horizontal
         double angle_b = Math.asin(dy/dist12);

         //determine angle of Ball 1 velocity with vertical 
         double angle_d = Math.asin(Math.abs(Ball1.getvx())/v);

         //determine angle of Ball 1 velocity line of impact
         double angle_a = (3.14159/2.0) - angle_b - angle_d;

         //determine angle of Ball 1 departure with horizontal
         double angle_c = angle_b - angle_a;

         double v1, v2; //new velocity vectors;
         v1 = v * Math.abs(Math.sin(angle_a));
         v2 = v* Math.abs(Math.cos(angle_a));

         double v1x,v1y,v2x,v2y;
       
         v1x = v1 * Math.abs(Math.cos(angle_c));
         v1y = v1 * Math.abs(Math.sin(angle_c));
         v2x = v2 * Math.abs(Math.cos(angle_b));
         v2y = v2 * Math.abs(Math.sin(angle_b));

         //set directions based on initial direction of hitting Ball
         //set horizontal directions
         if(Ball1.getvx() > 0){//ball1 is going right
            if(Ball1.getLocation().x < Ball2.getLocation().x) 
                v1x = -v1x;
            else v2x = -v2x;}  
         else {
         	if(Ball1.getLocation().x > Ball2.getLocation().x)
         	  v2x = -v2x;
         	else v1x = -v1x;}

         //set vertical directions
         if(Ball1.getvy() > 0){//ball1 is going right
            if(Ball1.getLocation().y < Ball2.getLocation().y) 
                v1y = -v1y;
            else v2y = -v2y;}  
         else {
         	if(Ball1.getLocation().y > Ball2.getLocation().y)
         	  v2y = -v2y;
         	else v1y = -v1y;}
         
         
         //if(Ball1.getvy() < 0) {v1y = -v1y; v2y = -v2y;} 
        

         Ball1.setvx(v1x); //set new velocities for Balls
         Ball1.setvy(v1y);
         Ball2.setvx(v2x);
         Ball2.setvy(v2y);


   }
}
	