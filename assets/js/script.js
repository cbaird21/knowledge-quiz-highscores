var questions = document.querySelector(".quiz");
var timerEl = document.getElementById("seconds");
var startBtn = document
  .querySelector(".start_btn")
  .addEventListener("click", runQuiz);
// var timeLeft = countDown - now;

var questionsArr = [
  {
    title: "Commonly used data types Do not include.",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statment is encolsed with _____.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
  },
  {
    title:
      "String values must be enclosed with _____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
];
// console.log(questions[0].answer);

function runQuiz() {
  document.querySelector(".title").textContent = questions[0].title;
  document.querySelector(".choices").textContent = questions[0].choices;
}
function countDown() {
  var timerEl = document.getElementById("seconds");
  var timeLeft = 75;
  var timer = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + "seconds remaining";
      timeLeft--;
    } else {
      // Use `clearInterval()` to stop the timer
      clearInterval(timer);
    }
  }, 1000);
}
countDown();
