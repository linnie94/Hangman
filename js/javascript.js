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
let wordDisplay = "";
let numOfFilled = 0;
let username = "";
const letters = alpha();


// Changes the definition based on the word
function changeDefinition(generatedAnswer) {

    document.getElementById("wordDefID").innerHTML = arrayOfDefs[generatedAnswer];
}

// Clear the 'guesses' element before setting up a new word
function clearGuesses() {
    answersArray = [];
    let guess = document.getElementById("guesses");
    guess.innerHTML = "";
}

// Sets up the lines for the word
function wordSpace(answer) {
    // Clear the guesses
    clearGuesses();

    // Makes the lines for the word
    for (let i = 0; i < answer.length; i++) {
        answerArray[i] = " " + "_";
        let guess = document.getElementById("guesses");
        guess.append(answerArray[i]);
    }
}

// Fills the word slots if letter correct
function fillWords(guess) {
    for (let i = 0; i < generatedAnswer.length; i++) {
        // Loop from 0 to the length of the answer
        if (generatedAnswer[i] === guess) {
            // If the argument is in the answer then add it to a list.

            // We will REPLACE the blank space with the correct letter at index i
            answerArray[i] = guess;
            // answerArray is an array filled with blank spaces. It is global.
            // answerArray is assigned the blank spaces in the function wordSpace.
            numOfFilled++;
        }
    }

    // Redisplays the word lines with letters
    wordDisplay = answerArray.join(" ");
    // When the loop is finish update the element with the updated display.
    document.getElementById("guesses").innerHTML = wordDisplay;

    return numOfFilled;
}

// Display the hangman image
function hangmanImage() {
    document.getElementById("hangman").style.visibility = "visible";
    document.getElementById("hangman").src = "images/hangman_" + hangmanImages + ".gif";
    hangmanImages += 1;
}

