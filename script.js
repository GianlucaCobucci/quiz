const startBtn = document.querySelector(".start-btn")
const popupInfo = document.querySelector(".popup-info")
const exitBtn = document.querySelector(".exit-btn")
const main = document.querySelector(".main")
const continueBtn = document.querySelector(".continue-btn")
const quizSection = document.querySelector(".quiz-section")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")
const tryAgainBtn = document.querySelector(".tryAgain-btn")
const goHomeBtn = document.querySelector(".goHome-btn")
const questionText = document.querySelector(".question-text");
const optionList = document.querySelector(".option-list");



startBtn?.addEventListener('click', () => {
    popupInfo.classList.add("active")
    main.classList.add("active")
})

exitBtn?.addEventListener('click', () => {
    popupInfo.classList.remove("active")
    main.classList.remove("active")
})

continueBtn?.addEventListener("click", () => {
    quizSection.classList.add("active")
    popupInfo.classList.remove("active")
    main.classList.remove("active")
    quizBox.classList.add("active")

    showQuestions(0)
    questionCounter(1)
    headerScore
})

tryAgainBtn?.addEventListener('click', () => {
    quizBox.classList.add("active")
    nextBtn.classList.remove("active")
    resultBox.classList.remove("active")

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount)
    questionCounter(questionNumb)

    headerScore()
})

goHomeBtn?.addEventListener('click', () => {
    quizSection.classList.remove("active")
    nextBtn.classList.remove("active")
    resultBox.classList.remove("active")

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount)
    questionCounter(questionNumb)
})

var questionCount = 0;
var questionNumb = 1;
var userScore = 0;

const nextBtn = document.querySelector(".next-btn")

nextBtn?.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        questionCount++
        showQuestions(questionCount)
        questionNumb++
        questionCounter(questionNumb)
        nextBtn.classList.remove("active")
    } else {
        showResultBox()
    }
})


optionList.addEventListener("click", (event) => {
    const selectedOption = event.target.closest(".option");
    if (selectedOption) {
        optionSelected(selectedOption);
    }
});

const showQuestions = (index) => {
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

    optionList.innerHTML = ""; 
    for (let i = 0; i < questions[index].options.length; i++) {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        const optionSpan = document.createElement("span");
        optionSpan.textContent = questions[index].options[i];
        optionDiv.appendChild(optionSpan);
        optionList.appendChild(optionDiv);
    }
};

const optionSelected = (answer) => {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer
    let allOptions = optionList.children.length
    //console.log(correctAnswer)
    if (userAnswer == correctAnswer) {
        //console.log("Correct answer")
        answer.classList.add("correct")
        userScore += 1
        headerScore()
    } else {
        //console.log("Wrong answer");
        answer.classList.add("incorrect")
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute("class", "option correct")
            }
        }
    }
    //se utente ha selezionato, disattiva le altre
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled")
    }
    nextBtn.classList.add("active")
}

const questionCounter = (index) => {
    const questionTotal = document.querySelector(".question-total")
    questionTotal.textContent = `${index} of ${questions.length} questions`
}

const headerScore = () => {
    const headerScoreText = document.querySelector(".header-score")
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`
}

const showResultBox = () => {
    quizBox.classList.remove("active")
    resultBox.classList.add("active")

    const scoreText = document.querySelector(".score-text")
    scoreText.textContent = `Your score is ${userScore} out of ${questions.length}`

    const circularProgress = document.querySelector(".circular-progress")
    const progressValue = document.querySelector(".progress-value")
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20

    let progress = setInterval(() => {
        progressStartValue++
        //console.log(progressStartValue)
        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255, .1)0deg)`
        if (progressStartValue == progressEndValue) {
            clearInterval(progress)
        }
    }, speed)
}