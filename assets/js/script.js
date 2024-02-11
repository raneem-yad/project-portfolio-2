// Game data structure 
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const SPOCK = "SPOCK";
const LIZARD = "LIZARD";

const CHOICE_IMAGE_MAP = {
    PAPER: `<span class="circle"><i class="fa-solid fa-hand"></i></span>`,
    ROCK: `<span class="circle"><i class="fa-solid fa-hand-back-fist"></i></span>`,
    SCISSOR: `<span class="circle"><i class="fa-solid fa-hand-scissors"></i></span>`,
    SPOCK: `<span class="circle"><i class="fa-solid fa-hand-spock"></i></span>`,
    LIZARD: `<span class="circle"><i class="fa-solid fa-hand-lizard"></i></span>`,
}

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    let buttons = document.getElementsByTagName('button');

    // Get the player name from url 
    getPlayerNameFromURL();
    gameTimer();

    for (let button of buttons) {
        button.addEventListener("click", function () {
            let buttonType = this.getAttribute("data-type");
            switch (buttonType) {
                case 'playAgain':
                    playAgain()
                    break;
                case 'open-modal':
                    modal.style.display = "block";
                    break;
                case 'close-modal':
                    modal.style.display = "none";
                    break;
                case 'choose':
                    let userChoice = this.getAttribute("data-play").toUpperCase();
                    runGame(userChoice);
                    break;
            }
        });
    }
});



/**
 * Initializes and updates a countdown timer for a specified duration.
 * The timer counts down starting from minutes to zero and displays the remaining time on the screen.
 * When the timer reaches zero, it displays "Time's up!" and executes additional actions.
 */
function gameTimer() {
    const startingMinutes = 1;
    let time = startingMinutes * 60;

    const countdownTimer = document.getElementById('timer');

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        // Add leading zeros to seconds if necessary
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        if(seconds <10 && seconds!=0){
            countdownTimer.style.color ='red';
        }

        // Display the timer in the specified format (mm:ss)
        countdownTimer.innerHTML = `${minutes}:${seconds}`;

        // Decrement time by 1 second
        time--;

        // Check if time has run out
        if (time < 0) {
            clearInterval(interval);
            countdownTimer.innerHTML = "Time's up!";
            showFinalScore();
        }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

/**
 * Displays the final score modal, showing the winner and each player's score.
 */
function showFinalScore() {
    let modal = document.getElementsByClassName("modal")[1];// the second element 

    modal.style.display = "block";
    modal.style.opacity = 1;
    modal.style.zIndex = 9999;

    //get each player score 
    const playerScore = parseInt(document.getElementById('user-score').innerText);
    const computerScore = parseInt(document.getElementById('computer-score').innerText);

    // cal final winner 
    let winner;
    if (playerScore == computerScore) {
        winner = "No One! it's tie";
    } else if (playerScore > computerScore) {
        winner = "You";
    } else { winner = "Computer" }
    // showing the winner 
    document.getElementById('winner').innerText = winner;

    // show each player score   
    let finalUserScore = document.getElementById('player-final-score')
    let finalComputerScore = document.getElementById('computer-final-score')
    finalUserScore.innerText = playerScore;
    finalComputerScore.innerText = computerScore;
}

/**
 * Runs a single round of the game.
 *
 * @param {string} userChoice - The choice made by the user ('ROCK', 'PAPER', 'SCISSOR', 'LIZARD', or 'SPOCK').
 */
function runGame(userChoice) {
    //Get the computer choice
    let computerChoice = computerPick();

    //Calculate and update the result
    let result = calculateWinnerRule(userChoice, computerChoice);
    if (result !== 0) { // it's not a draw!
        incrementScore(result);
    }
    renderResults(userChoice, computerChoice);
    renderResultAsText(result);
}

/**
 * Generates a random choice from a predefined set of options.
 * @returns {string} The randomly selected choice.
 */
function computerPick() {
    const choices = Object.keys(CHOICE_IMAGE_MAP)
    let choiceIndex = Math.floor(Math.random() * 5);
    return choices[choiceIndex];
}

/**
 * Calculates the winner of a game round based on user and computer choices.
 *
 * @param {string} userChoice - The choice made by the user ('ROCK', 'PAPER', 'SCISSOR', 'LIZARD', or 'SPOCK').
 * @param {string} computerChoice - The choice made by the computer ('ROCK', 'PAPER', 'SCISSOR', 'LIZARD', or 'SPOCK').
 * @returns {number} Returns 1 if the computer wins, -1 if the user wins, and 0 if it's a draw.
 */
function calculateWinnerRule(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        //it's a Draw!
        return 0;
    } else {
        const rules = [
            { input: [ROCK, PAPER], output: PAPER },
            { input: [ROCK, LIZARD], output: ROCK },
            { input: [ROCK, SCISSOR], output: ROCK },
            { input: [ROCK, SPOCK], output: SPOCK },
            { input: [LIZARD, PAPER], output: LIZARD },
            { input: [LIZARD, SCISSOR], output: SCISSOR },
            { input: [LIZARD, SPOCK], output: LIZARD },
            { input: [PAPER, SCISSOR], output: SCISSOR },
            { input: [PAPER, SPOCK], output: PAPER },
            { input: [SCISSOR, SPOCK], output: SPOCK },
        ];


        let selectedRule = null;
        for (let rule of rules) {
            if (rule.input.includes(userChoice) && rule.input.includes(computerChoice)) {
                selectedRule = rule
                // when you find the winner just break no need to check the other rules
                break;
            }
        }
        if (selectedRule.output === userChoice) {
            console.log("the winner for this round is user");
            return -1; //this means the winner is user
        } else {
            console.log("the winner for this round is computer");
            return 1; //this means the winner is computer
        }
    }

}


