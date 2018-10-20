import java.util.Vector;
import java.util.Enumeration;
import java.util.Random;
import java.math.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.io.*;


// This class represents the view of the Curling Frame
public class BilliardPanel extends JPanel implements ActionListener, MouseListener, MouseMotionListener {

	    public static int TableWidth = 300; //long table view width in pixels
        public static int TableHeight = 500;  //long table view length in pixels
        private int OwnerWidth;  //width of the owner frame
        private int OwnerHeight; //height of the owner frame
        public static int Border = TableWidth/10; //Width of table border
        
        //banks which account for ball radius
        private int leftWall = Border + Ball.RADIUS;
        private int top = Border + Ball.RADIUS;
        private int rightWall = TableWidth + Border - Ball.RADIUS;
        private int bottom = TableHeight + Border - Ball.RADIUS;

        private Ball selectedBall = null; //Ball being shot
        private Point cueTip = null; //tip of the shooting cue
        private Point cueEnd = null; //end of the shooting cue
        
        private Vector Balls = new Vector(); //the game Balls
        private Vector DeadBalls = new Vector(); //the balls in the pockets
        private Vector AimingMarks = new Vector(); //aiming marks to draw
        private boolean showTrace = false;  //show trace of balls when true
        private boolean drawTrace = false;  
        private boolean showAiming = false; //show aiming marks when true
        private boolean drawAiming = false;

        public static Vector pockets = new Vector(); //table pockets
        
        private JFrame owner;


        private CollisionSet collisions = new CollisionSet();
        
        int milliseconds = 2; //time between timer events
        Timer timer = new Timer(milliseconds, this); 


	    public BilliardPanel (JFrame parent) {
	
		
                owner = parent; //The frame the panel lives in
                
                setTableSize();
                initialize();
                addEventHandlers();
                timer.start();

                update();
 
	}
	
	private void setTableSize(){
		 	    OwnerWidth = owner.getWidth() ; //table view width in pixels
                OwnerHeight = owner.getHeight();  //table view length in pixels
                Border = OwnerWidth/10; //Width of table border
                TableWidth = OwnerWidth - 2*Border; //width of table not including border
                TableHeight = OwnerHeight - 2*Border -50; //height of table not including border
                leftWall = Border + Ball.RADIUS;
                top = Border + Ball.RADIUS;
                rightWall = TableWidth + Border - Ball.RADIUS;
                bottom = TableHeight + Border - Ball.RADIUS;
                //Border = TableWidth/10; 
                setSize(TableWidth + 2*Border, TableHeight + 2*Border);
                setPreferredSize(new Dimension(TableWidth+2*Border,TableHeight+2*Border) );

	}
	
	
       public void initialize(){
       //initialize the game based on the size of the table
                

              
                drawTrace = false;
                AimingMarks.clear();
                
                //make new table pockets
                //destory the old pockets
                pockets.clear();
                
                pockets.add(new Point(Border,Border)); 
                pockets.add(new Point(Border,(TableHeight+2*Border)/2));
                pockets.add(new Point(Border,TableHeight+Border));
                pockets.add(new Point(TableWidth + Border,Border));
                pockets.add(new Point(TableWidth + Border,(TableHeight+2*Border)/2));
                pockets.add(new Point(TableWidth + Border, TableHeight+Border));
                
                
                //destroy old balls
                
                Balls.clear();
                DeadBalls.clear();
                Ball.RADIUS = TableWidth/20;
                Ball.PocketRadius = Ball.RADIUS*2;
                
                //Create some balls on the billiard table
                int startX = TableWidth/2 + Border; //constants for setting up initial ball position
                int startY = TableHeight/3;
                int dX = Ball.RADIUS;
                int dY = 2*dX;

                
                //make new balls of different colors
                  
                Balls.add(new Ball(new Point(startX,startY), Color.pink));
                Balls.add(new Ball(new Point(startX-dX, startY-dY), Color.blue));
                Balls.add(new Ball(new Point(startX+dX, startY-dY), Color.red));
                Balls.add(new Ball(new Point(startX, startY-2*dY), Color.yellow));
                Balls.add(new Ball(new Point(startX-2*dX, startY-2*dY), Color.orange));
                Balls.add(new Ball(new Point(startX+2*dX, startY-2*dY), Color.magenta));
                //create cue ball
                Balls.add(new Ball(new Point(TableWidth/3, TableHeight-50), Color.white));
                
 
       
       	} //end initialize
       	
     public void showTrace(boolean showiftrue) {
		showTrace = showiftrue;
		drawTrace = false;
		
	}
	
