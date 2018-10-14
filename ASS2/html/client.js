

const chordMapUp = new Map()
chordMapUp.set('A','A#')
chordMapUp.set('A#','B')
chordMapUp.set('Bb','B')
chordMapUp.set('B','C')
chordMapUp.set('C','C#')
chordMapUp.set('C#','D')
chordMapUp.set('Db',"D")
chordMapUp.set('D','D#')
chordMapUp.set('D#','E')
chordMapUp.set('Eb','E')
chordMapUp.set('E',"F")
chordMapUp.set('F','F#')
chordMapUp.set('F#','G')
chordMapUp.set('Gb','G')
chordMapUp.set('G','G#')
chordMapUp.set('G#','A')
chordMapUp.set('Ab','A')

const chordMapDown = new Map()
chordMapDown.set('A','G#')
chordMapDown.set('A#','A')
chordMapDown.set('Bb','A')
chordMapDown.set('B','A#')
chordMapDown.set('C','B')
chordMapDown.set('C#','C')
chordMapDown.set('Db',"C")
chordMapDown.set('D','C#')
chordMapDown.set('D#','D')
chordMapDown.set('Eb','D')
chordMapDown.set('E',"D#")
chordMapDown.set('F','E')
chordMapDown.set('F#','F')
chordMapDown.set('Gb','F')
chordMapDown.set('G','F#')
chordMapDown.set('G#','G')
chordMapDown.set('Ab','G')


let words_array = [] //array of object
let words_file_txt = '' //output modified text
let selectedWord //one word object
let deltaX, deltaY //mouseX - word.x
const text_font = 20
const xSpace = 10
const ySpace = 50
const canvas = document.getElementById('canvas1') //our drawing canvas



//generate words array with .content .x .y .width properties
function wordsLocator(lines) {

    let lines_array = lines


    let curr_x = 50
    let curr_y = 50
    let curr_chord = 0

    for (let i = 0; i<lines_array.length;i++) {
      let words = lines_array[i].trim().split(' ')
      // console.log("words : "+words);

      for (let j = 0; j< words.length;j++) {



        if (words[j].includes('[')) {
          let find = words[j].match(/\[.*?\]/g)[0] //match return array
          let rest = words[j].replace(find,'')

          let find_width = canvas.getContext('2d').measureText(find).width
          let text_width = canvas.getContext('2d').measureText(rest).width

          if (curr_chord>curr_x) { //handle chord overlap
            curr_x += curr_chord - curr_x
          }

          curr_chord = curr_x + find_width


          if (rest==='') { //if only have chord

            words_array.push({
              text : find,
              x : curr_x,
              y : curr_y - text_font -10,
              width: find_width
            })
            curr_x += xSpace

          }else {  //word has chord and text

            words_array.push({
              text: find,
              x : curr_x,
              y : curr_y - text_font -10,
              width : find_width
            })
            curr_x += xSpace


            words_array.push({
              text: rest,
              x : curr_x,
              y : curr_y,
              width : text_width

            })
            curr_x +=text_width + xSpace
          }

        }else {
          let text_width = canvas.getContext('2d').measureText(words[j]).width

          words_array.push({
            text : words[j],
            x: curr_x,
            y: curr_y,
            width : text_width

          })

          curr_x += xSpace + text_width
        }
      }//end words for loop
      curr_x = 50
      curr_chord = curr_x

      curr_y += ySpace + text_font
    }//end lines for loop

}//wordsLocator



//get word in words array when mousedown at (clientX,clientY)
function getWord(mouseX,mouseY) {



  for (var i = 0; i < words_array.length; i++) {
      let word = words_array[i]
     if((mouseX > word.x && mouseX < word.x + word.width)
          &&(mouseY> word.y-text_font && mouseY < word.y )) {
        return word

        console.log('select : '+JSON.stringify(words_array[i]));
      }

  }
  return null

}

