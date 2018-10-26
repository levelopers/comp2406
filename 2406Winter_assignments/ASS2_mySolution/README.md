web log file with option configuration file
===


### run this app by following steps:


####  1.you need to install nodejs by downloading installer on:
https://nodejs.org/en/

    or you can click link to download installer

<https://nodejs.org/dist/v8.12.0/node-v8.12.0-x64.msi>



 #### 2.download file and run command in file directory './ASS2_mySolution'
      
      cmd:
          node app.js
  
  
  
 #### 3.open browser (by default) at:
  
      http://localhost:3000
      
  
 ### Here is function instructions:
 
 1.Add a new 777 status code if there is a request for any document with the word "lucky" in its URL (path or document name).
 
 2.Add a command line argument which is the name of a configuration file. This file should contain the contents of the options object. Note that tinyweb.js should start up correctly without this option file being specified; in this case it should behave as tinywebserver.js does (with respect to the options, not the lucky return code).
 
 3.In the configuration file add the following properties to the option object that change the behavior of the app as follows (note it should also contain all the options that were already part of the options object):
 
      
