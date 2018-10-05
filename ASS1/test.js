const fs = require('fs');

let data = fs.readFileSync('./songs/Brown Eyed Girl.txt').toString() //has to be asynchronous readFile

   let lines_array = data.replace(',','').split('\n')
   let result = ''
   let space = ' '

   for (let i = 0; i<lines_array.length;i++) {
     let top = '' //reset every line
     let bot = ''
     let words = lines_array[i].split(' ') // words = line[1] words_array

     for (let j = 0; j< words.length;j++) {
       if (words[j].includes('[')) {
         let find = words[j].match(/\[.*?\]/g) //match (regular expression)
         top += find + ' '
         bot += words[j].replace(find,'') + ' '


         if (words[j].replace(find,'')) {

         }

       }else {
         top += space.repeat(words[j].length)
         bot += words[j] + ' '


       }
       line_result = `${top}\n${bot}`


     }


     result += line_result + `\n`
   }
   console.log(JSON.parse(JSON.stringify(result)).toString());

   // console.log(result);