//draw canvas
//set words style
//draw words
function drawCanvas() {

  let context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height) //erase canvas


  context.font = `${text_font}pt Arial` //text_font
  // context.strokeStyle = 'green'

  for (let i = 0; i < words_array.length; i++) {
    if (words_array[i].text.includes('[')) {
      context.fillStyle = 'green'
      let data = words_array[i]
      context.fillText(data.text, data.x, data.y);
      context.strokeText(data.text, data.x, data.y)
    }else if (words_array[i].text) {
      context.fillStyle = 'cornflowerblue'
      let data = words_array[i]
      context.fillText(data.text, data.x, data.y);
      context.strokeText(data.text, data.x, data.y)
    }

  }//end for (fill text)
  context.stroke()

}//end draw canvas




//handle mouse down
//get relative x,y to windows rect
//delta x, y (mouse.x - word.x)with being moved word --> to global
//trigger mouse move and mouse up (Jquery add event listener)
//stop propagation and prevent default, re-draw canvas
function handleMouseDown(e) {

  //get mouse location relative to canvas top left
  let rect = canvas.getBoundingClientRect()

  let canvasX = e.pageX - rect.left //use jQuery event object pageX and pageY
  let canvasY = e.pageY - rect.top
  console.log("mouse down:" + canvasX + ", " + canvasY)

  selectedWord = getWord(canvasX, canvasY)

  console.log(JSON.stringify(selectedWord))


  if (selectedWord != null) {
    deltaX = selectedWord.x - canvasX
    deltaY = selectedWord.y - canvasY
    //document.addEventListener("mousemove", handleMouseMove, true)
    //document.addEventListener("mouseup", handleMouseUp, true)
    $("#canvas1").mousemove(handleMouseMove)
    $("#canvas1").mouseup(handleMouseUp)

  }

  // Stop propagation of the event // TODO:  stop any default
  // browser behaviour

  e.stopPropagation()
  e.preventDefault()

  drawCanvas()
}





//handle mouse move
//get relative x,y to windows rect
//update moved word location (new mouse.x + delta.x )
//stop propagation, re-draw canvas
function handleMouseMove(e) {

  console.log("mouse move")

  //get mouse location relative to canvas top left
  let rect = canvas.getBoundingClientRect()
  let canvasX = e.pageX - rect.left
  let canvasY = e.pageY - rect.top

  selectedWord.x = canvasX + deltaX
  selectedWord.y = canvasY + deltaY

  e.stopPropagation()

  drawCanvas()
}





//handle mouse up
//stop propagation
//remove all event handler without mousedown
//$(canvas id).off(evnet,event handler function)
//re-draw canvas
function handleMouseUp(e) {
  console.log("mouse up")

  e.stopPropagation()

  //$("#canvas1").off(); //remove all event handlers from canvas
  //$("#canvas1").mousedown(handleMouseDown); //add mouse down handler

  //remove mouse move and mouse up handlers but leave mouse down handler
  $("#canvas1").off("mousemove", handleMouseMove) //remove mouse move handler
  $("#canvas1").off("mouseup", handleMouseUp) //remove mouse up handler

  drawCanvas() //redraw the canvas
}




//handle key up
//trigger handle submition, clear text field
function handleKeyUp(e) {

  if (e.which == 13) {
    handleSubmitButton() //treat ENTER key like you would a submit
    $('#textID').val('') //clear the user text field
  }

  e.stopPropagation()
  e.preventDefault()
}



//handle submit
//get text, add to object, JSON to string, clear text field
//text node, element node, append them to html
//post data from server, send usertext and get words array on server,
//, json to object to global
function handleSubmitButton() {
  console.log("submit");

  let userText = $('#textID').val(); //get text from user text input field
  if (userText && userText != '') {
    //user text was not empty
    let userRequestObj = {
      text: userText
    } //make object to send to server
    let userRequestJSON = JSON.stringify(userRequestObj) //make JSON string
    $('#textID').val('') //clear the user text field



    $.post("userText", userRequestJSON, function(data, status) {

      let responseObj = data // .wordArray / .userText


      //replace word array with new words if there are any
      if (responseObj.wordArray) {
        let lines_sb = responseObj.wordArray
        // console.log('lines : '+lines);
        words_array =[]
        wordsLocator(lines_sb)
        drawCanvas()



        for (let line of lines_sb) {
          document.getElementById('text_area').innerHTML += `${line}</p>`
        }

      }else {
        document.getElementById('text_area').innerHTML += userText

      }


    })
  }
}



