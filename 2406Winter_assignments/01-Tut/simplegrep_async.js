// simplegrep_async.js
//
// duplicates the base functionality of the UNIX grep command
// This version uses asynchronous I/O.
//

var fs = require('fs');

if (process.argv.length < 4) {
    console.error('Not enough parameters given. Try this: ' +
                  '"node simplegrep_async term filename.txt"'); 
    process.exit(1);
}

var searchterm = process.argv[2];
var filename = process.argv[3];

var returnMatches = function(err, rawContents) {

    var lines = rawContents.split('\n');

    lines.forEach(function(theLine) {
        if (theLine.indexOf(searchterm) > -1) {
            console.log(theLine);
        }
    });
}

fs.readFile(filename, 'utf-8', returnMatches);
