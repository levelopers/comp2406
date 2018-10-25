// simplegrep_sync.js
//
// duplicates the base functionality of the UNIX grep command
// This version uses synchronous I/O.
//

var fs = require('fs');

if (process.argv.length < 4) {
    console.error('Not enough parameters given. Try this: ' +
                  '"node simplegrep_sync term filename.txt"'); 
    process.exit(1);
}

var searchterm = process.argv[2];
var filename = process.argv[3];

var rawContents = fs.readFileSync(filename, 'utf-8');
var lines = rawContents.split('\n');

for (i = 0; i < lines.length; i++) {
    if (lines[i].indexOf(searchterm) > -1) {
        console.log(lines[i]);
    }
}
