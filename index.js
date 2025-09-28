'use strict';

let isGameOver = false;

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

    if (player === 1) board[idx] = 'X'
    else {
        board[idx] = 'O';

    }

    document.querySelector(`.c${idx}`).innerHTML = board[idx];

    if (checkWin()) {
        isGameOver = true;
        document.querySelectorAll('.square').forEach(element => {
            console.log(element)
            element.classList.add('animate__animated', 'animate__rotateIn');
        });
        document.querySelector('.winner').innerHTML = player;

        myModal.show()
    }

    if (player === 1) player = 2;
    else player = 1;

    document.querySelector(".player-ph").innerHTML = player;

}