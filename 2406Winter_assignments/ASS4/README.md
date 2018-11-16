# mongodb logfile
#### ---- read file push to database and query data from database 

### INSTRUCTION: 

[install npm](https://nodejs.org/en/)


[install MongoDB](https://www.mongodb.com/download-center/community)

#### test cmd:

    1. mongodb
        
        net start MongoDB
        
    2. javascript
    
        cd 05-Tut
        npm install
        node queryLogs.js --results=out.txt --maxcount=10 --service="systemd" --message="[Ss]tarted" 
        
#### test environment: 


    test OS : Windows 10 64bits
    mongodb version : MongoDB shell version v4.0.3
                      build environment:
                      distmod: 2008plus-ssl
                      distarch: x86_64
                      target_arch: x86_64


### DESCRIPTION:
[course assignment description and course solution](https://homeostasis.scs.carleton.ca/wiki/index.php/WebFund_2016W:_Assignment_4)
	

	The log lines should be outputted as lines, not as objects.
	
	The service and message queries should both be regular expressions and should be combined with a logical and
	 if both are present.
	 
	All arguments are optional.      
 
