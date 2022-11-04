// declare global variables
var score = 0;
var questionIndex = 0;
var penalty = 10;
var scores = [];
var header = document.getElementById("header");
var timerEl = document.getElementById("seconds");
var container = document.getElementById("container");
var questionDiv = document.getElementById("questionDiv");
var startBtn = document.getElementById("start-button");
var highScores = document.getElementById("highScores");
// created new element
var olCreate = document.createElement("ol");
var resetBtn = document.getElementById("resetBtn");
var resetEl = document.getElementById("resetBox");
// hides reset button on page
resetEl.style.visibility = "hidden";
// var holdInterval = 0;
// questions array of objects
var questions = [
  {
    title: "Commonly used data types Do not include.",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statment is encolsed with _.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
  },
  {
    title:
      "String values must be enclosed with  when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
];
var timeLeft = 75;
// added event listener for click on function to start quiz and timer
function startQuiz() {
  // timer that counts down from 75
  var timer = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = "Timer: " + timeLeft + " seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = "Timer: " + timeLeft + "second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = "Out of time!";
      // Use clearInterval() to stop the timer
      clearInterval(timer);
    }
    // clearing timer if finished before timer runs out
    if (questionIndex >= questions.length) {
      timerEl.textContent = "Time to spare!";
      clearInterval();
    }
  }, 1000);
  renderQuestion(questionIndex); //question index = 0
  // is this where shufftleQuestions= questions.sort(() => Math.random()- .5)
}

startBtn.addEventListener("click", startQuiz);

function renderQuestion(questionIndex) {
  questionDiv.textContent = "";
  olCreate.textContent = "";
  // for loop to iterate through the questions array and set variables for question and choices
  for (var i = 0; i < questions.length; i++) {
    var liveQuestion = questions[questionIndex].title;
    var liveChoices = questions[questionIndex].choices;
    // render question to page
    questionDiv.textContent = liveQuestion;
  }
  // for each of question choices create li and append element in choices
  liveChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    listItem.setAttribute("type", "A");
    questionDiv.appendChild(olCreate);
    olCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
// comparing the answer input to true answer
function compare(event) {
  var element = event.target;
  if (element.matches("li")) {
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "answerDiv");

    // if correct
    if (element.textContent === questions[questionIndex].answer) {
      score++;
      answerDiv.textContent =
        "Correct!! the answer is: " + questions[questionIndex].answer;
      // if incorrect
    } else {
      timeLeft = timeLeft - penalty;
      answerDiv.textContent =
        "Wrong!! The correct answer is: " +
        questions[questionIndex].answer +
        "You have been docked " +
        penalty +
        " seconds..";
    }
  }
  questionIndex++;

  if (questionIndex >= questions.length) {
    answerDiv.textContent = "End of Quiz!";
    finish();
  } else {
    renderQuestion(questionIndex);
  }
  questionDiv.appendChild(answerDiv);
}
// created finish function. what  to say and how to calculate the number of true answers.
function finish() {
  questionDiv.textContent = "";
  timerEl.textContent = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "You finished!!";

  questionDiv.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("p", "createP");
  createP.textContent =
    "You got " + score + "/" + questions.length + " correct!!";

  questionDiv.appendChild(createP);

  createForm();
}
// creating form to fill out for highscores after the game
function createForm() {
  // creates form element to hold input and submit button
  var createForm = document.createElement("form");
  createForm.setAttribute("id", "create input");

  // create Input element and provide style and attributes
  var createInput = document.createElement("input");
  createInput.setAttribute("id", "createInput");
  createInput.setAttribute("name", "userName");
  createInput.setAttribute("placeholder", "Enter your name...");
  // button to hit after finishing input data
  var createBtn = document.createElement("button");
  createBtn.setAttribute("id", "createBtn");
  createBtn.setAttribute("type", "button");
  createBtn.textContent = "Save your score!";
  // saving content with event listener

  // added event listneer to what the user inputs
  createBtn.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("user", "createInput.value");
    console.log(createInput.value);
    highScores.style.visibility = "visible";
    questionDiv.style.visibility = "hidden";
    resetEl.style.visibility = "hidden";
  });

  // appending created elements to the page
  createForm.appendChild(createInput);
  createForm.appendChild(createBtn);
  questionDiv.appendChild(createForm);

  var submitBtn = document.getElementById("createBtn");
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveHighScore();
  });
}
// still need to create a place to store multiple score to be able to navigate too when clicking high score.array?user.push?
function saveHighScore() {
  var finalScore = score / questions.length + timeLeft;
  var userName = document.getElementById("createInput").value;
  console.log("Username:" + userName);
  console.log("Score" + finalScore);
  var highScoreObject = {
    initals: userName,
    score: finalScore,
  };
  scores.push(highScoreObject);
  localStorage.setItem("highScores", JSON.stringify(scores));
  viewHighScore();
}
// Is this variable needed or how do i reference this data when view high scores is selected on the website.
// var viewHighScore = document.getElementById("viewHighScore")
function viewHighScore() {
  highScores.innerHTML = "";
  var localScoresStorage = JSON.parse(localStorage.getItem("highScores")) || [];
  console.log(localScoresStorage);
  for (var i = 0; i < localScoresStorage.length; i++) {
    var scoresDiv = document.createElement("div");
    scoresDiv.textContent = `${localScoresStorage[i].initals}: ${localScoresStorage[i].score} `;
    highScores.appendChild(scoresDiv);
  }
  resetEl.style.visibility = "visible";
}

// reset button functions and what to reset everything too!
resetBtn.addEventListener("click", function () {
  score = 0;
  questionIndex = 0;
  timeLeft = 75;
  highScores.style.visibility = "hidden";
  questionDiv.style.visibility = "visible";
  resetEl.style.visibility = "hidden";
  startQuiz();
});
