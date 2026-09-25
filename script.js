const quizData = [
{
    question: "What does HTML stand for?",
    options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
    ],
    answer: 0
},
{
    question: "Which language is used for styling web pages?",
    options: [
        "Python",
        "CSS",
        "Java",
        "C++"
    ],
    answer: 1
},
{
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: [
        "var",
        "int",
        "string",
        "float"
    ],
    answer: 0
},
{
    question: "Which company developed JavaScript?",
    options: [
        "Microsoft",
        "Google",
        "Netscape",
        "Apple"
    ],
    answer: 2
},
{
    question: "Which HTML tag creates a hyperlink?",
    options: [
        "href",
        "link",
        "a",
        "url"
    ],
    answer: 2
}
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

function loadQuestion() {

    const q = quizData[currentQuestion];

    let html = `
        <div class="question">
            Q${currentQuestion + 1}. ${q.question}
        </div>
    `;

    q.options.forEach((option, index) => {
        html += `
        <div class="option">
            <input
                type="radio"
                name="answer"
                value="${index}"
                ${userAnswers[currentQuestion] === index ? "checked" : ""}
            >
            <label>${option}</label>
        </div>
        `;
    });

    document.getElementById("questionContainer").innerHTML = html;

    const nextBtn = document.querySelector(".next");

    if(currentQuestion === quizData.length - 1){
        nextBtn.textContent = "Submit";
    } else {
        nextBtn.textContent = "Next";
    }
}

function saveAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');

    if(selected){
        userAnswers[currentQuestion] = Number(selected.value);
    }
}

function nextQuestion() {

    saveAnswer();

    if(currentQuestion < quizData.length - 1){
        currentQuestion++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function prevQuestion() {

    saveAnswer();

    if(currentQuestion > 0){
        currentQuestion--;
        loadQuestion();
    }
}

function submitQuiz() {

    saveAnswer();

    let score = 0;

    quizData.forEach((question, index) => {
        if(userAnswers[index] === question.answer){
            score++;
        }
    });

    document.getElementById("quizBox").style.display = "none";

    const resultBox = document.getElementById("resultBox");
    resultBox.style.display = "block";

    resultBox.innerHTML = `
        <div class="result">
            <h2>Quiz Completed!</h2>
            <p><strong>Total Questions:</strong> ${quizData.length}</p>
            <p><strong>Correct Answers:</strong> ${score}</p>
            <p><strong>Wrong Answers:</strong> ${quizData.length - score}</p>
            <p><strong>Percentage:</strong> ${((score / quizData.length) * 100).toFixed(2)}%</p>
        </div>
    `;
}

let timeLeft = 60;

const timer = setInterval(() => {

    document.getElementById("time").textContent = timeLeft;

    if(timeLeft <= 0){
        clearInterval(timer);
        submitQuiz();
    }

    timeLeft--;

}, 1000);

loadQuestion();