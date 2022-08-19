var currentIndex = 0;

var timerID;
// Bring in important HTML variables (ID's)
var timerEl = document.getElementById("time");

var startScreenEl = document.getElementById("startscreen");

var startbtn = document.getElementById("start");

var questionsEl = document.getElementById("questions");

var titleEl = document.getElementById("questiontitle");

var choicesEl = document.getElementById("choices");

var endEl = document.getElementById("end");


var submitbtn = document.getElementById("submit");

var checkAnswerEl = document.getElementById("check");



var questions = [
  {    title: "Commonly used data types DO NOT include:",

    choices: ["strings", "booleans", "alerts", "numbers"],

    answer: "alerts",  },

  {    title: "The condition in an if / else statement is enclosed within ____.",

    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],

    answer: "parentheses",  },

  {
    title: "Which of the following is a type of scope? ",
    choices: ["pari", "local", "mega)", "micro"],
    answer: "local",
  },

  {
    title: "What do I use when I want to stop a button from refreshing the page?",
    choices: ["event.stopPropagation()", "addEventListener", "window.location.href", "<script>"],
    answer: "event.stopPropagation()",
  },
];

// start function that start timer, hides start screen with a set attribute,then unhides the questions div, call show questions function

var time = questions.length * 15;
// setting timer length at 60

function timeInterval() {
  time--;
  timerEl.textContent = time;
  // refreshes time
  if (time <= 0) {
    quizEnd();
  }
}
// determines if time has run out

function startQuiz() {
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerID = setInterval(timeInterval, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentIndex];
  var titleEl = document.getElementById("questiontitle");
  titleEl.textContent = currentQuestion.title;
  choicesEl.textContent = "";

  currentQuestion.choices.forEach((option, i) => {
    var createButton = document.createElement("button");
    createButton.setAttribute("class", "option");
    createButton.setAttribute("value", option);
    createButton.textContent = i + 1 + ". " + option;
    // create an event listener for each option
    createButton.onclick = questionClick;
    // show on page
    choicesEl.appendChild(createButton);
  });
}
function questionClick() {
  // determine if the wrong answer was chosen
  if (this.value !== questions[currentIndex].answer) {
    // time penalty
    time -= 5;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;

    checkAnswerEl.textContent = "Wrong!";
  } else {
    // if right answer is chosen
    checkAnswerEl.textContent = "You got it!";
  }
  // show whether or not answer is right or wrong
  checkAnswerEl.setAttribute("class", "check");
  setTimeout(function () {
    checkAnswerEl.setAttribute("class", "check hide");
  }, 2500);
  // cycle to next question
  currentIndex++;
  // determine if questions have run out
  if (currentIndex === questions.length) {
    quizEnd();
  }
  else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerID);

  choicesEl.setAttribute("class", "hide");
  
  questionsEl.setAttribute("class", "hide");

  endEl.removeAttribute("class", "hide");
  
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  
}

startbtn.onclick = startQuiz;

