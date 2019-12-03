// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAatjnz9owo7qT1QGsm34ZGmMGSnE7j8Ew",
    authDomain: "hangman-scoreboard.firebaseapp.com",
    databaseURL: "https://hangman-scoreboard.firebaseio.com",
    projectId: "hangman-scoreboard",
    storageBucket: "hangman-scoreboard.appspot.com",
    messagingSenderId: "827559208264",
    appId: "1:827559208264:web:d4b6a09bbd5afd9fa4ff7d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setup access to the database
let db = firebase.firestore();

// let scores = 0;



function saveScore() {
    // Get name from input box
    let name = document.getElementById('name').value;

    // Make sure name has a value, if not send alert.
    if (name !== "") {
        // Add a new document in collection "scores"
        db.collection("scores").doc().set({
            name: name,
            score: score
        })
            .then(function () {
                console.log("Document successfully written!");
                updateScores();
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    } else {
        alert('Please enter a name');
    }
}

function updateScores() {
    // Clear current scores in our scoreboard
    document.getElementById('scoreboard').innerHTML = '<tr><th>Name</th><th>Score</th></tr>';

    // Get the top 5 scores from our scoreboard
    db.collection("scores").orderBy("score", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById('scoreboard').innerHTML += '<tr>' +
                '<td>' + doc.data().name + '</td>' +
                '<td>' + doc.data().score + '</td>' +
                '</tr>';
        })
    })
}

window.onload = updateScores();