var express = require('express');
var router = express.Router();
const https = require('https');
const API_KEY = '34fcbe59a99ae8b938944b5886537c60'


router.get('/', function(req, res, next) {
  res.render('index', { title: 'food2Fork' });
});

router.post('/recipe_page', function(req, res) {
    var obj = { search: req.body.search};
    sendRequest(obj.search,res) ;
});

function sendRequest(search,res) {
  let options = {
    host:'www.food2fork.com',
    path:`/api/search?q=${search}&key=${API_KEY}`
  }

  https.request(options,(apiResponse)=>{//https request
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

  if (data) {
    // console.log(data);
    let obj = JSON.parse(data)
    // console.log(obj);
    res.render('recipe_page', { title: 'i got your recipe', items: obj.recipes });

  }
}



module.exports = router;
