const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Chennai", correct: false },
            { text: "Kolkata", correct: false }
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false }
        ]
    },

    {
        question: "How many days are there in a leap year?",
        answers: [
            { text: "365", correct: false },
            { text: "366", correct: true },
            { text: "364", correct: false },
            { text: "360", correct: false }
        ]
    },

    {
        question: "Who invented the telephone?",
        answers: [
            { text: "Thomas Edison", correct: false },
            { text: "Alexander Graham Bell", correct: true },
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: false }
        ]
    },

    {
        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart-button");

// Display Question
function showQuestion() {

    resetState();

    let question = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    questionElement.textContent = question.question;

    progress.style.width =
        ((currentQuestion) / questions.length) * 100 + "%";

    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(button, answer.correct);
        });

        answerButtons.appendChild(button);

    });

}

// Reset Answer Buttons
function resetState() {

    nextButton.style.display = "none";

    answerButtons.innerHTML = "";

}

// Select Answer
function selectAnswer(button, correct) {

    const buttons = answerButtons.children;

    for (let btn of buttons) {
        btn.disabled = true;
    }

    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");

        // Highlight correct answer
        const correctAnswer = questions[currentQuestion]
            .answers.find(answer => answer.correct);

        for (let btn of buttons) {
            if (btn.textContent === correctAnswer.text) {
                btn.classList.add("correct");
            }
        }
    }

    scoreElement.textContent = "Score: " + score;

    nextButton.style.display = "block";
}

// Next Question
function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

}

// Display Final Result
function showResult() {

    resetState();

    questionElement.style.display = "none";

    questionNumber.textContent = "Quiz Completed!";

    progress.style.width = "100%";

    result.textContent =
        `Your Score: ${score} / ${questions.length}`;

    nextButton.style.display = "none";

    restartButton.style.display = "block";

}

// Restart Quiz
function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    questionElement.style.display = "block";

    scoreElement.textContent = "Score: 0";

    result.textContent = "";

    restartButton.style.display = "none";

    showQuestion();

}

// Start Quiz
showQuestion();