	public void showAiming(boolean showiftrue) {
		showAiming = showiftrue;
		
		
	}
	
    public boolean isInBounds(Point p) {
    	//answer whether point p is inside the bounds of the table
		if(p.x < leftWall) return false;
		if(p.x > rightWall) return false;
		if(p.y < top) return false;
		if(p.y > bottom) return false;
		return true;
		
		
	}
	
	public boolean isInPocket(Point p) {
    	//answer whether point p is inside one of the pockets
         for(int i=0; i<pockets.size(); i++) {
         	
         	Point pocket = (Point) pockets.elementAt(i);
         	if (distanceBetween(p, pocket) <= Ball.PocketRadius ) return true;
         	
         }
         return false;
				
	}
       	
	public void addEventHandlers() {
		addMouseListener(this);
		addMouseMotionListener(this);
	}
	public void removeEventHandlers() {
		removeMouseListener(this);
		removeMouseMotionListener(this);
	}

	// Unused event handlers
	public void mouseEntered(MouseEvent event) {}
	public void mouseExited(MouseEvent event) {}
	public void mouseMoved(MouseEvent event) {}
	public void keyTyped(KeyEvent event) {}
	public void keyReleased(KeyEvent event) {}

	 // Mouse click event handler
	public void mouseClicked(MouseEvent event) {
	// If this was a double-click, then ...currently not used
        if (event.getClickCount() == 2) {
           
           //not used currently

           }
	}

	// Mouse press event handler
	public void mousePressed(MouseEvent event) {
		
		    //start a new shot be making a cue stick
            selectedBall = BallAt(event.getPoint());          
            cueTip = null; 
            cueEnd = null;
            drawTrace = false;
            //make start of cue stick
            if(selectedBall != null)
                 cueTip = selectedBall.getLocation();
	  
	}

	// Mouse drag event handler
      public void mouseDragged(MouseEvent event) {
      	 //stretch the cue stick to aim the shot
      	 if (cueTip != null) cueEnd = event.getPoint();
       update();
    }

	// Mouse release event handler (i.e. stop dragging process)
    public void mouseReleased(MouseEvent event) {

        //shoot the ball based on direction and length of the cue stick
        if((cueTip != null)&&(cueEnd != null))
          if(!showAiming || selectedBall.isCueBall() )
           {
            AimingMarks.clear(); //remove aiming marks when shooting
          //determine horizontal and vertical speed from
          //the length of the cue stick

          double dx =  cueTip.x - cueEnd.x;
          double dy =  cueTip.y - cueEnd.y;
          
         //divide by 10 as arbitrary scaling factor
         if(distanceBetween(cueTip, cueEnd) > 3){
        
              selectedBall.setvy( dy/10 );
              selectedBall.setvx( dx/10);
              selectedBall.setMoving(true);
          }
          
         
          
        }
        
        else if (showAiming) { 
          	//System.out.println("aiming mark added");
          	AimingMarks.add(new Aiming(cueEnd, selectedBall));
          }

        //clear the cue stick after the shot
        selectedBall = null;
        cueTip = null;
        cueEnd = null;
        drawTrace = showTrace; //draw ball trace if requested
        
        update();
    }       	
       	
       	
       public void update() {
       //update the panels
                
		removeEventHandlers();
		repaint();
		addEventHandlers();
       }
                

	// Return the Ball at the given location (if one exists)
        public Ball BallAt(Point p) {
        for (int i=0; i<Balls.size(); i++) {
            Ball aBall = (Ball)Balls.elementAt(i);
            int distance = (p.x - aBall.getLocation().x) * (p.x - aBall.getLocation().x) +
                           (p.y - aBall.getLocation().y) * (p.y - aBall.getLocation().y);
            if (distance <= 4*(Ball.RADIUS * Ball.RADIUS))
                return aBall;
           }
           return null;
        }

    private double distanceBetween(Ball n1, Ball n2) {
    //answer the distance between Ball centers

            return Math.sqrt ((double) ((n2.getLocation().x - n1.getLocation().x) *                            (n2.getLocation().x - n1.getLocation().x) +
                           (n2.getLocation().y - n1.getLocation().y) * 
                           (n2.getLocation().y - n1.getLocation().y)));
    }
    
    private double distanceBetween(Point p1, Point p2) {
    //answer the distance between two points
            return Math.sqrt ((double) ((p2.x - p1.x) *  (p2.x - p1.x) +
                           (p2.y - p1.y) * 
                           (p2.y - p1.y)));
           
    }

