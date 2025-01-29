const boardSize = 4;
let board = [];
let score = 0;
let moved = false;
let firstMove = true;


document.addEventListener('DOMContentLoaded', () => {
    initBoard();
    drawBoard();
    addNewTile();
    addNewTile();

    document.getElementById('restart').addEventListener('click', restartGame);
    document.getElementById('restart-game-over').addEventListener('click', restartGame);
});

function initBoard() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
}

function drawBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            if (tile) {
                tileElement.textContent = tile;
                tileElement.style.backgroundColor = getTileColor(tile);
                tileElement.classList.add('new');
            }
            gameBoard.appendChild(tileElement);
        });
    });
}

function getTileColor(value) {
    const colors = {
        2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
        32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
        512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
    };
    return colors[value] || '#cdc1b4';
}

ffunction addNewTile() {
    let added = false;
    while (!added) {
        let row = Math.floor(Math.random() * boardSize);
        let col = Math.floor(Math.random() * boardSize);
        if (board[row][col] === 0) {
            board[row][col] = Math.random() < 0.9 ? 2 : 4;
            added = true;
        }
    }
    drawBoard();
    
    // Only check for game over after the first move
    if (!firstMove) {
        if (isGameOver()) {
            showGameOver();
        }
    }
    firstMove = false;  // Set the flag to false after the first move
}


document.addEventListener('keydown', (event) => {
    moved = false;
    switch (event.key) {
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
    }
    if (moved) {
        addNewTile();
        updateScore();
        if (isGameOver()) {
            showGameOver();
        }
    }
});

function moveUp() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
        let rowAvailable = 0;
        let lastMergedRow = -1;
        for (let row = 0; row < boardSize; row++) {
            if (board[row][col] !== 0) {
                if (row !== rowAvailable) {
                    board[rowAvailable][col] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (rowAvailable > 0 && board[rowAvailable][col] === board[rowAvailable - 1][col] && lastMergedRow !== rowAvailable - 1) {
                    board[rowAvailable - 1][col] *= 2;
                    board[rowAvailable][col] = 0;
                    score += board[rowAvailable - 1][col];
                    lastMergedRow = rowAvailable - 1;
                    moved = true;
                } else {
                    rowAvailable++;
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
        let rowAvailable = boardSize - 1;
        let lastMergedRow = -1;
        for (let row = boardSize - 1; row >= 0; row--) {
            if (board[row][col] !== 0) {
                if (row !== rowAvailable) {
                    board[rowAvailable][col] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (rowAvailable < boardSize - 1 && board[rowAvailable][col] === board[rowAvailable + 1][col] && lastMergedRow !== rowAvailable + 1) {
                    board[rowAvailable + 1][col] *= 2;
                    board[rowAvailable][col] = 0;
                    score += board[rowAvailable + 1][col];
                    lastMergedRow = rowAvailable + 1;
                    moved = true;
                } else {
                    rowAvailable--;
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
        let colAvailable = 0;
        let lastMergedCol = -1;
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] !== 0) {
                if (col !== colAvailable) {
                    board[row][colAvailable] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (colAvailable > 0 && board[row][colAvailable] === board[row][colAvailable - 1] && lastMergedCol !== colAvailable - 1) {
                    board[row][colAvailable - 1] *= 2;
                    board[row][colAvailable] = 0;
                    score += board[row][colAvailable - 1];
                    lastMergedCol = colAvailable - 1;
                    moved = true;
                } else {
                    colAvailable++;
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
        let colAvailable = boardSize - 1;
        let lastMergedCol = -1;
        for (let col = boardSize - 1; col >= 0; col--) {
            if (board[row][col] !== 0) {
                if (col !== colAvailable) {
                    board[row][colAvailable] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }
                if (colAvailable < boardSize - 1 && board[row][colAvailable] === board[row][colAvailable + 1] && lastMergedCol !== colAvailable + 1) {
                    board[row][colAvailable + 1] *= 2;
                    board[row][colAvailable] = 0;
                    score += board[row][colAvailable + 1];
                    lastMergedCol = colAvailable + 1;
                    moved = true;
                } else {
                    colAvailable--;
                }
            }
        }
    }
    return moved;
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function showGameOver() {
    console.log("Showing Game Over");
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.classList.remove('hidden');
    gameOverElement.style.display = 'flex'; // Ensure it's visible
}

function hideGameOver() {
    console.log("Hiding Game Over");
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.classList.add('hidden');
    gameOverElement.style.display = 'none'; // Ensure it's hidden
}

function restartGame() {
    console.log("Restarting Game");
    score = 0;
    updateScore();
    initBoard();
    drawBoard();
    addNewTile();
    addNewTile();
    hideGameOver();
}

function isGameOver() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) return false;
            if (row > 0 && board[row][col] === board[row - 1][col]) return false;
            if (row < boardSize - 1 && board[row][col] === board[row + 1][col]) return false;
            if (col > 0 && board[row][col] === board[row][col - 1]) return false;
            if (col < boardSize - 1 && board[row][col] === board[row][col + 1]) return false;
        }
    }
    return true;
}



