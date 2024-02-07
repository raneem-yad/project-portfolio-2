// Wait for the DOM to finish loading before running the game
// Get the player name from url 

document.addEventListener("DOMContentLoaded", function () {
    const urlString = window.location.href;
    console.log(urlString);
    let url = new URL(urlString);
    const playerNameURL = url.searchParams.get("player-name");
    if (playerNameURL !== null) {
        console.log(playerNameURL); 
        let playerName = document.getElementById('player-name');
        playerName.innerHTML = playerNameURL;
    } else {
        console.log("playerName not found in URL");
    }

    // console.log(playerName);



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