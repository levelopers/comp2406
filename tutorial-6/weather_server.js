/*
Interacting with external services

Simple example of node.js app serving contents based
on an available internet API service: api.openweathermap.org

***IMPORTANT NOTE***
As of 2015 openweather requires that you provide an APPID
with your HTTP requests. You can get one by creating a
free account at: http://openweathermap.org/appid
and signing up for an API key

IMPORTANT: for this code to work you need to replace the
'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' string in the code with a valid
openweather.org API key

To Test: Use browser to view http://localhost:3000/
*/

let http = require('http')
let url = require('url')
let qstring = require('querystring')

const PORT = process.env.PORT || 3000
//Please register for your own key replace this with your own.
const API_KEY = '6856f7aec1f093061d63d39264d17ac7' //<== INSERT YOUR KEY HERE

function sendResponse(weatherData, res) {

  var page = '<html><head><title>API Example</title></head>' +
    '<body>' +
    '<form method="post">' +
    'City: <input name="city"><br>' + //post: city = inputText
    '<input type="submit" value="Get Weather">' +
    '</form>'
  if (weatherData!==null) {
    page += '<h1>Weather Info</h1><p>' + weatherData //weatherData is string format but other get is null or object type
    if (JSON.parse(weatherData).name) {
      page+=`<br><strong>you are searching city : `+JSON.parse(weatherData).name+`</strong>`
    }

  }
  page += '</p></body></html>'
  res.end(page);
}

function parseWeather(weatherResponse, res) {
  let weatherData = ''
  weatherResponse.on('data', function(chunk) {
    weatherData += chunk
  })
  weatherResponse.on('end', function() {
    sendResponse(weatherData, res)
  })
}

function getWeather(city, res) {

  //New as of 2015: you need to provide an appid with your request.
  //Many API services now require that clients register for an app id.

  //Make an HTTP GET request to the openweathermap API
  let options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?q=' + city +
      '&appid=' + API_KEY
  }
  http.request(options, function(apiResponse) {
    parseWeather(apiResponse, res)
  }).end()
}

http.createServer(function(req, res) {
  let requestURL = req.url
  let query = url.parse(requestURL).query //GET method query parameters if any
  let method = req.method
  console.log(`${method}: ${requestURL}`)
  console.log(`query: ${query}`) //GET method query parameters if any

  if (req.method == "POST") {
    let reqData = ''
    req.on('data', function(chunk) {
      reqData += chunk
    })
    req.on('end', function() {
      console.log(`reqData: ${reqData}`);//city=Ottawa
      var queryParams = qstring.parse(reqData)
      console.log(`queryParams: ${JSON.stringify(queryParams)}`)//{"city":"Ottawa"}
      getWeather(queryParams.city, res)//only send query string data
    })
  }
   if (req.method=="GET") {
    let reqData_get = ''
    req.on('data',chunck=>{
      reqData_get +=chunck
    })

    req.on('end',()=>{
      let req_city = qstring.parse(query).city
      if (req_city) {
        getWeather(req_city,res)
      }else {
        sendResponse(null, res)//pass get '/' through
      }
    })
    return
  }


}).listen(PORT, (error) => {
  if (error)
    return console.log(error)
  console.log(`Server is listening on PORT ${PORT} CNTL-C to quit`)
  console.log(`To Test:`)
  console.log(`http://localhost:3000/`)
})
