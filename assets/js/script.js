const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".close");
const modal = document.querySelector(".modal");

// Wait for the DOM to finish loading before running the game
// Get the player name from url 

document.addEventListener("DOMContentLoaded", function () {

    getPlayerNameFromURL();

    // Modal visibility
    // to do 
    btnRules.onclick = () => (modal.style.display = "block");
    btnClose.onclick = () => (modal.style.display = "none");


    let buttons = document.getElementsByClassName("btn");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            let  userChoice= this.getAttribute("data-type");
            runGame(userChoice);
        });
    }
});

function runGame(userChoice) {

    let ChosseScreen = document.getElementById("choose");
    let resultScreen = document.getElementById("result");
    //Get the user choice
    let leftSide = userChoice;

    //Get the computer choice
    let rightSide= computerPick();

    //Calculate and update the result
    calculateWinnerRule(leftSide,rightSide);
    // result.textContent = resultText;

    //Go to the results screen
    ChosseScreen.classList.remove("visible");
    resultScreen.classList.add("visible");

    //Show the icons results 
    showIconsResult(leftSide,rightSide);


}

/**
 * Generates a random choice from a predefined set of options.
 * @returns {string} The randomly selected choice.
 */
function computerPick() {
    const choices = ['paper', 'rock', 'scissor', 'lizard', 'spock'];
    let choiceIndex = Math.floor(Math.random() * 5);
    return choices[choiceIndex];
}

/**
 * Determines the winner of a game based on the left and right sides of the input.
 * @param {string} leftSide The choice of the User player.
 * @param {string} rightSide The choice of the Computer.
 * @returns {void} Outputs the winner to the console.
 */
function calculateWinnerRule(leftSide, rightSide) {
    if (leftSide === rightSide) {
        console.log("it's tie")
    } else {
        const rules = [
            { input: ["rock", "paper"], output: "paper" },
            { input: ["rock", "lizard"], output: "rock" },
            { input: ["rock", "scissor"], output: "rock" },
            { input: ["rock", "spock"], output: "spock" },
            { input: ["lizard", "paper"], output: "lizard" },
            { input: ["lizard", "scissor"], output: "scissor" },
            { input: ["lizard", "spock"], output: "lizard" },
            { input: ["paper", "scissor"], output: "scissor" },
            { input: ["paper", "spock"], output: "paper" },
            { input: ["scissor", "spock"], output: "spock" },
        ];

        for (let rule of rules) {
            if (rule.input.includes(leftSide) && rule.input.includes(rightSide)) {

                if (rule.output === leftSide) {
                    console.log("the winner for this round is user");
                    incrementPlayerScore();
                } else {
                    console.log("the winner for this round is computer");
                    incrementComputerScore();
                }
                // when you find the winner just break no need to check the other rules
                break;
            } else {
                // console.log("Not this rule");
            }
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
function showIconsResult(leftSide,rightSide){
    let userPickedResult = document.getElementById('user-pick-icon');
    let computerpickedResult = document.getElementById('computer-pick-icon');

    const rulesIcons = {
        paper: `<span class="res-icons"><i class="fa-solid fa-hand"></i></span>`,
        rock : `<span class="res-icons"><i class="fa-solid fa-hand-back-fist"></i></span>`,
        scissor:`<span class="res-icons"><i class="fa-solid fa-hand-scissors"></i></span>`,
        spock: `<span class="res-icons"><i class="fa-solid fa-hand-spock"></i></span>`,
        lizard: `<span class="res-icons"><i class="fa-solid fa-hand-lizard"></i></span>`,
    }
    for(let icon in rulesIcons){
        if(rulesIcons.hasOwnProperty(leftSide)&&rulesIcons.hasOwnProperty(rightSide)){
            if(icon == leftSide) {
                console.log(`player picked icon ${icon}`);
                userPickedResult.innerHTML=rulesIcons[icon];
                setTimeout(function () {
                    userPickedResult.classList.add("scale");
                  }, 400);
            }else if(icon == rightSide){
                console.log(`computer picked icon ${icon}`);
                
                computerpickedResult.innerHTML=rulesIcons[icon];
                setTimeout(function () {
                    computerpickedResult.classList.add("scale");
                  }, 1000);
            }
            
        }
    }
}

function getPlayerNameFromURL() {
    const urlString = window.location.href;
    let url = new URL(urlString);
    const playerNameURL = url.searchParams.get("player-name");

    if (playerNameURL !== null) {
        let playerNames = document.getElementsByClassName('player-name');

        for (playerName of playerNames) {
            playerName.innerHTML = playerNameURL;
        }
    } else {
        console.log("playerName not found in URL");
    }
}