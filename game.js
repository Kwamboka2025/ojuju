// Questions Array (30+ questions divided into categories like Myths, Benefits, and Facts)
const questions = [
  {
    topic: "Myths",
    question: "1. Myths about blood donation include:",
    answers: [
      { text: "You can catch diseases from donating blood.", correct: false },
      { text: "Blood donation is painful.", correct: false },
      { text: "Blood donations take too long.", correct: false },
      { text: "You can donate blood even if you're on medication.", correct: true }
        ]
    },
  {
    topic: "Benefits",
    question: "2. What is one of the major benefits of donating blood?",
    answers: [
      { text: "Helps save lives of those in need.", correct: true },
      { text: "Improves your health and reduces iron levels.", correct: true },
      { text: "Prevents blood clots and improves circulation.", correct: false }
        ]
    },
  {
    topic: "Facts",
    question: "3. How often can you donate blood?",
    answers: [
      { text: "Every month", correct: false },
      { text: "Every 3 months", correct: true },
      { text: "Every 6 months", correct: false }
        ]
    },
  {
    topic: "Myths",
    question: "4. Blood donation causes weakness in the body:",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
        ]
    },
  {
    topic: "Benefits",
    question: "5. Donating blood can reduce your risk of heart disease:",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
        ]
    },
  {
    topic: "Facts",
    question: "6. Who can donate blood?",
    answers: [
      { text: "Only people over 50", correct: false },
      { text: "Anyone healthy and over 18", correct: true },
      { text: "Only men", correct: false }
        ]
    },
  {
    topic: "Myths",
    question: "7. Blood donations are only for hospitals:",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
        ]
    },
    {
        topic: "Myths",
        question: "Blood donations hurt a lot:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "Blood donation helps to maintain a healthy heart:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "Donating blood can lower the risk of stroke:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "Donating blood will make you sick:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "Blood donation helps to cleanse the blood by reducing iron levels:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "The human body has about 10 pints of blood:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "You can only donate blood once in your lifetime:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "How does donating blood help your liver?",
        answers: [
            { text: "It helps reduce fat buildup", correct: true },
            { text: "It increases blood circulation", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "How many pints of blood can be safely donated by an adult?",
        answers: [
            { text: "One pint", correct: true },
            { text: "Two pints", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "You need to be physically strong to donate blood:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "What does the body do to replenish the blood donated?",
        answers: [
            { text: "Regenerate red blood cells", correct: true },
            { text: "Reduce iron levels", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "How long does it take for the body to recover after donating blood?",
        answers: [
            { text: "1-2 days", correct: true },
            { text: "1-2 weeks", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "You should avoid donating blood if you're pregnant:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Benefits",
        question: "Blood donation helps in lowering the risk of cancer:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "Which blood type is known as the universal donor?",
        answers: [
            { text: "Type A", correct: false },
            { text: "Type O", correct: true }
        ]
    },
    {
        topic: "Myths",
        question: "You can't donate blood if you are overweight:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "Donating blood helps your body improve its blood circulation:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "How long does a blood donation typically take?",
        answers: [
            { text: "15-30 minutes", correct: true },
            { text: "1 hour", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "You cannot donate blood if you have a tattoo or piercing:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "Which of the following is a benefit of donating blood?",
        answers: [
            { text: "Improves cardiovascular health", correct: true },
            { text: "Causes headaches", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "How many units of blood are typically needed for a major surgery?",
        answers: [
            { text: "1 unit", correct: false },
            { text: "4-6 units", correct: true }
        ]
    },
    {
        topic: "Myths",
        question: "You can donate blood at any age as long as you're healthy:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "How does donating blood help the immune system?",
        answers: [
            { text: "It boosts immunity", correct: true },
            { text: "It weakens immunity", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "What type of blood donation helps patients with leukemia?",
        answers: [
            { text: "Plasma donation", correct: true },
            { text: "Red blood cell donation", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "You need to have a doctor’s prescription to donate blood:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "Regular blood donation can help you keep your iron levels balanced:",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "What is apheresis blood donation used for?",
        answers: [
            { text: "Collecting plasma", correct: true },
            { text: "Collecting red blood cells", correct: false }
        ]
    },
    {
        topic: "Myths",
        question: "Blood donation causes long-term health problems:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        topic: "Benefits",
        question: "Which organ benefits the most from regular blood donations?",
        answers: [
            { text: "Heart", correct: true },
            { text: "Liver", correct: false }
        ]
    },
    {
        topic: "Facts",
        question: "How much time does it take for your body to replace the plasma after donating blood?",
        answers: [
            { text: "1 hour", correct: false },
            { text: "1-2 days", correct: true }
        ]
    },
    {
        topic: "Myths",
        question: "Blood donations are only for people with specific blood types:",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    }
];

// You can merge the `additionalQuestions` array with your existing `questions` array using `push()` or by concatenating them before starting the game.
// For example:
// questions.push(...additionalQuestions);
    // Continue adding more questions (add up to 30+ questions)

// Randomize questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

shuffleArray(questions); // Shuffle questions on page load

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

// Show popup and start the game
document.getElementById('start-game-btn').addEventListener('click', startGame);

function startGame() {
  // Hide the description and show the game popup
  document.querySelector('.trivia-section').style.display = 'none';
  document.getElementById('game-popup').style.display = 'block';
  loadQuestion();
}

// Load question and answers dynamically
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').textContent = question.question;
  document.getElementById('question-number').textContent = currentQuestionIndex + 1;

  const answersContainer = document.getElementById('answers-container');
  answersContainer.innerHTML = ''; // Clear previous answers

  // Display answer choices
  question.answers.forEach((answer, index) => {
    const answerLabel = document.createElement('label');
    const answerInput = document.createElement('input');
    answerInput.type = 'radio';
    answerInput.name = 'answer';
    answerInput.value = index;

    answerLabel.appendChild(answerInput);
    answerLabel.appendChild(document.createTextNode(answer.text));
    answersContainer.appendChild(answerLabel);
  });

  // Enable Next button when an answer is selected
  document.getElementById('next-btn').disabled = true;
  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.addEventListener('change', () => {
      document.getElementById('next-btn').disabled = false;
    });
  });
}

// Handle the next button click
document.getElementById('next-btn').addEventListener('click', function() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) return;

  const isCorrect = questions[currentQuestionIndex].answers[selectedAnswer.value].correct;
  if (isCorrect) {
    score++;
    cheerPlayer(true); // Correct answer feedback
  } else {
    cheerPlayer(false); // Incorrect answer feedback
  }

  // Update progress bar
  updateProgressBar();

  // Move to the next question or end the game
  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestions) {
    loadQuestion();
  } else {
    endGame();
  }
});

// End game and show the final score
function endGame() {
  document.getElementById('game-popup').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('final-score').textContent = `${score} out of ${totalQuestions}`;
}

// Update the progress bar as the user progresses
function updateProgressBar() {
  const progress = (currentQuestionIndex + 1) / totalQuestions * 100;
  document.getElementById('progress-bar').value = progress;
}

// Feedback when the player answers correctly or incorrectly
function cheerPlayer(isCorrect) {
  const cheerMessage = isCorrect ? '👏 Correct! Well done!' : '🙌 Oops! Try again next time!';
  alert(cheerMessage); // This can be customized with emojis, sounds, or animations
}

// Restart the game
document.getElementById('restart-btn').addEventListener('click', function() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById('result-container').style.display = 'none';
  document.querySelector('.trivia-section').style.display = 'block';
});