// Create alphabets from A-Z
function alpha() {
    // This is used to the alphabet
    let alphabet = [];
    for (let i = 65; i < 91; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
    // Return a list of capital letters from A - Z
}

// Generate the alphabet buttons to be used for the game
function generateButton() {
    // We are looping from 0 to 26 because we want to add every button the html page.
    // letters is a list of the entire alphabet; global variable
    for (let i = 0; i < 26; i++) {
        let buttonLetter = letters[i];

        // Create a button in an object constructor
        let button = new Button(buttonLetter);
        document.getElementById(buttonLetter).style.backgroundColor='white';

        // Add an event to the button once it is made.
        // The event will print every time it is clicked.
        button.btn.addEventListener("click", function () {
            // Hide scoreboard on button click
            if (document.getElementById("scoreboard").style.display == "block") {
                document.getElementById("scoreboard").style.display = "none";
            }

            document.getElementById(buttonLetter).disabled = true;
            document.getElementById(buttonLetter).style.borderColor = 'white';
            document.getElementById(buttonLetter).style.backgroundColor='red';
            document.getElementById(buttonLetter).style.opacity='0.4';




            arrayOfGuesses.push(buttonLetter);

            // This function is to check whether a correct letter was selected or not.
            // It will console right or wrong
            compareLetterWithAnswer(buttonLetter);

            fillWords(buttonLetter);

            setTimeout(generateNextAnswer, 300);

            displayGuesses();

            // Whenever any button is clicked we want to check to make sure the user hasn't reached zero lives yet.
            // If the user reaches zero lives the game should end.
            gameOver();
        })
    }
}

// Check how many letters are filled.
// If a user guesses the actual word before losing lives, display a message.
// Generate a new question and definition.
// Bring hidden buttons back.
function generateNextAnswer() {
    if (numOfFilled === answerArray.length) {
        // Set a very short timeout on the alert to let the guesses refresh
        setTimeout(function () {
            window.alert("Congratulations! Are you ready for the next question?");
        }, 1);

        // Clear array of guess IDs
        arrayOfGuesses = [];

        generatedAnswer = arrayOfAnswers[Math.floor(Math.random() * arrayOfAnswers.length)];
        answerArray = [];
        wordDisplay = "";
        document.getElementById("wordDefID").style.display = "none";
        changeDefinition(generatedAnswer);
        wordSpace(generatedAnswer);
        enableAllButtons();
        numOfFilled = 0;
    }

    return numOfFilled;
}

// Enable all hidden buttons
function enableAllButtons() {
    let buttonLetter = "";
    for (let i = 65; i < 91; i++) {
        buttonLetter = String.fromCharCode(i);
        document.getElementById(buttonLetter).disabled = false;
        document.getElementById(buttonLetter).style.backgroundColor='white';
        document.getElementById(buttonLetter).style.opacity='1.0';
        document.getElementById(buttonLetter).style.borderWidth='3px';
        document.getElementById(buttonLetter).style.borderColor='black';
    }
}

// The dummyWord is all caps because all of the buttons are uppercased.
// This can be changed how the group likes it with methods .toLowerCase()
function compareLetterWithAnswer(letter) {
    // This checks the letter, but it also checks whether is it capitalized or not.
    if (!generatedAnswer.includes(letter)) {


        // If generatedAnswer does not have argument letter in it, it means the user guessed incorrectly.
        // Decrease the amount of lives the user has left.
        subtractLife();

        // Remove points from the user.
        loseScore();

        //adds hangman
        hangmanImage();
    } else {
        earnScore(letter);

    }
    document.getElementById("scoreID").innerHTML = score;
}

// Display all guesses used
function displayGuesses() {
    // Exit function if array of guesses is empty
    if (arrayOfGuesses.length == 0) {
        document.getElementById("guessID").innerHTML = ".........";
        return;
    }

    // makes the lines for the word
    let displayGuess = arrayOfGuesses[0];
    for (let i = 1; i < arrayOfGuesses.length; i++) {
        displayGuess += ", " + arrayOfGuesses[i];
    }
    let guess = document.getElementById("guessID");
    guess.innerHTML = displayGuess;
}


// This object constructer takes in one argument. alphaLetter -> string
// The argument is the letter of this button.
function Button(alphaLetter) {
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


// This is supposed the choose a random word.
// This word is the one that users will be guessing
function disPlayDefinition() {
    let i = Math.floor(Math.random() * arrayOfAnswers.length);  // i: 0~3 for the testing purpose

    document.getElementById("wordDefID").innerHTML = arrayOfDefs[i];
    document.getElementById("answerID").innerHTML = arrayOfAnswers[i];
    return i;
}

// One argument; guess; a letter
// If guess appears in generated answer than add one to score.
function earnScore(guess) {
    /*
    TO-MAYBE-DO: This can be done better by placing all the correct letters in an array.
    Once we figure out how many times a letter appears in the array we remove it.
    This will prevent us having to go over the same length list every time.
    */
    for (let i = 0; i < generatedAnswer.length; i++) {
        if (generatedAnswer[i] == guess) {
            score++;
        }
    }
}

// Decrement score when wrong button is clicked
function loseScore() {
    score--;
}

// If the user guesses the incorrect answer than run this function to adjust the amount of lives/chances the user has left.
function subtractLife() {
    // Subtract lives by 1
    lives -= 1;

    // Change lifeID to represnt how many lives are left.
    document.getElementById("lifeID").innerHTML = lives;
}

// Check end game condition
function gameOver() {
    if (lives === 0) {
        let name = "";
        while(true) {
            name = prompt("Please enter your name.", "username");
            if(name != null) {
                break;
            }
        }

    let message = name + ", your score is " + score + ".";
    window.alert("Game Over! " + message);

    document.getElementById("name").innerHTML = name;
    displayScoreboard();
    saveScore();
    updateScores();
    disableButtons();
    reset();
}

// Function to disable all buttons.
function disableButtons() {
    for (let i = 0; i < 26; i++) {
        // letters is an array of the alphabet
        document.getElementById(letters[i]).disabled = true;
    }
}

// Reset button behaviour
function reset() {
    arrayOfDefs = [];
    arrayOfAnswers = [];
    answerChr = [];
    arrayOfCorrectGuesses = [];
    arrayOfGuesses = [];
    userGuess = "";
    hangmanImages = 0;
    lives = 0;
    score = 0;
    username = "";
    arrayOfGuesses = [];
    answerArray = [];
    wordDisplay = "";
    numOfFilled = 0;

    document.getElementById("hangman").style.visibility = "hidden";
    document.getElementById("guessID").innerHTML = ".........";
    document.getElementById("lifeID").innerHTML = "7";
    document.getElementById("scoreID").innerHTML = "0";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("name").style.visibility = "hidden";
    document.getElementById("wordDefID").style.display = "none";
    document.getElementsByClassName('btns').disabled= false;
    displayScoreboard();
    main();
}

// Display the scoreboard
function displayScoreboard() {
    let board = document.getElementById("scoreboard");
    if (board.style.display === "block") {
        board.style.display = "none";
    }
    else {
        board.style.display = "block";
    }
}

function main() {
    arrayOfDefs = {
        // This is a dictionary.
        // The keys are words, and the values are their hints
        "TATTOO": "a form of body modification where a design is made by inserting ink",
        "ELECTRICITY": "the set of physical phenomena associated with the presence and motion of electric charge",
        "COMMITTEE": "a group of people chosen to do a particular job, make decisions",
        "SYSTEM": "a group of related parts that work together as a whole for a particular purpose",
        "KIOSK": "a small building in the street, where newspapers, sweets etc are sold",
        "MEMENTO": "a small thing that you keep to remind you of someone or something",
        "ZOMBIE": "someone who moves very slowly and does not seem to be thinking about what they are doing, especially because they are very tired",
        "OXYGEN": "a gas that has no colour or smell, is present in air, and is necessary for most animals and plants to live. It is a chemical element",
        "FISHHOOK": "a small hook with a sharp point at one end, that is fastened to the end of a long string in order to catch fish",
        "CRYPT": "a room under a church, used in the past for burying people"
    };

    arrayOfAnswers = ["TATTOO", "ELECTRICITY", "COMMITTEE", "SYSTEM", "KIOSK", "MEMENTO", "ZOMBIE", "OXYGEN", "FISHHOOK", "CRYPT"];
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


    generateButton();
    changeDefinition(generatedAnswer);
    wordSpace(generatedAnswer);

}

main();
document.getElementById("resetButton").onclick = reset;
document.getElementById("scoreboardButton").onclick = displayScoreboard;

