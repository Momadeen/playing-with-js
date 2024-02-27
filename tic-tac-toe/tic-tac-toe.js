const BOARD_WIDTH = 3;

const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [1, 2, 4],
]

let currentPlayer = 1;
let numMovesDone = 0;

const gameHeading = document.getElementById('game-heading');
const gameSquares = document.querySelectorAll('.game-square');
const restartButton = document.getElementById('restart-button')

gameSquares.forEach((gameSquare, i) => {
    gameSquare.addEventListener('click', () => {
        makeMove(gameSquare)
    })
});

restartButton.addEventListener('click', restartGame)

function makeMove(gameSquare) {
    gameSquare.textContent = currentPlayer === 1 ? 'X' : 'O';
    gameSquare.disabled = true;
    numMovesDone++;

    if(didPlayerWin()) {
        gameHeading.textContent = `Player ${currentPlayer} Won!`;
        endGame();
    } else if(numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
        gameHeading.textContent = 'Tie Game!';
        endGame();
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        setCurrentPlayerHeader();
    }

}

function didPlayerWin() {
    const releventText = currentPlayer === 1 ? 'X' : 'O';
    return WIN_CONDITIONS.some(condition => {
        return condition.every(gameSquarePosition => {
            return gameSquares[gameSquarePosition].textContent === releventText;
        })
    })
}

function endGame() {
    gameSquares.forEach(gameSquare => {
        gameSquare.disabled = true;
    })
}

function setCurrentPlayerHeader() {
    gameHeading.textContent = `Player ${currentPlayer}'s Turn`
}

function restartGame() {
    currentPlayer = 1;
    numMovesDone = 0;
    setCurrentPlayerHeader();
    gameSquares.forEach( gameSquare => {
        gameSquare.textContent = '';
        gameSquare.disabled = false;
    })
}
