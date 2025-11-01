let randomNumber =  parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlogt = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHigh = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuesses = [];
let numOfGuesses = 1;
let playGame = true;
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1 || guess > 100) {
        alert('Please enter a number between 1 and 100');
    } else {
        prevGuesses.push(guess);
        if (numOfGuesses === 10) {
            displayGuess(guess);
            displayMessage(`Game Over! The number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`Congratulations! You guessed it right`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too high! Try again!`);
    } else {
        displayMessage(`Invalid input! Please try again!`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlogt.innerHTML += `${guess}, `;
    numOfGuesses++;
    remaining.innerHTML = `${11 - numOfGuesses}`;
    if (remaining === 0) {
        endGame();
    }
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<button id="newGame">Start New Game</button3>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();    
}

function newGame() {
    const newbutton = document.querySelector('#newGame')
    newbutton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuesses = [];
        numOfGuesses = 1;
        guessSlogt.innerHTML = '';
        remaining.innerHTML = `${11 - numOfGuesses}`;
        lowOrHigh.innerHTML = '';
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}