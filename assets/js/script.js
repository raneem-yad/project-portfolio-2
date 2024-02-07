const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".close");
const modal = document.querySelector(".modal");
// Wait for the DOM to finish loading before running the game
// Get the player name from url 

document.addEventListener("DOMContentLoaded", function () {
    const urlString = window.location.href;
    console.log(urlString);
    let url = new URL(urlString);
    const playerNameURL = url.searchParams.get("player-name");
    if (playerNameURL !== null) {
        console.log(playerNameURL);
        let playerNames = document.getElementsByClassName('player-name');
        for (playerName of playerNames) {
            playerName.innerHTML = playerNameURL;
        }
    } else {
        console.log("playerName not found in URL");
    }

    // Modal visibility
    btnRules.onclick = () => (modal.style.display = "block");
    btnClose.onclick = () => (modal.style.display = "none");



    // let buttons = document.getElementsByTagName("button");

    // for (let button of buttons) {
    // 	button.addEventListener("click", function() {
    // 		if (this.getAttribute("data-type") === "submit") {
    // 			checkAnswer();
    // 		} else {
    // 			let gameType = this.getAttribute("data-type");
    // 			runGame(gameType);
    // 		}
    // 	});
    // }

    // document.getElementById("answer-box").addEventListener("keydown", function(event) {
    // 	if (event.key === "Enter") {
    // 		checkAnswer();
    // 	}
    // });

    // runGame("addition");
});