// for the testing purpose, only 4 words in the array.
// hint
let arrayOfDefs;
let arrayOfAnswers;

let answerChr;

let arrayOfCorrectGuesses;

let arrayOfGuesses;
let userGuess;
let hangmanImages;
let lives;
let score;
// How many guesses the user can have before they have to stop playing

// randomly picks a word from choices
let generatedAnswer;
let answerArray;

const letters = alpha();

function animate_toggle() {
    let x = document.getElementById("wordDefID");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}
function changeDefinition(generatedAnswer) {
    console.log(generatedAnswer);
    console.log(arrayOfDefs[generatedAnswer]);
    // changes the definition based on the word
    document.getElementById("wordDefID").innerHTML = arrayOfDefs[generatedAnswer];


}

// sets up the lines for the word
function wordSpace(answer) {
    // makes the lines for the word
    for (let i = 0; i < answer.length; i++) {
        answerArray[i] = " " + "_";
        let guess = document.getElementById("guesses");
        guess.append(answerArray[i]);


    }
}

// fills the word slots if letter correct
function fillWords(guess) {
    for (let i = 0; i < generatedAnswer.length; i++) {
        // Loop from 0 to the length of the answer
        if (generatedAnswer[i] === guess) {
            // If the argument is in the answer then add it to a list.

            // We will REPLACE the blank space with the correct letter at index i
            answerArray[i] = guess;
            // answerArray is an array filled with blank spaces. It is global.
            // answerArray is assigned the blank spaces in the function wordSpace.
        }
    }
    // Redisplays the word lines with letters
    let wordDisplay = "";
    for (let i = 0; i < generatedAnswer.length; i++) {
        // Loop from 0 to the length of the answer

        // Create a new string that will hold an updated version of the displayed answer
        wordDisplay += " " + answerArray[i];

    }
    // When the loop is finish update the element with the updated display.
    document.getElementById("guesses").innerHTML = wordDisplay;
    return false;
}

function hangmanImage() {
    document.getElementById("hangman").style.visibility = "visible";
    document.getElementById("hangman").src = "images/hangman_" + hangmanImages + ".gif";
    hangmanImages += 1;
}