	// answer whether Ball s is in contact with other Balls
        public boolean inContact(Ball s) {
          Point p = s.getLocation();
          for (int i=0; i<Balls.size(); i++) {
            Ball aBall = (Ball)Balls.elementAt(i);
            int distance = (p.x - aBall.getLocation().x) * (p.x - aBall.getLocation().x) +
                           (p.y - aBall.getLocation().y) * (p.y - aBall.getLocation().y);
            if ((distance <= 4*(Ball.RADIUS * Ball.RADIUS)) && (aBall != s) )
                return true;
           }
           return false;
        }

	// answer any Ball touching Ball s, null if there are none
        public Ball BallTouching(Ball s) {
          Point p = s.getLocation();
          for (int i=0; i<Balls.size(); i++) {
            Ball aBall = (Ball)Balls.elementAt(i);
            int distance = (p.x - aBall.getLocation().x) * (p.x - aBall.getLocation().x) +
                           (p.y - aBall.getLocation().y) * (p.y - aBall.getLocation().y);
            if ((distance <= 4*(Ball.RADIUS * Ball.RADIUS)) && (aBall != s) )
                return aBall;
           }
           return null;
        }
        
    // check if ball is inbounds or has fallen in a pocket
    public void checkBounds(Ball s) {
    	      //don't go out of bounds
              //If you are hitting a wall (or bank) then bounce off the
              //wall by changing the sign of the velocity
              
              
              if (s.getLocation().x < leftWall) 
                         { s.setLocation(leftWall, s.getLocation().y); 
                           s.changeHorizontalDirection(); }
              if (s.getLocation().x > rightWall) 
                         { 
                         s.setLocation(rightWall, s.getLocation().y); 
                         s.changeHorizontalDirection(); }
              if (s.getLocation().y < top) 
                         { 
                         s.setLocation(s.getLocation().x, top); 
                         s.changeVerticalDirection(); }
             
              if (s.getLocation().y > bottom) 
                         {  
                         s.setLocation(s.getLocation().x, bottom); 
                         s.changeVerticalDirection(); }
                         
              //check if the ball is in a pocket
              //if it is stop it and make it grey and put it in the pocket
              for (int i =0; i<pockets.size(); i++) {
              	Point pocket = (Point) BilliardPanel.pockets.elementAt(i);
              	if (distanceBetween(pocket, s.getLocation()) <= Ball.PocketRadius){
              	
              	   Balls.remove(s);  //take ball out of play
              	   DeadBalls.add(s); //place ball in pocket collection
              	   s.makeDarker();
              	   s.setLocation(pocket); //put it in the pocket
              	   s.stop();
                   }
              }                   
                         
                         
                         

        }


        
     // This is the Timer event handler 
     // Advance any Balls that are currently in motion
     public void actionPerformed(ActionEvent e) {

         for(int i=0; i<Balls.size(); i++) {
            Ball s = (Ball) Balls.elementAt(i);
            s.advance( milliseconds );
            
            if(s.isMoving() ) {
            	 checkBounds(s);
                 Ball t = BallTouching(s); 
            
                 if (t != null ) collisions.add(s,t);
               }
            collisions.removeOldCollisions();
                 
            }

         update(); 
        }
        
    private boolean offTheRightBank(Point start, Point end) {
    //answer if line segement from start to end is off the right bank
     if(end.x > rightWall){
       Point bank = new Point(rightWall,start.y + (end.y-start.y)*(rightWall-start.x)/(end.x-start.x));
       return ((bank.y >= top) && (bank.y <= bottom));
       
       }
     else return false;

    } 
    
    private boolean offTheLeftBank(Point start, Point end) {
    //answer if line segement from start to end is off the right bank
     if(end.x < leftWall){
       Point bank = new Point(leftWall,start.y + (end.y-start.y)*(start.x -leftWall)/(start.x -end.x));
       return ((bank.y >= top) && (bank.y <= bottom));
       
       }
     else return false;

    }  
    
    private boolean offTheTopBank(Point start, Point end) {
    //answer if line segement from start to end goes off the top bank
     if(end.y < top){
                    
       Point bank = new Point(start.x + (end.x-start.x)*(start.y -top)/(start.y - end.y),top);
       return ((bank.x >= leftWall) && (bank.x <= rightWall));
       
       }
     else return false;

    } 
    
    private boolean offTheBottomBank(Point start, Point end) {
    //answer if line segement from start to end goes off the bottom bank
     if(end.y > bottom){
                    
       Point bank = new Point(start.x + (end.x-start.x)*(bottom-start.y)/(end.y-start.y),bottom);
       return ((bank.x >= leftWall) && (bank.x <= rightWall));
       
       }
     else return false;

    }                       
        
