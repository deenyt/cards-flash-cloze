var inquirer = require("inquirer");
var fs = require("fs");
var flashCard = require("./basicFlashCard.js");
var clozeCard = require("./clozeFlashCard.js");
var counter = 0;


start = function() {
    inquirer.prompt([
    {
        type: 'list',
        message: "--------- Choose :  ",
        choices: ["Make FlashCards", "Make ClozeCards", "Play FlashCards", "Play ClozeCards"],
        name: "action"
    }
    ]).then(function(response){
        switch (response.action) {
            // Make Clozecard
            case "Make ClozeCards":
            clozeCard.makeCard();
            console.log("at MC");
            break;
            // Make Flashcard
            case "Make FlashCards":
            flashCard.makeCard();
            break;
            // Play Flashcards
            case "Play FlashCards":
            flashCard.play(0);
            break;
            // Play Clozecards
            case "Play ClozeCards":
            clozeCard.play(0);
            break;
            default:
            console.log("error in selecting");
            break;
        }
    });
}

start();
