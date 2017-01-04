var fs = require("fs");
var inquirer = require("inquirer");


var clozeCard = {
	makeCard: function(){
			inquirer.prompt([
			{
				type: "input",
				message: "First part of Question -",
				name: "question1"
			},
			{
				type: "input",
				message: "Answer?",
				name: "answer"
			},
			{
				type: "input",
				message: "Second part of Question -",
				name: "question2"
			}
			]).then(function(flash){
					console.log(flash.question1 + " --- " + flash.answer + " --- " + flash.question2);
					var newQuest = new addQuestion(flash.question1, flash.question2, flash.answer);
					newQuest.add();
				});
	},
	play: function(counter){
		fs.readFile("clozecard.txt", "utf8", function(error, data){
	
			if(error){
				console.log(error);
			}
			// put the data into strings into an array
			data = data.split("\n");

			if(counter >= data.length){
				console.log("--- No more cards ---");
				return true;
			}
			if(counter == 0 || counter % 3 == 0) {
				console.log("  ---\n\t-----Question: \n" 
					+ data[counter] + "_______" + data[counter + 1] + "\n  ");
				var text1 = data[counter];
				counter++;
				var text2 = data[counter];
				inquirer.prompt([
					{
						type: "confirm",
						message:" --press <return/enter> for the answer --",
						name:"question"
					}
				]).then(function(){
					counter++;
					console.log(" --\n\tAnswer: " + data[counter] + "\n  ");
					console.log("\n\t" + text1 + " " + data[counter] +
						" " + text2 + "\n");
					counter++;

					clozeCard.play(counter);
				});
			}
			

		});
	}
};

function addQuestion(front1, front2, back){
	this.front1 = front1;
	this.front2 = front2;
	this.back = back;
	this.add = function() {
		fs.appendFile("clozecard.txt", "\n" + this.front1 + "\n" + this.front2 + "\n" + this.back);
	}
};



module.exports = clozeCard;

