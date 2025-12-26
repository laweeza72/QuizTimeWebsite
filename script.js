const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What do you think is my biggest strength or best quality?",
    answers: [
      { text: "Unexpressive", correct: false },
      { text: "Intelligence", correct: false },
      { text: "Mental Toughness", correct: true },
      { text: "Versatility", correct: false },
    ],
  },
  {
    question: "If you had to describe my personality in 3 words, what would they be?",
    answers: [
      { text: "Agressive, Problematic, Crybaby", correct: false },
      { text: "Goofy, Loving, Understanding", correct: true },
      { text: "Extrovert, Curious, Thoughful", correct: false },
      { text: "Friendly, Jealous, Overconfident", correct: false },
    ],
  },
  {
    question: "What kind of career do you see me succeeding in?",
    answers: [
      { text: "Teaching/Mentoring", correct: false },
      { text: "Engineering", correct: false },
      { text: "Business/Startup", correct: false },
      { text: "Software/Tech", correct: true },
    ],
  },
  {
    question: "What's one habit of mine that stands out?",
    answers: [
      { text: "Helping Others", correct: false },
      { text: "Being quietly confident", correct: false },
      { text: "Being Consistent", correct: true },
      { text: "Always learning new things", correct: false },
    ],
  },
  {
    question: "One piece of advice you'd give me?",
    answers: [
      { text: "Trust yourself more", correct: false },
      { text: "Dont overthink", correct: false },
      { text: "Never give up", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz(){
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion(){
   answersDisabled = false;

   const currentQuestion = quizQuestions[currentQuestionIndex];

   currentQuestionSpan.textContent = currentQuestionIndex + 1;

   const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
   progressBar.style.width = progressPercent + "%";

   questionText.textContent = currentQuestion.question;

   answersContainer.innerHTML = "";

   currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn")

    button.dataset.correct = answer.correct

    button.addEventListener('click',selectAnswer);

    answersContainer.appendChild(button);
   });
}

function selectAnswer(event){
  if(answersDisabled) return

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if ( button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    else if( button === selectedButton){
      button.classList.add("incorrect");
    }
  });
  if(isCorrect){
    score++;
    scoreSpan.textContent = score
  }
  setTimeout(() => {
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
      showQuestion()
    }
    else{
      showResults()
    }
  },1000)

}

function showResults(){
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You know me Best!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! You're getting there!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "You dont know me at all T-T";
  }
}

function restartQuiz(){
  resultScreen.classList.remove("active");

  startQuiz();
}