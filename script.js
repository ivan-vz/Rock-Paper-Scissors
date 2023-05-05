// Game code

let options = ["rock", "paper", "scissors"];
let ai = "";
let player = "";
let playerWins = 0;
let aiWins = 0;
let games = 0;

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

let singleRound = (player, ai) => {
    let roundRes = {
        winner: null,
        looser: null,
        other: null
    }
    games += 1;

    if (player == ai){
        roundRes.other = "draw";
    } else if ((player == "rock" && ai == "paper") || (player == "paper" && ai == "scissors") || (player == "scissors" && ai == "rock")) {
        roundRes.winner = ai;
        roundRes.looser = player;
        aiWins += 1;
    } else {
        roundRes.winner = player;
        roundRes.looser = ai;
        playerWins += 1;
    }

    return roundRes;
}

let game = () => {
    for(let i = 1; i < 6; i++){
        ai = getComputerChoice();
        player = prompt("Write rock, paper or scissors", "");
        player = player.toLowerCase();

        while(!(options.includes(player))){
            player = prompt("wrong choice, write rock, paper or scissors", "");
            player = player.toLowerCase();
        }

        console.log(singleRound(player, ai));
    }
}

//game();

// style and actions code

let playButton = document.querySelector("#playButton");
let optionDiv = document.querySelectorAll(".playerOptions");
let playerChoice = null;

let playerChoiceImg = document.querySelector("#playerChoice > img");
let aiChoiceImg = document.querySelector("#aiChoice > img");
let titleResult = document.querySelector("#roundWinner");

optionDiv.forEach((option) => {
    option.addEventListener("click", () => {
        playerChoice = option["id"];
    });
});

playButton.addEventListener("click", () => {
    let aiChoice = getComputerChoice();
    playerChoiceImg.setAttribute("src", `./img/${playerChoice}.png`)
    aiChoiceImg.setAttribute("src", `./img/${aiChoice}.png`)

    let roundResult = singleRound(playerChoice, aiChoice);
    
    if(roundResult.other == null){
        titleResult.textContent = roundResult.winner + " beat " + roundResult.looser;
    } else {
        titleResult.textContent = roundResult.other;
    }
});