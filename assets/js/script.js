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
            let gameType = this.getAttribute("data-type");
            console.log(gameType);
            // runGame(gameType);
        });
    }
});

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
function calculateWinnerRule(leftSide, rightSide){
    if(leftSide === rightSide){
        console.log("it's tie")
    }else {
        const rules  =[
            {input: ["rock" ,"paper"], output: "paper"},
            {input: ["rock" ,"lizard"], output: "rock"},
            {input: ["rock" ,"scissor"], output: "rock"},
            {input: ["rock" ,"spock"], output: "spock"},
            {input: ["lizard" ,"paper"], output: "lizard"},
            {input: ["lizard" ,"scissor"], output: "scissor"},
            {input: ["lizard" ,"spock"], output: "lizard"},
            {input: ["paper" ,"scissor"], output: "scissor"},
            {input: ["paper" ,"spock"], output: "paper"},
            {input: ["scissor" ,"spock"], output: "spock"},
        ];
    
        for(let rule of rules){
            if(rule.input.include(leftSide) && rule.input.include(rightSide)){
                console.log(rule.output);
                if(rule.output === leftSide) {
                    console.log("the winner for this round is user")
                } else if(rule.output === rightSide){
                    console.log("the winner for this round is computer")
                }else{
                    console.error("there must be a winner!");
                }
            }else {
                console.error("thers is no accepted rule");
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