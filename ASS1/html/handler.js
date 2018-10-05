
let words = [] //array of object
//
// words.push({
//
//   chord: "[a]"
// })
// words.push({
//     text: "I"
// })
// words.push({
//   text: "like"
//
// })
// words.push({
//   chord : "[adf]"
// })
// words.push({
//   text: "the",
//
// })
// words.push({
//   text: "way",
//
// })
// words.push({
//   text: "your",
//
// })
// words.push({
//   text: "sparkling",
//
// })
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



let selectedWord //one word object
let deltaX, deltaY //mouseX - word.x
let text_font = 15
const canvas = document.getElementById('canvas1') //our drawing canvas



//generate words array with .content .x .y .width properties
function wordsLocator(words) {
//without chord version




  let rect = canvas.getBoundingClientRect()
  let canvasX = rect.left
  let canvasY = rect.top

  let xBoundary = rect.right+300
  let yBoundary = rect.bottom

  const xSpace = 10
  const ySpace = 30


  let line = 0
  let text_width = 0

  for (var i = 0; i < words.length; i++) {


    if (words[i].endline) {
      line++
      words[i].x = words[0].x
      words[i].text_width = 0
      words[i].y = words[i-1].y
      continue
    }else{


      //get both width
      if (words[i].chord!==undefined) {
        let text_width = canvas.getContext('2d').measureText(words[i].chord).width
        words[i].text_width = text_width

      }
      if (words[i].text!==undefined) {
        let text_width = canvas.getContext('2d').measureText(words[i].text).width
        words[i].text_width = text_width

      }


      //set x,y
        if (i==0) {
          words[i].x = 50
          words[i].y = 50
        }else {
            words[i].x = words[i-1].x + words[i-1].text_width + xSpace //margin offset
            words[i].y = words[0].y+(text_font+ySpace)*line
            // prev = words[i]
          }





}//not endline
}//for
}//wordsLocator



//get word in words array when mousedown at (clientX,clientY)
function getWord(mouseX,mouseY) {



  for (var i = 0; i < words.length; i++) {
    if (words[i].endline) {
      continue

    }
      else if(Math.abs(mouseX-words[i].x)<words[i].text_width
          &&Math.abs(mouseY-words[i].y)<text_font) {
        return words[i]

        console.log('select : '+JSON.stringify(words[i]));
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

  for (let i = 0; i < words.length; i++) {
    if (words[i].chord) {
      context.fillStyle = 'green'
      let data = words[i]
      context.fillText(data.chord, data.x, data.y);
      context.strokeText(data.chord, data.x, data.y)
    }else if (words[i].text) {
      context.fillStyle = 'cornflowerblue'
      let data = words[i]
      context.fillText(data.text, data.x, data.y);
      context.strokeText(data.text, data.x, data.y)
    }
    continue
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
  //var canvasX = e.clientX - rect.left
  //var canvasY = e.clientY - rect.top
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
    $('#userTextField').val('') //clear the user text field
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



    //Prepare a POST message for the server and a call back function
    //to catch the server repsonse.
    //alert ("You typed: " + userText)
    $.post("userText", userRequestJSON, function(data, status) {
      // console.log("data: " + data)
      // console.log("typeof: " + typeof data)
      let responseObj = JSON.parse(data) // .wordArray .userText
      //replace word array with new words if there are any
      if (responseObj.wordArray) {
        words = responseObj.wordArray

        userText = responseObj.userText
        let textNode = document.createTextNode(userText)
        let paraNode = document.createElement('p')
        paraNode.appendChild(textNode)
        document.getElementById('text_area').appendChild(paraNode)

        console.log(responseObj.userText);

      // console.log(userText);
        wordsLocator(words)
        // console.log(JSON.stringify(words));
        drawCanvas()

      }
      // console.log("response userText : " + responseObj.userText);
      // console.log("response wordArray : "+JSON.stringify(words))
    })
    let textNode = document.createTextNode(userText)
    let paraNode = document.createElement('p')
    paraNode.appendChild(textNode)
    document.getElementById('text_area').appendChild(paraNode)

  }
}



function handleTransUp() {
    drawCanvas() //get words array

    for (var i = 0; i < words.length; i++) {
      if (!words[i].endline) {
        if (words[i].chord) {

          let chord = words[i].chord

          let iter = chordMapUp.keys()
          let sub_chord = ''
          let result = ''
          for (let i = 1; i < chord.length-1; i++) {
            sub_chord+=chord[i]
            for (item of iter) {

              if (sub_chord==item) {
                if (item.length>result.length) {
                  result = item
                }
                break
              }
            }//end iter
          }//end chord string loop
          let rest = chord.replace(result,'')
          words[i].chord = rest.replace('[','['+chordMapUp.get(result))
        }//end if is chord
      }//end if not endline
      continue
    }//end words array loop
drawCanvas()
}//end function handleTransUp

function handleTransDown() {

  drawCanvas()

  for (let i = 0; i < words.length; i++) {
    if (!words[i].endline) {
      if (words[i].chord) {

        let chord = words[i].chord

        let iter = chordMapDown.keys()
        let sub_chord = ''
        let result = ''
        for (let i = 1; i < chord.length-1; i++) {
          sub_chord+=chord[i]
          for (item of iter) {

            if (sub_chord==item) {
              if (item.length>result.length) {
                result = item
              }
              break
            }
          }//end iter
        }//end chord string loop
        let rest = chord.replace(result,'')
        words[i].chord = rest.replace('[','['+chordMapDown.get(result))
      }//end if is chord
    }//end if not endline
    continue
  }//end words array loop
drawCanvas()
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

  wordsLocator(words)

  drawCanvas()



})
