
//request format
//https://www.food2fork.com/api/search?key=${API_KEY}&q=${ingredient}


// response api object format

// { count: 30,
//   recipes:
//    [ { publisher: 'Closet Cooking',
//        f2f_url: 'http://food2fork.com/view/35382',
//        title: 'Jalapeno Popper Grilled Cheese Sandwich',
//        source_url:
//         'http://www.closetcooking.com/2011/04/jalapeno-popper-grilled-cheese-sandwich.html',
//        recipe_id: '35382',
//        image_url:
//         'http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg',
//        social_rank: 100,
//        publisher_url: 'http://closetcooking.com' },





let https = require('https')
const http = require('http');
let url = require('url')
let qstring = require('querystring')
const PORT = process.env.PORT || 3000


const API_KEY = '34fcbe59a99ae8b938944b5886537c60'


//post request query to food2fork api
function sendRequest(search,res) {
  let options = {
    host:'www.food2fork.com',
    path:`/api/search?q=${search}&key=${API_KEY}`
  }

  https.request(options,(apiResponse)=>{
    handleApiResponse(apiResponse,res)
  }).end()
}

//get response from food2fork api
function handleApiResponse(apiResponse,res) {
  let apiResponseData = ''
  apiResponse.on('data',(chunk)=>{
    apiResponseData += chunk
  })
  apiResponse.on('end',()=>{
    sendResponse(apiResponseData,res)
  })
}
//response api-response to my server
function sendResponse(data,res) {
  let page = `<html>
  <head>search food2Fork</head>
  <body>
  <form method = 'post'>
  Search your recipes: <input name="search" type = "text" placeholder="Search by ingredients or name">
  <input type="submit" value="search">
  </form>`

  if (data) {
    data = JSON.parse(data)
    page+=`<table>
    <tr>
    <th>title</th>
    <th>rank</th>
    <th>detail</th>
    </tr>`
    for (recipe of data['recipes']) {
      page+=`
      <tr>
      <td>${recipe.title}</td>
      <td>${recipe.social_rank}</td>
      <td><a href=${recipe.f2f_url}><img src=${recipe.image_url}></a></td>
      </tr>
      `
    }
    page+= ` </table>`
  }

  page+=`</body>
  </html>`
  // if (data) {
  //   page=data
  // }
  res.end(page)
}
//create server
http.createServer((req,res)=>{
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
      sendRequest(queryParams.search, res)//only send query string data
    })
  }
   if (req.method=="GET") {
    let reqData_get = ''
    req.on('data',chunck=>{
      reqData_get +=chunck
    })

    req.on('end',()=>{
      let req_search = qstring.parse(query).search
      if (req_search) {
        sendRequest(req_search,res)
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
