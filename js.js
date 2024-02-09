const words = ['mefagauker', 'orangie', 'machalot', 'tambal', 'fucker'];
// const letters =['a','b','c','d','e','f','g','h','i',
// 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
function chooseWord () {
    const rand = Math.floor(Math.random() * words.length);
    return words[rand];
}

let answerText = document.querySelector('#answer');
answerText.style.visibility = 'hidden';
let attemptsLeft;
let answer = [];
let solution;

const playAgainBtn = document.querySelector('#playagain');
playAgainBtn.addEventListener('click', initGame);


// listen to buttons
const buttons = document.querySelectorAll('#letters_container .btn');
for (let button of buttons) {
    button.addEventListener('click', checkLetter);
    button.style.visibility = 'hidden';
}

function initGame() {
    // initialize game
    answer = [];
    solution = chooseWord();
    attemptsLeft = 5;
    console.log(solution);
    for (let button of buttons) {
        button.disabled = false;
        button.style.visibility = 'visible';
    }
    for (let char of solution){
        answer.push('_ ');
    }
    answerText.style.visibility = 'visible';
    updateStats();
}

// checking attempted letter 
function checkLetter() {
    const letterTried = this.textContent.toLowerCase();
    if (!solution.includes(letterTried)){
        console.log('Nope!');
        attemptsLeft--;
    }
    // if right
    else {
        for (let i = 0; i < solution.length; i++) {
            if (letterTried === solution[i]) {
                answer[i] = solution[i];
                console.log(`${solution[i]} was found!`)
            }
        }
        answerText.textContent = answer.join(' ');
    }
    updateStats();
    this.disabled = true;
    if (attemptsLeft === 0 || answer.join('') === solution) {
        gameOver();
    }
}
function gameOver() {
    if (attemptsLeft === 0) {
        console.log('You Lose!')
    }
    else if (answer.join('') === solution) {
        console.log('You Win!');
        words.splice(words.indexOf(solution), 1);
    }
    initGame();
}

function updateStats() {
    document.querySelector('.lives').textContent = `Lives: ${attemptsLeft}`;
    answerText.textContent = answer.join(' ');
}
