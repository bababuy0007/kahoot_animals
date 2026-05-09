document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ
    const questions = [
        {
            question: "Яка з цих собак горда та вперта (середні породи)?",
            answers: ["Чіхуахуа", "Лабрадор", "Чау-чау", "Пес Патрон"],
            correct: 2
        },
        {
            question: "Що унікального у кожної собаки? Як відбиток пальця у людини.",
            answers: ["Подушечки на лапках", "Візерунок носа", "Форма вух", "Плями на язиці"],
            correct: 1
        },
        {
            question: "Скільки ПРИБЛИЗНО нюхових рецепторів у собак?",
            answers: ["Їх немає", "1 тис", "300", "300 млн"],
            correct: 3
        },
        {
            question: "Собаки можуть сміятися?",
            answers: ["Так, спеціальним звуком", "Тільки лайкою", "Коли хроплять", "Ні, не можуть"],
            correct: 0
        },
        {
            question: "Що означає, коли собака повільно виляє хвостом?",
            answers: ["Хоче обійматися", "Радість", "Обережність", "Хоче в туалет"],
            correct: 2
        },
        {
            question: "Якщо кіт моргає повільно, що він робить?",
            answers: ["Моргає", "Хоче спати", "Роздратований", "Дарує «котячий поцілунок»"],
            correct: 3
        },
        {
            question: "Яку частоту звуку чують коти, а люди — ні?",
            answers: ["Інфразвук", "Ультразвук", "Гіперзвук", "Все перелічене"],
            correct: 1
        },
        {
            question: "Чому котики труться об ваші ноги?",
            answers: ["Просять їсти", "Позначають нас феромонами", "Хочуть ласки", "Дуже вас люблять"],
            correct: 1
        },
        {
            question: "Чи відчувають коти смак солодкого?",
            answers: ["Ні, немає рецепторів", "Так, але слабко", "Тільки кошенята", "Так, але не люблять"],
            correct: 0
        },
        {
            question: "Скільки м'язів у кожному вусі кота?",
            answers: ["Немає", "До 5", "32", "Понад 100"],
            correct: 2
        },
        {
            question: "Найпопулярніша домашня тварина у світі за кількістю власників?",
            answers: ["Кіт", "Собака", "Хом'як", "Рибки"],
            correct: 1
        }
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('#result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const finalScore = document.querySelector('#final-score');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    // ФУНКЦІЇ
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerText = '';
        questionText.innerText = question.question;

        question.answers.forEach((text, i) => {
            const button = document.createElement('button');
            button.innerText = text;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(button, i) {
        clearInterval(interval); // Зупиняємо таймер після кліку
        
        const correctIdx = questions[questionIndex].correct;
        
        // Блокуємо всі кнопки після вибору
        const allButtons = document.querySelectorAll('.answer-btn');
        allButtons.forEach(btn => btn.disabled = true);

        if (i === correctIdx) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
            // Підсвічуємо правильну відповідь для навчання
            allButtons[correctIdx].classList.add('correct');
        }

        setTimeout(nextQuestion, 1200);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        if (finalScore) finalScore.innerText = score;
    }

    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;

            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    // СЛУХАЧІ ПОДІЙ
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
