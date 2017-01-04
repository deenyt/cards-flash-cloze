var fs = require("fs");
var inquirer = require("inquirer");


var flashCard = {
	makeCard: function(){
			inquirer.prompt([
			{
				type: "input",
				message: "Question?",
				name: "question"
			},
			{
				type: "input",
				message: "Answer?",
				name: "answer"
			}
			]).then(function(flash){
					console.log(flash.question + " --- " + flash.answer);
					var newQuest = new addQuestion(flash.question, flash.answer);
					newQuest.add();
				});
	},
	play: function(counter){
		fs.readFile("flashcard.txt", "utf8", function(error, data){
	
			if(error){
				console.log(error);
			}
			// put the data into strings into an array
			data = data.split("\n");

			if(counter >= data.length){
				console.log("--- No more cards ---");
				return true;
			}
			if(counter == 0 || counter % 2 == 0) {
				console.log("---\n   ---\n\tQuestion: " + data[counter] + "\n   ---\n---");
				inquirer.prompt([
					{
						type: "confirm",
						message:" --press <return/enter> for the answer --",
						name:"question"
					}
				]).then(function(){
					counter++;
					console.log("--\n   --\n\tAnswer: " + data[counter] + "\n   ---\n---");
					counter++;

					flashCard.play(counter);
				});
			}
			

		});
	}
};

function addQuestion(front, back){
	this.front = front;
	this.back = back;
	this.add = function() {
		fs.appendFile("flashcard.txt", "\n" + this.front + "\n" + this.back);
	}
};

module.exports = flashCard;

