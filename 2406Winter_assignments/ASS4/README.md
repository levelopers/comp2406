# read log file push to database

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
The output lines should appear as they were before being stored in the database. (Please do not include the file or ID fields.)
Be sure not to forget the colon after the service! However, it is okay if multiple spaces are converted to one space in your output. The ordering of the outputted lines is likely to be different, especially as the lines may come from multiple log files that were stored.
The service and message queries should both be regular expressions and should be combined with a logical and if both are present.
All arguments are optional. If neither --service or --message are specified, all stored log messages should be returned (up to --maxcount, if specified). If no --maxcount is specified, all matching records should be output. If no --results is specified, the output should go to standard out. Thus, node queryLogs.js can be called with no arguments and should just dump all of the log messages (albeit potentially in an arbitrary order).        
 
