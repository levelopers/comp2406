import java.util.Vector;
import java.util.Enumeration;
import java.util.Random;
import java.math.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.io.*;

class Collision {
  //This class represents a collision between two Balls
  public Ball Ball1, Ball2;

  Collision (Ball s1, Ball s2) {
      Ball1 = s1; Ball2 = s2;
  }

  public boolean includes(Ball s) {
      return ((s == Ball1) || (s == Ball2));
  }
  public boolean equals(Collision c) {
     return (c.includes(Ball1) && c.includes(Ball2) ); 
  }
}
	