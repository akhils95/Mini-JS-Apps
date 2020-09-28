var origBoard;
const huPlayer = "X";
const aiPlayer = "O";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
];
let gameLevel = "";

const cellsContainer = document.querySelectorAll(".grid");
const cells = document.querySelectorAll(".grid-box");

const splashPage = document.getElementById("splash-page");
const resultPage = document.getElementById("result-page");
const startBtn = document.querySelector(".start-game");
const radioInputs = document.querySelectorAll("input");
const radioContainers = document.querySelectorAll(".radio-container");

//Functions

function chooseLevel() {
  let level;
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
      level = radioInput.value;
    }
  });
  return level;
}

function startGame() {
  gameLevel = chooseLevel();
  if (!gameLevel) {
    document.getElementById("message").style.display = "block";
  } else {
    splashPage.style.display = "none";
    resultPage.classList.replace("result-page", "hide");
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = "";
      cells[i].addEventListener("click", turnClick, false);
      cellsContainer[i].style.background = "white";
      cells[i].style.background = "white";
    }
  }
}

function turnClick(e) {
  if (typeof origBoard[e.target.id.replace("g", "")] == "number") {
    turn(e.target.id, huPlayer);
    if (!checkTie()) turn(bestSpot(), aiPlayer);
  }
}

function turn(gridId, player) {
  gridId = typeof gridId == "number" ? "g" + gridId : gridId;
  gId = typeof gridId == "number" ? gridId : gridId.replace("g", "");
  origBoard[gId] = player;
  document.getElementById(gridId).innerText = player;
  document.getElementById(gridId).style.background = "rgba(0, 0, 0, 0.3)";
  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  let plays = [];
  board.forEach((elem, i) => {
    if (elem == player) {
      plays = plays.concat(i);
    }
  });
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.background =
      gameWon.player == huPlayer ? "#14c419" : "#e8291e";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player == huPlayer ? "You Win!" : "Computer Wins!");
}

function declareWinner(winner) {
  resultPage.classList.replace("hide", "result-page");
  document.querySelector("#result-page .result").innerText = winner;
}

function emptyGrids() {
  return origBoard.filter((s) => typeof s == "number");
}

function bestSpot() {
  if (gameLevel === "beginner") {
    const random = getRandomInt(emptyGrids().length - 1);
    return emptyGrids()[random];
  } else if (gameLevel === "expert") {
    return minimax(origBoard, aiPlayer).index;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function minimax(newBoard, player) {
  var availSpots = emptyGrids(newBoard);

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }
  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function checkTie() {
  if (
    emptyGrids().length == 0 &&
    !checkWin(origBoard, huPlayer) &&
    !checkWin(origBoard, aiPlayer)
  ) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Game Tied!");
    return true;
  }
  return false;
}

splashPage.addEventListener("click", () => {
  radioContainers.forEach((radioEl) => {
    radioEl.classList.remove("selected-label");
    if (radioEl.children[1].checked) {
      radioEl.classList.add("selected-label");
    }
  });
});
