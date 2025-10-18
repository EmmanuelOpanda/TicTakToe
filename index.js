'use strict';

let isGameOver = false;

let gameStarted = false;

let startTime;
let endTime;

let player = 1;

let board = [
    null, null, null,
    null, null, null,
    null, null, null
];

let isWinner = false;

const myModal = document.querySelector('dialog')

const checkWin = () => {
    if (
        board[0] === board[1] && board[1] === board[2] && board[0] !== null ||
        board[3] === board[4] && board[4] === board[5] && board[3] !== null ||
        board[6] === board[7] && board[7] === board[8] && board[6] !== null ||

        board[0] === board[3] && board[3] === board[6] && board[0] !== null ||
        board[1] === board[4] && board[4] === board[7] && board[1] !== null ||
        board[2] === board[5] && board[5] === board[8] && board[2] !== null ||

        board[0] === board[4] && board[4] === board[8] && board[0] !== null ||
        board[2] === board[4] && board[4] === board[6] && board[2] !== null
    ) {
        return true
    };
    return false;
}

const onCellClick = (idx) => {

    if (board[idx] !== null) return;
    if (isGameOver) return;

    if (!gameStarted) {
        startTime = performance.now();
        gameStarted = true;
    }

    if (player === 1) board[idx] = 'X'
    else {
        board[idx] = 'O';
    }

    document.querySelector(`.c${idx}`).innerHTML = board[idx];

    if (checkWin()) {
        isGameOver = true;
        document.querySelectorAll('.square').forEach(element => {
            element.classList.add('animate__animated', 'animate__rotateIn');
        });
        document.querySelector('.winner').innerHTML = player;

        endTime = performance.now()

        const score = new Date(endTime - startTime).toISOString().slice(11, 19);

        console.log()

        document.querySelector('.score').innerHTML = score;

        const currentBestScore = localStorage.getItem("best_score") || null;

        if (score < currentBestScore || currentBestScore === null)
            localStorage.setItem("best_score", score);

        myModal.show()
    }

    if (player === 1) player = 2;
    else player = 1;

    document.querySelector(".player-ph").innerHTML = player;

}

const onReset = () => {

    isGameOver = false;

    gameStarted = false;

    startTime;
    endTime;

    player = 1;
    document.querySelector(".player-ph").innerHTML = player;

    board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    isWinner = false;

    document.querySelectorAll(".square").forEach(element =>{
        element.innerHTML = null
        
    })
}