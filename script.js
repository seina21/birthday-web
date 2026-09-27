/* =========================================
   NAVIGASI
========================================= */

function goTo(pageId) {

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}


/* =========================================
   GAME INGATAN
========================================= */

const memorySymbols = [
    '🎀', '🎀',
    '🌙', '🌙',
    '⭐', '⭐',
    '💗', '💗',
    '🦋', '🦋',
    '🌸', '🌸'
];

let memoryCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;


/* Acak kartu */

function shuffle(array) {

    return array.sort(() => Math.random() - 0.5);

}


/* Membuat game */

function initMemory() {

    const board = document.getElementById('memoryBoard');

    board.innerHTML = '';

    memoryCards = shuffle([...memorySymbols]);

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;

    document.getElementById('memoryNext').disabled = true;

    memoryCards.forEach((symbol, index) => {

        const card = document.createElement('div');

        card.className = 'memory-card';

        card.dataset.symbol = symbol;

        card.dataset.index = index;

        card.innerHTML = '♡';

        card.onclick = function () {
            flipMemory(card);
        };

        board.appendChild(card);

    });

}


/* Balik kartu */

function flipMemory(card) {

    if (lockBoard) return;

    if (card.classList.contains('flipped')) return;

    if (card.classList.contains('matched')) return;


    card.classList.add('flipped');

    card.innerHTML = card.dataset.symbol;


    if (!firstCard) {

        firstCard = card;

        return;

    }


    secondCard = card;

    checkMemoryMatch();

}


/* Cek pasangan */

function checkMemoryMatch() {

    const match =
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol;


    if (match) {

        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        matchedPairs++;

        resetMemory();

        if (matchedPairs === memorySymbols.length / 2) {

            document.getElementById('memoryStatus').innerHTML =
                '✨ Semua pasangan ditemukan!';

            document.getElementById('memoryNext').disabled = false;

        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            firstCard.innerHTML = '♡';
            secondCard.innerHTML = '♡';

            resetMemory();

        }, 800);

    }

}


/* Reset */

function resetMemory() {

    [firstCard, secondCard] = [null, null];

    lockBoard = false;

}


/* =========================================
   MUSIK
========================================= */

const music = document.getElementById('bgMusic');

let musicPlaying = false;


function toggleMusic() {

    const button = document.getElementById('musicButton');


    if (!musicPlaying) {

        music.play();

        button.innerHTML = '⏸ Pause Music';

        musicPlaying = true;

    } else {

        music.pause();

        button.innerHTML = '▶ Play Music';

        musicPlaying = false;

    }

}


/* =========================================
   QUIZ
========================================= */


/*
   EDIT PERTANYAAN DI SINI

   Kamu bisa mengganti:
   question = pertanyaan
   answers = pilihan
   correct = jawaban yang benar
*/

const quizData = [

    {
        question: "Apa yang paling menggambarkan birthday girl hari ini? 🎀",

        answers: [
            "Cute",
            "Pretty",
            "Amazing",
            "All of the above ♡"
        ],

        correct: 3
    },

    {
        question: "Apa yang paling penting di hari ulang tahun? 🎂",

        answers: [
            "Kebahagiaan",
            "Hadiah",
            "Kue",
            "Semuanya!"
        ],

        correct: 3
    },

    {
        question: "Apa yang harus dilakukan setelah melihat website ini? 🌙",

        answers: [
            "Tersenyum",
            "Bahagia",
            "Menerima hadiah",
            "Semua jawaban benar ♡"
        ],

        correct: 3
    }

];


let currentQuestion = 0;
let quizScore = 0;
let quizAnswered = false;


/* Mulai quiz */

function startQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    quizAnswered = false;

    showQuestion();

}


/* Tampilkan pertanyaan */

function showQuestion() {

    const question =
        document.getElementById('question');

    const answers =
        document.getElementById('answers');

    const next =
        document.getElementById('nextQuestion');

    const result =
        document.getElementById('quizResult');


    const current =
        quizData[currentQuestion];


    question.innerHTML =
        current.question;


    answers.innerHTML = '';

    result.innerHTML = '';

    next.style.display = 'none';

    quizAnswered = false;


    current.answers.forEach((answer, index) => {

        const button =
            document.createElement('button');

        button.className = 'quiz-answer';

        button.innerHTML = answer;

        button.onclick = function () {

            answerQuiz(index, button);

        };

        answers.appendChild(button);

    });

}


/* Jawaban quiz */

function answerQuiz(index, button) {

    if (quizAnswered) return;

    quizAnswered = true;


    const current =
        quizData[currentQuestion];


    if (index === current.correct) {

        quizScore++;

        button.innerHTML += ' ✓';

        document.getElementById('quizResult').innerHTML =
            'Correct! 🎀';

    } else {

        button.innerHTML += ' ✦';

        document.getElementById('quizResult').innerHTML =
            'Almost! ♡';

    }


    document.getElementById('nextQuestion').style.display =
        'inline-block';

}


/* Pertanyaan berikutnya */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= quizData.length) {

        document.getElementById('quizContent').innerHTML = `
            <h3>Quiz selesai! 🎉</h3>

            <p>
                Score kamu:
                <strong>${quizScore}/${quizData.length}</strong>
            </p>
        `;

        document.getElementById('quizResult').innerHTML = '';

        document.getElementById('nextQuestion').style.display =
            'inline-block';

        document.getElementById('nextQuestion').innerHTML =
            'Continue → 🔐';

        document.getElementById('nextQuestion').onclick =
            function () {
                goTo('code');
            };

        return;

    }


    showQuestion();

}


/* =========================================
   BIRTHDAY CODE
========================================= */


/*
   KODE RAHASIA

   Bisa kamu ubah sendiri.
*/

const secretCodes = [
    '0927',
    '0321',
    '0327'
];


function checkCode() {

    const input =
        document.getElementById('birthdayCode');

    const message =
        document.getElementById('codeMessage');


    const code =
        input.value.trim();


    if (secretCodes.includes(code)) {

        message.innerHTML =
            '🔓 Correct! Hadiahnya terbuka! 🎁';

        setTimeout(() => {

            goTo('gift');

        }, 1000);

    } else {

        message.innerHTML =
            '❌ Kodenya belum tepat. Coba lagi ♡';

    }

}


/* =========================================
   KADO
========================================= */

function openGift() {

    const gift =
        document.getElementById('giftBox');

    const message =
        document.getElementById('giftMessage');


    gift.innerHTML = '💝';

    message.innerHTML =
        'A little surprise just for you! ♡';


    setTimeout(() => {

        goTo('final');

        createConfetti();

    }, 1200);

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        '♡',
        '✦',
        '🎀',
        '✨',
        '🌸'
    ];


    for (let i = 0; i < 30; i++) {

        const confetti =
            document.createElement('div');

        confetti.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        confetti.style.position = 'fixed';

        confetti.style.left =
            Math.random() * 100 + 'vw';

        confetti.style.top = '-20px';

        confetti.style.fontSize =
            Math.random() * 20 + 15 + 'px';

        confetti.style.zIndex = '9999';

        document.body.appendChild(confetti);


        const duration =
            Math.random() * 3 + 2;


        confetti.animate(

            [
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(360deg)`,
                    opacity: 0
                }
            ],

            {
                duration: duration * 1000,
                easing: 'linear'
            }

        );


        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }

}


/* =========================================
   MULAI GAME
========================================= */

document.addEventListener('DOMContentLoaded', function () {

    initMemory();

    startQuiz();

});