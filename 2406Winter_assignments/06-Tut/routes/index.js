var express = require('express');
var router = express.Router();
let mc = require('mongodb').MongoClient
// // let mg = require('mongoose')

let database
mc.connect('mongodb://localhost:27017', (err, client) => {
	database = client.db("graph-demo").collection("sample")


})
// var answers = [];
var questions = {
	color: "Favorite color?",
	day: "Favorite day of the week?",
	dog: "Favorite dog breed?"
}
//manually loop all objects in database
function calcResultsStats(answers) {
	var resultsStats = [];
	//transfor answer
	//count
	//insert
	//return result
	let keys = []
	keys = Object.keys(questions)
	for (let key of keys) {
		//key==color
		let result = {}

		result.questionName = key
		result.questionText = questions[key]
		result.labels = []
		result.values = []

		let count = {}
		for (let ans of answers) {
			let ansKeys = []
			anskeys = Object.keys(ans)
			for (let ansKey of anskeys) {
				let val = {
					label: ans[ansKey],
				}
				if (ansKey == key) {
					result.labels.push(val.label)
					//delete duplicates
					//match count ans value pair
					if (count[val.label]) {
						result.labels.pop(val.label)
						count[val.label]++
					} else {
						count[val.label] = 1
					}
				}
			}
		}//end answers
		for (let i in count) {
			result.values.push(count[i])
		}
		console.log(result);
		resultsStats.push(result)
	}
	return resultsStats
}

// { questionName: 'color',
//   questionText: 'Favorite color?',
//   labels: [ 'd', 'f' ],
//   values: [ 1, 2 ] }


router.get('/', function (req, res) {
	res.render('index', {
		title: ' Graphing Demo',
		questions: questions
	});
});

router.post('/add', function (req, res) {
	 answer = {
		firstname: req.body.firstname,
		color: req.body.color,
		day: req.body.day,
		dog:req.body.dog
	}
	// answers.push(answer);
	// console.log(answer);
	res.redirect('/results');
});
var answer

router.get('/results', function (req, res) {
	var stats
	database.insertOne(answer,(err,result)=>{
		database.find().toArray((err,allObj)=>{
			if(err)throw err
			if(allObj){
			 stats = calcResultsStats(allObj);
			 res.render('results', {
				title: 'Survey Results',
				stats: stats,
				barwidth: 60
			});
		}
		})
	})

	

	
});

module.exports = router;
