let currentPlayer;
let player1Name;
let player2Name;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

function startGame() {
    player1Name = document.getElementById("player1Name").value || "Player 1";
    player2Name = document.getElementById("player2Name").value || "Player 2";
    currentPlayer = player1Name;
    
    document.getElementById("players").classList.add("hidden");
    document.getElementById("gameBoard").classList.remove("hidden");
    document.getElementById("score").classList.remove("hidden");
    document.getElementById("player1Score").innerText = `${player1Name}: ${player1Score}`;
    document.getElementById("player2Score").innerText = `${player2Name}: ${player2Score}`;
    
    createGameBoard();
}

function createGameBoard() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(event) {
    if (gameOver) return; // Check if the game is already over
    const cell = event.target;
    if (!cell.innerText) {
        cell.innerText = currentPlayer === player1Name ? "X" : "O";
        if (checkWinner()) {
            if (currentPlayer === player1Name) {
                player1Score++;
            } else {
                player2Score++;
            }
            updateScore();
            gameOver = true;
            alert(`${currentPlayer} wins!`);
            return;
        } else if (checkDraw()) {
            gameOver = true;
            alert("It's a draw!");
            return;
        } else {
            currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const cells = document.getElementsByClassName("cell");
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    const cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
        if (!cell.innerText) {
            return false;
        }
    }
    return true;
}



function continueGame() {
    resetBoard();
    startGame();
}

function updateScore() {
    document.getElementById("player1Score").innerText = `${player1Name}: ${player1Score}`;
    document.getElementById("player2Score").innerText = `${player2Name}: ${player2Score}`;
}

function resetBoard() {
    const cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
        cell.innerText = "";
    }
    currentPlayer = player1Name;
    gameOver = false;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    updateScore();
    resetBoard(); 
    startGame(); 
}
