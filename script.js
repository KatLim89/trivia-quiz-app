// List of questions, options and answers
const questions = [
  {
      question: "What is the hardest known natural material?",
      options: ["Iron", "Platinum", "Diamond", "Titanium"],
      correctAnswer: "Diamond",
      userAnswer: null
  },
  {
      question: "The dragon is the national animal of which country?",
      options: ["Scotland", "Wales", "Norway", "China"],
      correctAnswer: "Wales",
      userAnswer: null
  },
  {
      question: "How many keys are there on a piano?",
      options: ["88", "108", "79", "99"],
      correctAnswer: "88",
      userAnswer: null
  },
  {
      question: "Which Star Wars characters appear in Indiana Jones?",
      options: ["Han Solo and Chewbacca", "R2-D2 and C-3PO", "Luke Skywalker and Princess Leia", "Qui-Gon Jinn and Obi-Wan Kenobi"],
      correctAnswer: "R2-D2 and C-3PO",
      userAnswer: null
  },
  {
      question: "Which is the oldest planet in our solar system?",
      options: ["Mars", "Earth", "Saturn", "Jupiter"],
      correctAnswer: "Jupiter",
      userAnswer: null
  }
];

// Keep count of the number of correct answers
let correctAnswers = 0;

// Setup for the quiz
const questionContainer = document.getElementById("question-container");
const checkAnswerBtn = document.getElementById("check-answer-btn");
const resetBtn = document.getElementById("reset-btn");
const resultCounter = document.getElementById("result-counter");
const remarks = document.getElementById("remarks");
const errorMessage = document.getElementById("error-message");

// Function to display the question and options
function displayQuestions() {
  // New div for each question
  questions.forEach((q, index) => {
    // Options are displayed as radio buttons
      const optionsHtml = q.options.map((option, optionIndex) => `
          <label>
              <input 
                  type="radio" 
                  name="answer${index}" 
                  value="${option}" 
                  data-question-index="${index}" 
                  data-option-index="${optionIndex}" 
                  ${q.userAnswer === option ? "checked" : ""}
              >
              ${option}
          </label><br>`
      ).join("");
      // Question is displayed in described format
      questionContainer.innerHTML += `<div data-question-index="${index}">
          <h3>${q.question}</h3>${optionsHtml}
      </div>`;
  });
}

// Function to update the result counter to display the number of correct answers
function updateResultCounter() {
  resultCounter.innerHTML = `<b>Final Score: ${correctAnswers} out of ${questions.length}</b>`;
}

// Function to display remarks based on the score
function updateRemarks() {
  if (correctAnswers < 3) {
      remarks.innerHTML = "Uh-oh, try again! &#128552;";
  } else if (correctAnswers >= 3 && correctAnswers < 5) {
      remarks.innerHTML = "Not bad. You can do better! &#128548;";
  } else if (correctAnswers === 5) {
      remarks.innerHTML = "&#129395; Excellent! Good job! &#127881;";
  }
}

// Function to check the user's answer and update the result counter
// Error message is kept hidden
function checkAnswers() {
  errorMessage.style.display = "none";
  let allQuestionsAnswered = true;
// Loop through each question and check the user's answer
  questions.forEach((q, index) => {
      const selectedOption = document.querySelector(`input[name='answer${index}']:checked`);
      if (selectedOption) {
          const userAnswer = selectedOption.value;
          q.userAnswer = userAnswer;
          const correctAnswer = q.correctAnswer;
          const isCorrect = userAnswer === correctAnswer;
          if (isCorrect) {
              correctAnswers++;
          }
      } else {
          allQuestionsAnswered = false;
      }
  });
// If all questions are answered, display the result counter and remarks
// If not, display an error message
  if (allQuestionsAnswered) {
      showResults();
  } else {
      errorMessage.style.display = "block";
  }
}

// Function to show the results with result counter and remarks
// Check Answer button is hidden and Reset button is displayed
function showResults() {
  questionContainer.innerHTML = `<h2>Quiz Completed!</h2>`;
  updateResultCounter();
  updateRemarks();
  checkAnswerBtn.style.display = "none";
  resetBtn.style.display = "block";
}

// Function to reset the quiz
function resetQuiz() {
  questions.forEach((q) => {
      q.userAnswer = null;
  });

  correctAnswers = 0;

  questionContainer.innerHTML = "";
  displayQuestions();

  resultCounter.innerHTML = "";
  remarks.innerHTML = "";
  checkAnswerBtn.style.display = "block";
  resetBtn.style.display = "none";
  errorMessage.style.display = "none";
}

// Initial setup
displayQuestions();
// Add event listener to the check answer button
checkAnswerBtn.addEventListener("click", checkAnswers);
// Add event listener to the reset button
resetBtn.addEventListener("click", resetQuiz);
