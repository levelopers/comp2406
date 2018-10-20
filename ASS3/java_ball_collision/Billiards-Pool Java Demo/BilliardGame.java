import java.util.Vector;
import java.util.Enumeration;
import java.util.Random;
import java.math.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.io.*;


// This class represents the view of the Curling Frame
public class BilliardGame extends JFrame  implements ActionListener {
	
      JMenu  settingsMenu = new JMenu("Settings");
      JCheckBoxMenuItem showTraceItem = new JCheckBoxMenuItem("show trace");
      JCheckBoxMenuItem showAimingItem = new JCheckBoxMenuItem("lazer sight");
      JMenuItem resetItem = new JMenuItem("reset");
      JMenuItem aboutItem = new JMenuItem("about");
      

      private BilliardPanel table; //billiard table panel
        
	  public BilliardGame (String title) {
		super(title);
		        setSize(300,500);
                table = new BilliardPanel(this);                              
                Container contentPane = getContentPane();
                contentPane.setLayout(new FlowLayout(FlowLayout.CENTER, 0, 0));                              
                contentPane.add(table); //add the whole table view
                
   	  // Create a menu bars and its pull-down menus 
      JMenuBar menuBar = new JMenuBar();
      setJMenuBar(menuBar);
      menuBar.add(settingsMenu); 
      

      showTraceItem.addActionListener(this);
      showAimingItem.addActionListener(this);
      resetItem.addActionListener(this);
      aboutItem.addActionListener(this);
      settingsMenu.add(aboutItem);
      settingsMenu.add(resetItem); 
      settingsMenu.add(new JSeparator());
      settingsMenu.add(showTraceItem);
      settingsMenu.add(showAimingItem);
             
                
                
                
                
                update();
                //setSize(table.getWidth(), table.getHeight() +40 );
 
	}
 
       	
       	
       public void update() {              

		repaint();

       }
                
       // dispatch menu selections 
     public void actionPerformed(ActionEvent event){ 
             if (event.getSource() == showTraceItem) 
                  table.showTrace(showTraceItem.getState());
             else if (event.getSource() == showAimingItem) 
                 table.showAiming(showAimingItem.getState());

             else if (event.getSource() == resetItem) 
                 table.initialize();
             else if (event.getSource() == aboutItem) 
                 showAboutDialog();

             	
             
               
         } 
         
    public void showAboutDialog ()
    {
        String message = "Pool Hall Prototype by Louis Nel";
        String title = "Off da Bank";
        int messageType = JOptionPane.INFORMATION_MESSAGE;
        ImageIcon icon = new ImageIcon ("carleton.png");
        JOptionPane.showMessageDialog (this, message, title, messageType, icon);
    }

         

	public static void main(String args[]) {

		BilliardGame frame =  
                    new BilliardGame("Off Da Bank");
        //frame.setSize(300,500);
                      
		// Add the usual window listener (for closing ability)
		frame.addWindowListener(
			new WindowAdapter() {
 				public void windowClosing(WindowEvent e) {
					System.exit(0);
				}
			}
		);

                //show the frame
		frame.setVisible(true);
	}   
}