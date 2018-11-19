var questions = {
	color: "Favorite color?",
	day: "Favorite day of the week?",
	dog: "Favorite dog breed?"
}
var answer1 = {
	firstname: "aa",
	color: "green",
	day: "Tuesday",
	dog: "Favorite dog breed?"

}
var answer2 = {
	firstname: "bb",
	color: "red",
	day: "Monday",
	dog: "Favorite dog breed?"

}
var answer3 = {
	firstname: "aa",
	color: "green",
	day: "Tuesday",
	dog: "Favorite dog breed?"

}
var answers = []
answers.push(answer1)
answers.push(answer2)
answers.push(answer3)

function cal() {
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
			//ans==ans1
			let ansKeys = []
			anskeys = Object.keys(ans)
			for (let ansKey of anskeys) {
				//anskey==color

				//val.lable==red
				let val = {
					label: ans[ansKey],
				}

				//get labs
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
		// return resultsStats


	}
	return resultsStats
	// console.log(resultsStats);
}
console.log(cal());




