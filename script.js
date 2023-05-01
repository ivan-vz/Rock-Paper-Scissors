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
    let roundRes;
    games += 1;

    if (player == ai){
        roundRes = "Draw: " + player;
    } else if ((player == "rock" && ai == "paper") || (player == "paper" && ai == "scissors") || (player == "scissors" && ai == "rock")) {
        roundRes = "You Lose! " + ai + " beats " + player;
        aiWins += 1;
    } else {
        roundRes = "You Win! " + player + " beats " + ai;
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

game();