    // This is the method that is responsible for displaying table and Balls
    public void paintComponent(Graphics aPen) {
        
         
         
        if( (OwnerWidth != owner.getWidth()) || 
            (OwnerHeight != owner.getHeight() ) ) {
            	//table has resized
            	setTableSize(); 
            	initialize();
            }

                  
         
         //draw the billard table
         if(!drawTrace){
         
         super.paintComponent(aPen);
         setBackground(Color.green.darker().darker());
         }
         
        

         //Draw boundary
         aPen.setColor(Color.green.darker().darker().darker().darker());
         aPen.drawRect(Border,Border, TableWidth, TableHeight);
         
         
 
         //Draw pockets
         int pocketRadius = Ball.PocketRadius;
         aPen.setColor(Color.green.darker().darker().darker());
         for(int i=0; i<pockets.size(); i++) {
         	
         	Point pocket = (Point) pockets.elementAt(i);
         	//System.out.println("pocket x=" + pocket.x + " y=" + pocket.y );
         	aPen.fillOval(pocket.x-pocketRadius, pocket.y-pocketRadius, 2*pocketRadius, 2*pocketRadius);
         }
         
         //Draw Shadows for the Balls
         if(!drawTrace)
         for (int i = 0; i<Balls.size(); i++)
            {
                Ball st = (Ball) Balls.elementAt(i);
                st.drawShadowWith(aPen);
            }	    

         //Draw Balls
         for (int i = 0; i<Balls.size(); i++)
            {
                Ball st = (Ball) Balls.elementAt(i);
                st.drawWith(aPen);
            }
            
         //Draw Dead Balls
         for (int i = 0; i<DeadBalls.size(); i++)
            {
                Ball st = (Ball) DeadBalls.elementAt(i);
                st.drawWith(aPen);
            }
            
         //Draw aiming marks if requested
         if(showAiming)
          for (int i = 0; i<AimingMarks.size(); i++)
            {
                Aiming aim = (Aiming) AimingMarks.elementAt(i);
                aim.drawWith(aPen);
            }            
            
         //Draw the cue stick
         aPen.setColor(Color.black);
         if((cueTip != null)&&(cueEnd != null)) {
           
            //aPen.drawLine(cueTip.x, cueTip.y, cueEnd.x, cueEnd.y);
            aPen.drawLine(cueTip.x, cueTip.y, cueEnd.x+3, cueEnd.y-3);
            aPen.drawLine(cueTip.x, cueTip.y, cueEnd.x-3, cueEnd.y+3);
            
            if(showAiming) {
               //show lazer sighting cue.
               int [] xPoints = new int[100]; //hope 100 is big enough (bad coding)
               int [] yPoints = new int[100];
               int nPoints = 0;
               
               aPen.setColor(Color.red);
               
               Point start = new Point(cueTip.x, cueTip.y);
               xPoints[nPoints] = start.x; yPoints[nPoints] = start.y; nPoints++;
               
               Point end = new Point(cueTip.x + (cueTip.x - cueEnd.x)*10, cueTip.y + (cueTip.y - cueEnd.y)*10);
               //if(isInBounds(end)) aPen.drawLine(cueTip.x, cueTip.y, end.x, end.y); 
               Point bank = end;
               
               while(!isInBounds(end)){
              
               if(offTheRightBank(start, end)){
                  bank = new Point(rightWall,start.y + (end.y-start.y)*(rightWall-start.x)/(end.x-start.x));
                  end = new Point(rightWall-(end.x -rightWall), end.y);
                  }
               else if(offTheLeftBank(start, end)){
               	  bank = new Point(leftWall,start.y + (end.y-start.y)*(start.x -leftWall)/(start.x -end.x));
                  end = new Point(leftWall + (leftWall - end.x), end.y);
                  }
               else if(offTheBottomBank(start,end)){
               	  bank = new Point(start.x + (end.x-start.x)*(bottom-start.y)/(end.y-start.y),bottom);
                  end = new Point(end.x, bottom - (end.y - bottom));
                  }
               else if(offTheTopBank(start,end)){
               	  bank = new Point(start.x + (end.x-start.x)*(start.y -top)/(start.y - end.y),top);
                  end = new Point(end.x, top + (top - end.y));
                  }
                      
               xPoints[nPoints] = bank.x; yPoints[nPoints] = bank.y; nPoints++;
               start = bank;                              
               } //end while
               xPoints[nPoints] = end.x; yPoints[nPoints] = end.y; nPoints++;
               //draw lazer
               aPen.drawPolyline(xPoints, yPoints, nPoints);
                    
             }
         }

    }

}        
         