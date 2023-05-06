//Game
let options = ["rock", "paper", "scissors"];
let ai = "";
let player = "";
let playerWins = 0;
let aiWins = 0;
let games = 0;

//Function to simulate the ai choose
let getComputerChoice = () => {
    let res = Math.round(Math.random() * (2));
    switch (res){
        case 0: 
            return "rock";
            break;
        case 1: 
            return"paper";
            break;
        case 2: 
            return "scissors";
            break;
    }
};

//Function to play 1 round an decide who is the winner of it
let singleRound = (player, ai) => {
    let roundRes = {
        who: null,
        winner: null,
        looser: null,
        other: null
    }
    games += 1;

    if (player == ai){
        roundRes.other = "draw";
    } else if ((player == "rock" && ai == "paper") || (player == "paper" && ai == "scissors") || (player == "scissors" && ai == "rock")) {
        roundRes.who = "ai";
        roundRes.winner = ai;
        roundRes.looser = player;
        aiWins += 1;
    } else {
        roundRes.who = "player";
        roundRes.winner = player;
        roundRes.looser = ai;
        playerWins += 1;
    }

    addPoint(roundRes);
    return roundRes;
}

//Function to add the right point to the record of the games
const addPoint = (res) => {
    let playerTable = document.querySelector("#playerTable");
    let aiTable = document.querySelector("#aiTable");

    let aiRow = document.createElement("tr");
    let aiCell = document.createElement("td");
    let playerRow = document.createElement("tr");
    let playerCell = document.createElement("td");
    let aiI = document.createElement("i");
    let playerI = document.createElement("i");

    if(res.other != null){ 
        aiI.setAttribute("class", "fa-solid fa-equals");
        playerI.setAttribute("class", 'fa-solid fa-equals');
    }
    if(res.who == "player") {
        aiI.setAttribute("class", "fa-regular fa-circle-xmark crossPoint");
        playerI.setAttribute("class", 'fa-regular fa-circle-check checkPoint');
    }
    if(res.who == "ai"){
        aiI.setAttribute("class", "fa-regular fa-circle-check checkPoint");
        playerI.setAttribute("class", 'fa-regular fa-circle-xmark crossPoint');
    }

    
    playerCell.appendChild(playerI);
    playerRow.appendChild(playerCell);
    playerTable.appendChild(playerRow);
    console.log(playerTable);

    aiCell.appendChild(aiI);
    aiRow.appendChild(aiCell);
    aiTable.appendChild(aiRow);
    console.log(aiTable);
}

//Events

let playButton = document.querySelector("#playButton");
let playAgain = document.querySelector("#playAgain");

let optionDiv = document.querySelectorAll(".playerOptions");
let playerChoice = null;

let playerChoiceImg = document.querySelector("#playerChoice > img");
let aiChoiceImg = document.querySelector("#aiChoice > img");
let titleResult = document.querySelector("#roundWinner");

let container = document.querySelector(".container");
let congratulations = document.querySelector(".congratulations");
let summary = document.querySelector("#summary");

//Function to add the selected effect to the options
optionDiv.forEach((option) => {
    option.addEventListener("click", () => {
        let oldMark = document.querySelector(".bookmark");
        if(oldMark){oldMark.classList.toggle("bookmark");}
        
        playerChoice = option["id"];
        option.classList.toggle("bookmark");
    });
});

//Function to monitor each game, see if the player chooses something, set the correct img from the chosen img or ai choice and end the game on round 5
playButton.addEventListener("click", () => {
    if(playerChoice){
        let aiChoice = getComputerChoice();
        playerChoiceImg.setAttribute("src", `./img/${playerChoice}.png`)
        aiChoiceImg.setAttribute("src", `./img/${aiChoice}.png`)
    
        let roundResult = singleRound(playerChoice, aiChoice);
        
        if(roundResult.other == null){
            titleResult.textContent = roundResult.winner + " beat " + roundResult.looser;
        } else {
            titleResult.textContent = roundResult.other;
        }
    
        let oldMark = document.querySelector(".bookmark");
        if(oldMark){oldMark.classList.toggle("bookmark");}
        aiChoice = null;
        playerChoice = null;

        if(games == 5){
            let winnerMsj = document.createElement("p");
            winnerMsj.setAttribute("id", "winnerMsj");
            
            if(playerWins > aiWins){
                winnerMsj.textContent = `The player reach the victory with an ${playerWins} - ${aiWins}`;
            } else if (playerWins < aiWins) {
                winnerMsj.textContent = `The ai reach the victory with an ${aiWins} - ${playerWins}`;
            } else {
                winnerMsj.textContent = `A draw... it seen like the the luck isn't with you player`;
            }

            summary.appendChild(winnerMsj);
            container.classList.toggle("hide");
            congratulations.classList.toggle("hide");
        }
    } else {
        alert("You have to choose one of the 3 options!")
    }
})

//Function to 'start' another game
playAgain.addEventListener("click", () => {
    location.reload();
})