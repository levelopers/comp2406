// words_sync.js
//
// finds all the wordsduplicates the base functionality of the UNIX grep command
// This version uses synchronous I/O.
//

var fs = require('fs');

if (process.argv.length < 4) {
    console.error('Not enough parameters given. Try this: ' +
                  '"node words-sync.js <input-file> <output-file>"'); 
    process.exit(1);
}

var inputFilename = process.argv[2];
var outputFilename = process.argv[3];

var rawContents = fs.readFileSync(inputFilename, 'utf-8');
var wordSep = /\W/;
var words = rawContents.split(wordSep);
var sortedWords = words.sort();
var emptyWords, start, i, j, prevWord, theWord;
var outputContents = [];

emptyWords = -1;

for (i = 0; i < sortedWords.length; i++) {
    if (sortedWords[i] === '') {
	emptyWords = i;
    } else {
	break;
    }
}

if (emptyWords === -1) {
    start = 0;
} else {
    start = emptyWords + 1;
}

prevWord = '';

for (i = start; i < sortedWords.length; i++) {
    theWord = sortedWords[i];
    
    if (theWord === prevWord) {
	continue;
    }

    outputContents.push(theWord);
    prevWord = theWord;
}

fs.writeFileSync(outputFilename, outputContents.join('\n'));

console.log("Finished!");
