import java.util.*;
import java.awt.*;
import java.io.*;

//This class represents a Billiard Ball.
public class Ball {
//           ====
	// Here is a class variable to keep track of the radius of the Balls
	public static int	RADIUS = BilliardPanel.TableWidth/20;
	public static int   PocketRadius =  RADIUS*18/10; //make pockets bigger than balls
	public static double friction = .98; //friction factor


	// These are the instance variables
    private Color color; //colour of the Ball center
    boolean moving = false; //indicates if Ball is moving or stopped
    private double x;
    private double y;
    private Point  location = new Point(0,0); //x-y location of the Ball
    //Horizontal and Vertical Velocities
    //vx<0 means left, vx>0 means right; vy<0 means up, vy>0 means down 
    private double vx; //horizontal velocity in pixels/millisecond
    private double vy; //vertical velocity in pixels/millisecond

    //Constructor
	public Ball(Point aPoint, Color ballColor) {
		
        color = ballColor;
		location = aPoint;
		x = location.getX();
		y = location.getY();
		//make the ball stopped
        vx = 0.0;
        vy = 0.0;
        moving = false;

	}

	// The get & set methods
	public Color getColour() { return color; }
    public boolean isCueBall() { return color == Color.white; }
	public Point getLocation() { return location; }
    public int getRadius() { return Ball.RADIUS; }
	public void setLocation(Point aPoint) { 
	     location.x = aPoint.x;
	     location.y = aPoint.y;
	      x = aPoint.getX(); y = aPoint.getY(); }
    public void setLocation(int theX, int theY) { 
        location.x = theX;
        location.y = theY;
        x = location.getX(); 
        y = location.getY();
        }
    public void setMoving(boolean isMoving) { moving = isMoving; }
    public boolean isMoving() {return moving; }
    public double getvx() {return vx;} //get horizontal velocity
    public double getvy() {return vy;} //get vertical velocity
    public void setvx( double v ) {vx = v; moving = ((vx != 0.0) || (vy != 0.0)); }
    public void setvy( double v ) {vy = v; moving = ((vx != 0.0) || (vy != 0.0));}
    public void stop() { vx=0; vy = 0; moving = false; }
    public void changeHorizontalDirection(  ) {setvx(-vx); }
    public void changeVerticalDirection(  ) {setvy(-vy); }
    public void makeDarker(  ) {color = color.darker(); }

    public double velocity() 
    //return the magnitude of the overall velocity 
          {return Math.sqrt ((vx * vx) + (vy * vy));}


    public void advance( int milliseconds) {
    //          =======
    
    //This is the main method used by the timer event handler. It moves
    //the ball based on its current location and velocity
    //It also check for collisions and whether the ball has fallen
    //into a pocket
    
    //move the Ball based on its current velocity and speed
    //and reduce its current speed -due to friction
    //newX = oldX + vx*milliseconds
    //newY = oldY + vy*milliseconds
    //reduce speed by fracton per timer event

           if(moving) {
              //move the Ball
              x = x + (vx*milliseconds);
              y = y + (vy*milliseconds);
              location.x = (int) x;
              location.y = (int) y;

              //adjust the speed by applying friction
              //hard-coded friction factor for now
              
              //distribute friction loss based on horizontal and vertical 
              //velocities
              double absVx = Math.abs(vx);
              double absVy = Math.abs(vy);
              
          
              vx = vx*friction; //slow down due to friction
              vy = vy*friction; //slow down due to friction

               //if the Ball is moving very slowly declare it stopped
              if( (absVx < 0.12) && (absVy < 0.12) ) {
                 moving = false;
                 vx = 0.0; //set velocity to zero
                 vy = 0.0;
              }
              

           }
        }

    private double distanceBetween(Ball n1, Ball n2) {
    //answer the distance between Ball centers

            return Math.sqrt ((double) ((n2.getLocation().x - n1.getLocation().x) *                            (n2.getLocation().x - n1.getLocation().x) +
                           (n2.getLocation().y - n1.getLocation().y) * 
                           (n2.getLocation().y - n1.getLocation().y)));
    }

    private double distanceBetween(Point p1, Point p2) {
    //answer the distance between to points
            return Math.sqrt ((double) ((p2.x - p1.x) *  (p2.x - p1.x) +
                           (p2.y - p1.y) * 
                           (p2.y - p1.y)));
           
    }



	// Draw the ball using the given Graphics object
	public void drawWith(Graphics aPen) {
		    
 					   
	//Draw the colored center of Ball
 	aPen.setColor(color);
	aPen.fillOval(location.x - Ball.RADIUS, location.y - Ball.RADIUS, 
					   Ball.RADIUS * 2, Ball.RADIUS * 2);
					   

    // Draw a black border around the Ball
    aPen.setColor(Color.black);
    aPen.drawOval(location.x - Ball.RADIUS, location.y - Ball.RADIUS, 
					   Ball.RADIUS * 2, Ball.RADIUS * 2);

	}
	
		// Draw the ball using the given Graphics object
	public void drawShadowWith(Graphics aPen) {
		    
 					   
	//Draw the shadow of ball offset 3 pixels
 	aPen.setColor(Color.green.darker().darker().darker());
	aPen.fillOval(location.x - Ball.RADIUS + 4, location.y - Ball.RADIUS + 4, 
					   Ball.RADIUS * 2, Ball.RADIUS * 2);



	}




}