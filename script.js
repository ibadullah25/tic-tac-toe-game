let boxes         = document.querySelectorAll('.box');
let msgContainer  = document.querySelector('.msg-container');
let msgDraw       = document.querySelector('#draw-msg');
let msgWinner     = document.querySelector('#winner-msg');
let newGameBtn    = document.querySelector('#newgame-btn');
let turnX         = true; // playerX starts
let count         = 0; // this is to check if game is a draw

// Winning patterns
const winningPatterns = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8]
];

// Loop through each box.
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = 'X';
            box.style.color = '#FFB6C1 ';
            turnX = false;
        } else {
            box.innerText = 'O';            
            box.style.color = '#ADD8E6';
            turnX = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});


// Check if we have a winner.
const checkWinner = () => {
    let foundWinner = false;
    for (let pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            foundWinner = true;
            return;
        }
    }

    if (!foundWinner && count === 9) {
        msgDraw.innerText = `Game Draw! Start a new game.`;
    }
};

const showWinner = (winner) => {
    msgWinner.innerText = `Congratulations, Winner is  ${winner}`;
    msgContainer.classList.remove('hide');
    gameOver();
}

// Game finish
const gameOver = ()=> {
    for (let box of boxes){
        box.disabled = true;
    }
}

// Reset/New game
const newGame = ()=>{
    turnX = true;
    for (let box of boxes){
       box.disabled = false;
       box.innerText = "";
       msgContainer.classList.add('hide');
       msgDraw.classList.add('hide');
    }
}
newGameBtn.addEventListener("click", newGame);