// Game data structure 
const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissor";
const SPOCK = "spock";
const LIZARD = "lizard";

const CHOICE_IMAGE_MAP = {
    PAPER: `<span class="res-icons"><i class="fa-solid fa-hand"></i></span>`,
    ROCK: `<span class="res-icons"><i class="fa-solid fa-hand-back-fist"></i></span>`,
    SCISSOR: `<span class="res-icons"><i class="fa-solid fa-hand-scissors"></i></span>`,
    SPOCK: `<span class="res-icons"><i class="fa-solid fa-hand-spock"></i></span>`,
    LIZARD: `<span class="res-icons"><i class="fa-solid fa-hand-lizard"></i></span>`,
}

// Wait for the DOM to finish loading before running the game
// Get the player name from url 
document.addEventListener("DOMContentLoaded", function () {

    getPlayerNameFromURL();

    const modal = document.querySelector(".modal");
    let buttons = document.getElementsByTagName('button');

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
                default:
                    let userChoice = this.getAttribute("data-type");
                    runGame(userChoice);
            }
        });
    }
});

function runGame(userChoice) {

    let ChosseScreen = document.getElementById("choose");
    let resultScreen = document.getElementById("result");
 
    //Get the computer choice
    let computerChoice = computerPick();
    //'SPOCK'
    //Calculate and update the result
    let result = calculateWinnerRule(userChoice, computerChoice);
    if (result != "draw") {
        incrementScore(result)
    }

    //Go to the results screen
    ChosseScreen.classList.remove("visible");
    resultScreen.classList.add("visible");

    //Show the icons results 
    showIconsResult(leftSide, rightSide);


}

/**
 * Generates a random choice from a predefined set of options.
 * @returns {string} The randomly selected choice.
 */
function computerPick() {
    const choices = Object.keys( CHOICE_IMAGE_MAP)
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
function calculateWinnerRule(userChoice, userChoice) {
    if (userChoice === userChoice) {
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
            incrementPlayerScore();
            return -1; //this means the winner is user
        } else {
            console.log("the winner for this round is computer");
            incrementComputerScore();
            return 1; //this means the winner is computer
        }
    }

}


/**
 * Increments the player's score by 1.
 * 
 * @function
 * @name incrementPlayerScore
 * @returns {void}
 */
function incrementPlayerScore() {

    let oldScore = parseInt(document.getElementById("user-score").innerText);
    document.getElementById("user-score").innerText = ++oldScore;

}

/**
 * Increments the computer's score by 1.
 * 
 * @function
 * @name incrementComputerScore
 * @returns {void}
 */
function incrementComputerScore() {

    let oldScore = parseInt(document.getElementById("computer-score").innerText);
    document.getElementById("computer-score").innerText = ++oldScore;

}

/**
 * Updates the displayed icons for the user's and computer's choices based on what they picked.
 * 
 * @param {string} leftSide - The choice made by the user.
 * @param {string} rightSide - The choice made by the computer.
 * @returns {void}
 */
function showIconsResult(leftSide, rightSide) {
    let userPickedResult = document.getElementById('user-pick-icon');
    let computerpickedResult = document.getElementById('computer-pick-icon');

    const rulesIcons = {
        paper: `<span class="res-icons"><i class="fa-solid fa-hand"></i></span>`,
        rock: `<span class="res-icons"><i class="fa-solid fa-hand-back-fist"></i></span>`,
        scissor: `<span class="res-icons"><i class="fa-solid fa-hand-scissors"></i></span>`,
        spock: `<span class="res-icons"><i class="fa-solid fa-hand-spock"></i></span>`,
        lizard: `<span class="res-icons"><i class="fa-solid fa-hand-lizard"></i></span>`,
    }
    for (let icon in rulesIcons) {
        if (rulesIcons.hasOwnProperty(leftSide) && rulesIcons.hasOwnProperty(rightSide)) {
            if (icon == leftSide) {
                console.log(`player picked icon ${icon}`);
                userPickedResult.innerHTML = rulesIcons[icon];
                setTimeout(function () {
                    userPickedResult.classList.add("scale");
                }, 400);
            } else if (icon == rightSide) {
                console.log(`computer picked icon ${icon}`);

                computerpickedResult.innerHTML = rulesIcons[icon];
                setTimeout(function () {
                    computerpickedResult.classList.add("scale");
                }, 1000);
            }

        }
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

        for (playerName of playerNames) {
            playerName.innerHTML = playerNameURL;
        }
    } else {
        console.log("playerName not found in URL");
    }
}