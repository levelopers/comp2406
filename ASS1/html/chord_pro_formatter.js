const fs = require('fs');


let songs = {
  "BEG" : "../songs/Brown Eyed Girl.txt",
  "PEF" : "../songs/Peaceful Easy Feeling.txt",
  "SGH" : "../songs/Sister Golden Hair.txt"
}

for (let song in songs) {
  let lyrics = []
  let buffer = fs.readFileSync(songs[song])
  let words = buffer.toString().split(' ')
  /*lyrics array of objects
  properties : text , chord
  */
  for (var i = 0; i < words.length; i++) {
  if (words[i].indexOf('[')!==-1) {
    let chord = words[i].match(/\[(.*?)\]/g)
    let pure = words[i].replace(/\[(.*?)\]/g,'')
    lyrics.push({
      text:pure.toString(),
      chord:chord.toString()
    })
  }else {
    lyrics.push({
      text:words[i]
    })
  }
  }

  fs.writeFile(songs[song].replace(".txt"," export.txt"),JSON.stringify(lyrics),function (err) {
    if (err) throw err
    console.log(`file ${songs[song]} export`);
  })
}