function alpha() {
    // This is used to the alphabet
    let alphabet = [];
    for (let i = 65; i < 91; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
    // Return a list of capital letters from A - Z
}

function generateButton() {

    for (let i = 0; i < 26; i++) {
        // We are looping from 0 to 26 because we want to add every button the html page.
        // letters is a list of the entire alphabet; global variable

        let buttonLetter = letters[i];

        let button = new Button(buttonLetter);
        // Create a button in an object constructor
        console.log(button);


        button.btn.addEventListener("click", function () {
            // Add an event to the button once it is made.
            // console.log(`You clicked on the ${button.btn.innerHTML} button.`)
            // The event will print every time it is clicked.

            document.getElementById(buttonLetter).style.visibility = "hidden";
            /*
            MAYBE-WANT-TO-INCLUDE: It may be easier to give the elements all the same class.

            First, they all start off having the class: unclicked , meaning they're are still
            active buttons.

            Once they're clicked we should change the class to clicked. So any button with this
            class will have it's style changed to hidden in the CSS file.

            And when the game ends because the user won/lost we can then create a function to
            disable all active buttons.

            */
            arrayOfGuesses.push(buttonLetter);

            compareLetterWithAnswer(buttonLetter);
            // This function is to check whether a correct letter was selected or not.
            // It will console right or wrong

            fillWords(buttonLetter);
            // Once the button is clicked on we


            displayGuesses()


            gameOver();
            // Whenever any button is clicked we want to check to make sure the user hasn't reached zero lives yet.
            // If the user reaches zero lives the game should end.
        })
    }
}

function compareLetterWithAnswer(letter) {
    // The dummyWord is all caps because all of the buttons are uppercased. This can be changed how the group likes it with methods .toLowerCase()

    if (!generatedAnswer.includes(letter)) {
        // This checks the letter, but it also checks whether is it capitalized or not.
        console.log(">:) That was incorrect.");

        // If generatedAnswer does not have argument letter in it, it means the user guessed incorrectly.
        subtractLife();
        // Decrease the amount of lives the user has left.

        loseScore();
        // Remove points from the user.

        hangmanImage();
        //adds hangman
    } else {

        earnScore(letter);
        console.log("That was the right letter.");

    }
    document.getElementById("scoreID").innerHTML = score;
}

function displayGuesses() {
    // makes the lines for the word
    let displayGuess = arrayOfGuesses[0]
    for (let i = 1; i < arrayOfGuesses.length; i++) {
        displayGuess += ", " + arrayOfGuesses[i];
    }
    let guess = document.getElementById("guessID");
    guess.innerHTML = displayGuess;
}


function Button(alphaLetter) {
    // This object constructer takes in one argument. alphaLetter -> string
    // The argument is the letter of this button.
    this.btn = document.createElement("button");
    this.btn.id = alphaLetter;
    this.btn.classList.add("btns");
    // The id of this button will be the same as the letter it represents.
    // this.btn.style.width = "50px";
    // this.btn.style.height = "50px";
    this.btn.style.margin = '0.5em';
    this.btn.innerHTML = alphaLetter;
    // Adjust the innerHTML so that is represents the letter this button was given.

    let area = document.getElementById("buttons");
    area.appendChild(this.btn);
}
// var x = window.matchMedia("(max-width: 700px)")
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes

function disPlayDefinition() {
    // This is supposed the choose a random word.
    // This word is the one that users will be guessing

    let i = Math.floor(Math.random() * 4);  // i: 0~3 for the testing purpose

    document.getElementById("wordDefID").innerHTML = arrayOfDefs[i];
    document.getElementById("answerID").innerHTML = arrayOfAnswers[i];
    return i;
}





function earnScore(guess) {
    /*
    One argument; guess; a letter

    If guess appears in generated answer than add one to score.

    TO-MAYBE-DO: This can be done better by placing all the correct letters in an array.
    Once we figure out how many times a letter appears in the array we remove it.
    This will prevent us having to go over the same length list every time.

    */
    for (let i = 0; i < generatedAnswer.length; i++) {
        if (generatedAnswer[i] == guess) {
            score++;
        }
    }

    // TO-DO: Add an element the HTML that holds the current score of the user.

}

function loseScore() {
    score--;
}


function subtractLife() {
    // If the user guesses the incorrect answer than run this function to adjust the amount of lives/chances the user has left.
    lives -= 1;
    // Subtract lives by 1
    document.getElementById("lifeID").innerHTML = lives;
    // Change lifeID to represnt how many lives are left.

}




function gameOver() {
    if (lives === 0) {
        let endGameUserInfo = prompt("Please enter your name.", "username") + ", your score is " + score + ".";
        document.getElementById("guessID").innerHTML = "Game Over! " + endGameUserInfo;

        disableButtons();

    }


}

function disableButtons() {
    // Function to disable all buttons.
    for (let i = 0; i < 26; i++) {
        // letters is an array of the alphabet
        document.getElementById(letters[i]).disabled = true;
    }
}


// TODO: reset button
// TODO: let boundary for score - make sure it doesn't go down below zero

function reset() {

    document.getElementById("hangman").style.visibility = "hidden";
    document.getElementById("guessID").innerHTML = ".........";
    document.getElementById("lifeID").innerHTML = "7";
    document.getElementById("scoreID").innerHTML = "0";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("guesses").innerHTML = "";
    main();

}





function main() {
    arrayOfDefs = {
        // This is a dictionary.
        // The keys are words, and the values are their hints
        "TATTOO": "a form of body modification where a design is made by inserting ink",
        "ELECTRICITY": "the set of physical phenomena associated with the presence and motion of electric charge",
        "COMMITTEE": "a group of people chosen to do a particular job, make decisions",
        "SYSTEM": "a group of related parts that work together as a whole for a particular purpose"
    };

    arrayOfAnswers = ["TATTOO", "ELECTRICITY", "COMMITTEE", "SYSTEM"];
    // This is a list of all he possible words that can be chosen

    answerChr = [];

    arrayOfCorrectGuesses = [];

    arrayOfGuesses = [];
    userGuess = "";
    lives = 7;


    score = 0;
    // randomly picks a word from choices
    generatedAnswer = arrayOfAnswers[Math.floor(Math.random() * arrayOfAnswers.length)];
    answerArray = [];
    hangmanImages = 0;
    console.log(answerArray)


    generateButton();

    changeDefinition(generatedAnswer);
    wordSpace(generatedAnswer);
    // fillWords(generatedAnswer);
}

main();
document.getElementById("resetButton").onclick = reset;

