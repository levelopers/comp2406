# express REST api service

### instruction
    
     1.download and extract myApp.rar file 
     
     2.open command in "./myApp" directory type : ( if you have already installed npm globally)
         npm install
         npm start
     
     3.open browser and enter
         http://localhost:3000
         
        
### description

####    ---query JSON data from "food2Fork" server and render my html page through my server
        
 1. using pug(jade), express, bootstrap to build a Server application
 2. one router middleware to handle get method request to index page and post request then render /recipe_page 
    with response data
 3. sending https request with url query content in options object 
 4. redirect html files required bootstrap.min.js and bootstrap.min.css files from public directory 
    to node_modules directory.

