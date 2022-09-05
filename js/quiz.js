function Quiz(quizQuestions){
    this.quizQuestions = quizQuestions;
    this.quizQuestionIndex = 0;
    this.quizScore = 0;
}

Quiz.prototype.getQuizQuestionByIndex = function (){
    return this.quizQuestions[this.quizQuestionIndex];
}


Quiz.prototype.checkOptionWithQuestionAnswer = function(questionAnswer) {
    if(this.getQuizQuestionByIndex().isCorrectAnswerOfQuestion(questionAnswer)) {
        this.quizScore++;
    }

    this.quizQuestionIndex++;
}

Quiz.prototype.hasEnded = function() {
    return this.quizQuestionIndex === this.quizQuestions.length;
}

function QuizQuestion(questionText, questionChoices, questionAnswer) {
    this.questionText = questionText;
    this.questionChoices = questionChoices;
    this.questionAnswer = questionAnswer;
}

QuizQuestion.prototype.isCorrectAnswerOfQuestion = function(questionChoice) {
    return this.questionAnswer === questionChoice;
}

function loadQuizQuestions() {
    if(quizObject.hasEnded()) {
        showQuizScore();
    } else {
      
      var questionElement = document.getElementById("question");
      questionElement.innerHTML = quizObject.getQuizQuestionByIndex().questionText;

      // show options
      var quizQuestionChoices = quizObject.getQuizQuestionByIndex().questionChoices;
      for(var i = 0; i < quizQuestionChoices.length; i++) {
          var questionChoiceElement = document.getElementById("choice" + i);
          questionChoiceElement.innerHTML = quizQuestionChoices[i];
          showQuestionOptionButtons("btn" + i, quizQuestionChoices[i]);
      }

      showQuizProgress();
    }
};

function showQuestionOptionButtons(choiceId, questionChoiceValue) {
    var choiceButtonElement = document.getElementById(choiceId);
    choiceButtonElement.onclick = function() {
        quizObject.checkOptionWithQuestionAnswer(questionChoiceValue);
        loadQuizQuestions();
    }
};
  
  
function showQuizProgress() {
    var currentQuestionNumber = quizObject.quizQuestionIndex + 1;
    var quizProgressElement = document.getElementById("progress");
    quizProgressElement.innerHTML = "Question " + currentQuestionNumber + " of " + quizObject.quizQuestions.length;
};
  
function showQuizScore() {
    var currentQuizScore = quizObject.quizScore;
    var totalQuizQuestions = quizObject.quizQuestions.length;

    totalQuizQuestions = totalQuizQuestions > 0 ? totalQuizQuestions:0; 

    var quizScorePercentage = (totalQuizQuestions === 0 || currentQuizScore === 0) ? 0 : (currentQuizScore/totalQuizQuestions) * 100;

    var QuizOverOutput = "<h1>Result</h1>";
    QuizOverOutput += "<h2 id='score'> Your scores: " + currentQuizScore + ".And mark percentage is: "+ quizScorePercentage +"%"+"</h2>";
    var quizElement = document.getElementById("quiz");
    quizElement.innerHTML = QuizOverOutput;
};



var questionsData = [
    new QuizQuestion("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new QuizQuestion("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new QuizQuestion("Which is not a JavaScript Engine?", ["Chakra", "Spider Monkey","V8", "NodeJS"], "NodeJS"),
    new QuizQuestion("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new QuizQuestion("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

var quizObject = new Quiz(questionsData);

loadQuizQuestions();