/**
 * Increments the score of the winner.
 *
 * @param {number} winner - The winner of the game round. 1 represents the computer, -1 represents the user.
 */
function incrementScore(winner) {
    let winnerScoreElement = "user-score"
    if (winner === 1) {
        winnerScoreElement = "computer-score"
    }

    let oldScore = parseInt(document.getElementById(winnerScoreElement).innerText);
    document.getElementById(winnerScoreElement).innerText = ++oldScore;
}

/**
 * Renders the game results on the screen.
 *
 * @param {string} userChoice - The choice made by the user ('ROCK', 'PAPER', 'SCISSOR', 'LIZARD', or 'SPOCK').
 * @param {string} computerChoice - The choice made by the computer ('ROCK', 'PAPER', 'SCISSOR', 'LIZARD', or 'SPOCK').
 */
function renderResults(userChoice, computerChoice) {
    //Go to the results screen
    const chooseScreen = document.getElementById("choose");
    const resultScreen = document.getElementById("result");

    chooseScreen.classList.remove("visible");
    resultScreen.classList.add("visible");
    let userChoiceIcon = CHOICE_IMAGE_MAP[userChoice];
    let computerChoiceIcon = CHOICE_IMAGE_MAP[computerChoice];
    renderPlayerChoice("user", userChoiceIcon);
    renderPlayerChoice("computer", computerChoiceIcon);
}

/**
 * Renders the player's choice on the screen.
 *
 * @param {string} player - The player whose choice is being rendered ('user' or 'computer').
 * @param {string} icon - The icon representing the player's choice.
 */
function renderPlayerChoice(player, icon) {
    let playerPickedResult = document.getElementById('user-pick-icon');
    let timeDelay = 400;

    if (player == "computer") {
        playerPickedResult = document.getElementById('computer-pick-icon');
        timeDelay = 1000;
    }

    playerPickedResult.innerHTML = icon;
    setTimeout(function () {
        playerPickedResult.classList.add("scale");
    }, timeDelay);
}

/**
 * Renders the game result as text on the screen.
 *
 * @param {number} result - The result of the game round. 
 * Possible values: -1 for user win, 1 for computer win, 0 for draw.
 */
function renderResultAsText(result) {

    const resultText = document.getElementById("result-text");
    if (result == -1) {
        resultText.innerHTML = "You Win!"
    } else if (result == 1) {
        resultText.innerHTML = "Computer Win!"
    } else {
        resultText.innerHTML = "It's Draw!"
    }
}

/**
 * Resets the game state to allow the user to play again.
 * 
 * @function
 * @name playAgain
 * @returns {void}
 */
function playAgain() {
    let ChosseScreen = document.getElementById("choose");
    let resultScreen = document.getElementById("result");
    let userPickedResult = document.getElementById('user-pick-icon');
    let computerpickedResult = document.getElementById('computer-pick-icon');
    // Show the first screen, in order to play again

    resultScreen.classList.remove("visible");
    ChosseScreen.classList.add("visible");
    userPickedResult.classList.remove("scale");
    computerpickedResult.classList.remove("scale");
}

/**
 * Retrieves the player's name from the URL query parameters and updates the HTML elements 
 * with the class 'player-name' accordingly.
 */
function getPlayerNameFromURL() {
    const urlString = window.location.href;
    let url = new URL(urlString);
    const playerNameFromUrl = url.searchParams.get("player-name");

    if (playerNameFromUrl !== null) {
        let playerNames = document.getElementsByClassName('player-name');

        for (let playerName of playerNames) {
            playerName.innerHTML = playerNameFromUrl;
        }
    } else {
        console.log("playerName not found in URL");
    }
}