function handleTransUp() {
    drawCanvas() //get words array

    for (var i = 0; i < words_array.length; i++) {

        if (words_array[i].text.includes('[')) {

          let chord = words_array[i].text

          let iter = chordMapUp.keys()
          let sub_chord = ''
          let result = ''
          for (let i = 1; i < chord.length-1; i++) {
            sub_chord+=chord[i]
            for (mapValue of iter) {

              if (sub_chord==mapValue) {
                if (mapValue.length>result.length) {
                  result = mapValue
                }
                break
              }
            }//end iter
          }//end chord string loop
          let rest = chord.replace(result,'')
          words_array[i].text = rest.replace('[','['+chordMapUp.get(result))
        }//end if is chord
    }//end words array loop
drawCanvas()
}//end function handleTransUp

function handleTransDown() {

  drawCanvas()

  for (let i = 0; i < words_array.length; i++) {

      if (words_array[i].text.includes('[')) {

        let chord = words_array[i].text

        let iter = chordMapDown.keys()
        let sub_chord = ''
        let result = ''
        for (let i = 1; i < chord.length-1; i++) {
          sub_chord+=chord[i]
          for (mapValue of iter) {

            if (sub_chord==mapValue) {
              if (mapValue.length>result.length) { //find closest i.e A & A#
                result = mapValue
              }
              break
            }
          }//end iter
        }//end chord string loop
        let rest = chord.replace(result,'')
        words_array[i].text = rest.replace('[','['+chordMapDown.get(result))
      }//end if is chord
  }//end words array loop
drawCanvas()
}

function handleRefreshButton() {
let textArea = document.getElementById('text_area')

let array = words_array //.text .x .y .width




for (let word of array) {

  word.y = ((word.y-array[0].y )/(ySpace+text_font)).toFixed(0)*(ySpace+text_font) + array[0].y //toFixed .5 round up
}

array.sort(function (a,b) { //return y sorted object array ascending
  return a.y-b.y
})

array.push({ //add last line
  text : '',
  x : 50,
  y : array[array.length-1].y + (ySpace+text_font)
})

let l = array[0].y
let txt = '' //write file purpose
let text_line = '' //re-locate words purpose (by output lines array)
let line = [] //strings of one line
let lines_r = [] //line string array

for (let i = 0; i<array.length;i++) { //array = all words array
  let y_sorted_word = array[i]

  if (y_sorted_word.y!=l) {  //next line first
    l = y_sorted_word.y

      if (line.length>1) {
        line.sort(function (a,b) { //sort upper line
          return a.x-b.x
        })
      }



      for (let x_sorted_word of line) { //txt upper line
        txt += x_sorted_word.text + ' '
        text_line += x_sorted_word.text + ' '
      }

      text_line.trim()
      lines_r.push(text_line)
      text_line = ''

      txt += '\n'  //add next line to upper line


    line = [] //clear upper line

    line.push(y_sorted_word) //push next line first into line

  }else{
    line.push(y_sorted_word)
  }

}
// console.log(txt);
words_file_txt = txt


for (let line of lines_r) {
  textArea.innerHTML +=`${line}</p>`
}
words_array = []

// console.log(lines_r);
wordsLocator(lines_r)
drawCanvas()

}

function handleSaveFileButton() { //need to reverse wordArray to text format
  let userText = $('#textID').val()
  if (userText&&userText!='') {
    let sendObj = {
      usage : 'saveFile', //seperate usage of post methods
      title : userText,
      content : words_file_txt
    }
    sendObjJSON = JSON.stringify(sendObj)

    $.post('saveFile',sendObjJSON,(data)=>{ //sendback .text
      console.log(`file has been saved : ${data.text}`);
    })
  }

}

// console.log("outside wordArray : "+JSON.stringify(words))


//document ready (after browser load html)
//add canvas mouse down listener
//add key up listener
//draw canvas
$(document).ready(function() {
  //This is called after the broswer has loaded the web page

  //add mouse down listener to our canvas object
  $("#canvas1").mousedown(handleMouseDown)

  //add key handler for the document as a whole, not separate elements.
  $(document).keyup(handleKeyUp)

  wordsLocator(words_array)

  drawCanvas()



})
