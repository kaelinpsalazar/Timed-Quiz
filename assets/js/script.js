var currentIndex = 0;

var timerID;
// Bring in important HTML variables (ID's)
var timerEl = document.getElementById("time");

var startScreenEl = document.getElementById("startscreen");

var startbtn = document.getElementById("start");

// var submitbtn = getElementById("submit");

var questionsEl = document.getElementById("questions");

var titleEl = document.getElementById("questiontitle");

var choicesEl = document.getElementById("choices");

var endEl = document.getElementById("end");

var initialsEl = document.getElementById("initials");

var finalScoreEl = document.getElementById("final-score");

var submitbtn = document.getElementById("submit");



// var finalScoreEl = getElementById("final-score");


var checkAnswerEl = document.getElementById("check");



// List all questions and answers in an array
var questions = [
  {    title: "Commonly used data types DO NOT include:",

    choices: ["strings", "booleans", "alerts", "numbers"],

    answer: "alerts",  },

  {    title: "The condition in an if / else statement is enclosed within ____.",

    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],

    answer: "parentheses",  },

  {
    title: "What is the meaning of life? ",
    choices: ["To have a family.", "To get a good education and be happy.", "To travel and love your life", "42"],
    answer: "42",
  },
  
  {
    title: "What do I use when I want to stop a button from refreshing the page?",
    choices: ["event.stopPropagation()", "addEventListener", "window.location.href", "<script>"],
    answer: "event.stopPropagation()",
  },
];



var time = questions.length * 15;
// setting timer length at 60 based on how many questions you have

function timeInterval() {
  time--;
  // time is subtracted by one
  timerEl.textContent = time;
  // if time =0, the quiz is over
  if (time <= 0) {
    quizEnd();
  }
}

// function to start the quiz, hide the start screen when quiz starts, make your questions appear, and begin the countdown clock.
function startQuiz() {
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerID = setInterval(timeInterval, 1000);

  timerEl.textContent = time;
  
  getQuestion();
}

// then make a fuction that begins cycling through the array of questions. 
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

// this function ends the quiz, stops the timer, presents your score, and hides the sections that are no longer needed.
function quizEnd() {
  clearInterval(timerID);

  choicesEl.setAttribute("class", "hide");
  
  questionsEl.setAttribute("class", "hide");
  
  endEl.removeAttribute("class", "hide");
  
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  }

  function saveScore(){

  // saving my score array
  var LOCAL_STORAGE_KEY = "scores"
  // var submitbtn = document.getElementById("submit");
  var listEl = document.querySelector("ol");  
  var scores = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
 
  
  
  var createListItem = function (score) {
    var liEl = document.createElement("li");
    liEl.textContent = score.initialsEl + " - " + score.finalScoreEl;
    return liEl;
  };
  
  var renderScores = function() {
    if (!listEl){
      return;
    }
    listEl.innerHTML = "";
    for (let i = 0; i < scores.length; i += 1) {
      let score = scores [i];
      let liEl = createListItem(score);
      listEl.append(liEl); 
    }
  };
  
  submitbtn.addEventListener("click", function() { 
    var score = {
      initialsEl,
      finalScoreEl,
    }
    
    scores.push(score);
    scores.sort(function (a, b) {
      return b.value - a.value;
    });
    while (scores.length > 10) {
      scores.pop();
    }
    renderScores();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores));
  });
  
  renderScores();
}



submitbtn.onclick = saveScore;
startbtn.onclick = startQuiz;

