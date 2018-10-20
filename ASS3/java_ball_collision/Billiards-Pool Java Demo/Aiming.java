import java.util.*;
import java.awt.*;
import java.io.*;

//This class represents an aiming on a Ball
//That is, a direction of intended impact
public class Aiming {
//           ====

	// These are the instance variables
    private Ball theBall; //ball being aimed at

    private Point sightPoint; //where we are aiming from

    //Constructor
	public Aiming(Point aPoint, Ball aBall) {
		
        theBall = aBall;
		sightPoint = aPoint;

	}


	// Draw the aiming marks this aiming represents
	public void drawWith(Graphics aPen) {
		    
 					   
					   

    // Draw a black circle around the ball at twice its radius
    aPen.setColor(Color.black);
    aPen.drawOval(theBall.getLocation().x - Ball.RADIUS*2, theBall.getLocation().y - Ball.RADIUS*2, 
					   Ball.RADIUS * 4, Ball.RADIUS * 4);

	
	

 					   
	//Draw the aiming line
 	aPen.drawLine(sightPoint.x, sightPoint.y, 
       sightPoint.x + (theBall.getLocation().x - sightPoint.x) *10, 
       sightPoint.y + (theBall.getLocation().y - sightPoint.y)*10   );


	}




}