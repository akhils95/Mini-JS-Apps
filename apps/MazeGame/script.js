let btn = document.getElementById('start');
let gameBoard = document.getElementById('gameBoard');
let maze = document.querySelector('.maze');
let difficulty = document.getElementsByName('difficulty');
let timeEl = document.getElementById('time');
let movesEl = document.getElementById('moves');

const left = document.getElementById("left");
const right = document.getElementById("right");
const up = document.getElementById("up");
const down = document.getElementById("down");

let newMaze;
let gameCell = {x: 0, y: 0};
let endCell;
let charSize;
let input;
let isMoveMade = false;

// Timer
let timer;
let time;
let timeToShow ='00:00';

let moves = 0;

/*
Maze creation code
*/
// Initialize canvas
let ctx = maze.getContext("2d");

// Defining variables
let currentCell;

// Define classes
class Maze {
    constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }

    setup() {
        for(let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                let cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        currentCell = this.grid[0][0];
    }

    draw() {
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = 'black';
        currentCell.visited = true;

        for(let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }

        let nextCell = currentCell.checkNeighbors();
        if (nextCell) {
            nextCell.visited = true
            this.stack.push(currentCell);

            currentCell.highlight(this.columns);
            currentCell.removeWall(currentCell, nextCell);

            currentCell = nextCell;
        } else if(this.stack.length > 0) {
            let cell = this.stack.pop();
            currentCell = cell;

            currentCell.highlight(this.columns);
        }

        if(this.stack.length == 0) {
            currentCell.highlight(this.columns, 'black');
        }

        window.requestAnimationFrame(() => {
            this.draw();
        })
    } 
}

class Cell {
    constructor(rowNum, colNum, parentGrid, parentSize) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.walls = {
            topWall: true,
            bottomWall: true,
            rightWall: true,
            leftWall: true
        };
    }

    checkNeighbors() {
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbors = [];

        let top = row !== 0 ? grid[row-1][col] :undefined;
        let right = col !== grid.length - 1 ? grid[row][col+1] :undefined;
        let bottom = row !== grid.length - 1 ? grid[row+1][col] :undefined;
        let left = col !== 0 ? grid[row][col-1] :undefined;

        if(top && !top.visited) neighbors.push(top);
        if(right && !right.visited) neighbors.push(right);
        if(bottom && !bottom.visited) neighbors.push(bottom);
        if(left && !left.visited) neighbors.push(left);

        if(neighbors.length !== 0) {
            let random = Math.floor(Math.random() * neighbors.length);
            return neighbors[random];
        } else {
            return undefined;
        }
    }

    drawTopWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+size/columns, y);
        ctx.stroke();
    }

    drawRightWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x+size/columns, y);
        ctx.lineTo(x+size/columns, y+size/rows);
        ctx.stroke();
    }

    drawBottomWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x+size/columns, y+size/rows);
        ctx.lineTo(x, y+size/rows);
        ctx.stroke();
    }

    drawLeftWall(x, y, size, columns, rows) {
        ctx.beginPath();
        ctx.moveTo(x, y+size/rows);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    highlight(columns, color) {
        color = color || 'red';
        let x = this.colNum * this.parentSize / columns + 1;
        let y = this.rowNum * this.parentSize / columns + 1;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.parentSize/columns-3, this.parentSize/columns-3)
        charSize = this.parentSize/columns -1;
    }

    removeWall(cell1, cell2) {
        let x = cell1.colNum - cell2.colNum;
        if(x == 1) {
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        } else if(x == -1) {
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        let y = cell1.rowNum - cell2.rowNum;
        if(y == 1) {
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        } else if(y == -1) {
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    }

    show(size, rows, columns) {
        let x = this.colNum * size / columns;
        let y = this.rowNum * size / rows;

        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';
        ctx.lineWidth = '2px';

        if(this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
        if(this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
        if(this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
        if(this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
        if(this.visited) {
            ctx.fillRect(x+1, y+1, size / columns -2, size / rows - 2)
        }
    }
}

/* 
Check Time
*/
const addTime = () => {
    time += 1;
    updateTime();
}

const startTimer = () => {
    time = 0;
    timer = setInterval(addTime, 1000);
}

const stopTimer = () => {
    clearInterval(timer);
}

const updateTime = () => {
    let seconds = time > 59 ? time%60 : time;
    let minutes = Math.trunc(time/60);
    if(minutes<10) {minutes = '0' + minutes;}
    if(seconds<10) {seconds = '0' + seconds;}
    const dispTime = `${minutes} : ${seconds}`;
    timeToShow = dispTime;
    timeEl.innerText = dispTime;
}

const addMoves = () => {
    moves += 1;
    updateMoves();
}

const updateMoves = () => {
    let movesStr = moves < 10 ? '0' + moves : moves;
    movesEl.innerText = movesStr;
}

/*
Game play code
*/

let inputDirection ={x: 0, y: 0};

const takeInput = (inp) => {
    let direction = '';
    switch(inp) {
        case 'ArrowUp':
            inputDirection = {x: 0, y: -1};
            direction = 'up';
            isMoveMade = true;
            break;
        case "ArrowDown":
            inputDirection = {x: 0, y: 1};
            direction = 'down';
            isMoveMade = true;
            break;
        case "ArrowLeft":
            inputDirection = {x: -1, y: 0};
            direction = 'left';
            isMoveMade = true;
            break;
        case "ArrowRight":
            inputDirection = {x: 1, y: 0};
            direction = 'right';
            isMoveMade = true;
            break;
    }

    input = direction;
}

const populateBone = () => {
    const bone = document.createElement('div');
    const img = new Image();
    img.src= './images/bone.svg';
    img.setAttribute('style', 'width:'+charSize);
    bone.appendChild(img);
    bone.style.gridRowStart = buildSize;
    bone.style.gridColumnStart = buildSize;
    gameBoard.appendChild(bone);
}

const populateDog = (newCell) => {
    if(document.getElementById('dog')) {
        document.getElementById('dog').outerHTML = '';
    }
    const dog = document.createElement('div');
    const img = new Image();
    img.src = './images/dog.svg';
    img.setAttribute('style', 'width:'+charSize);
    dog.appendChild(img);
    dog.style.gridRowStart = newCell.y+1;
    dog.style.gridColumnStart = newCell.x+1;
    dog.setAttribute('id', 'dog');
    gameBoard.appendChild(dog);
}

const checkMovable = (cell, direction) => {
    let row = cell.x;
    let col = cell.y;
    let movable = false;
    switch(direction) {
        case 'up':
            if(!newMaze.grid[col][row].walls.topWall) {
                movable = true;
            }
        break;
        case 'down':
            if(!newMaze.grid[col][row].walls.bottomWall) {
                movable = true;
            }
        break;
        case 'right':
            if(!newMaze.grid[col][row].walls.rightWall) {
                movable = true;
            }
        break;
        case 'left':
            if(!newMaze.grid[col][row].walls.leftWall) {
                movable = true;
            }
        break;
    }
    return movable;
} 

const gameOn = (pos) => {
    let status = true;
    if (pos.x === buildSize-1 && pos.y === buildSize-1) {
        status = false;
    }
    return status;
} 

const gameOver = () => {
    stopTimer();
    document.getElementById('finalTime').innerText = timeToShow;
    document.getElementById('finalMoves').innerText = moves;
    gameBoard.innerHTML = '';
    gameBoard.setAttribute('style', 'display: none');
    document.querySelector('.score').setAttribute('style', 'display: none');
    document.querySelector('.welcome').setAttribute('style', 'display: flex');
    document.querySelector('.game-over').setAttribute('style', 'display: flex');
}

const gamePlay = () => {
    let currentPos = gameCell;
    let nextCell = gameCell;
    if(isMoveMade && gameOn(currentPos)) {
        if(checkMovable(currentPos, input)) {
            addMoves();
            nextCell.x = currentPos.x + inputDirection.x;
            nextCell.y = currentPos.y + inputDirection.y;
            populateDog(nextCell);
            currentPos = nextCell;
        }
        isMoveMade = false;
    } else if(!gameOn(currentPos)) {
        gameOver();
        return;
    }
    window.requestAnimationFrame(gamePlay);
}

const createMaze = () => {
    if (screen.width < 500) {
        newMaze = new Maze(screen.width, buildSize, buildSize);
    } else {
        newMaze = new Maze(500, buildSize, buildSize);
    }
}

// Build maze function
let buildSize = 10;
const buildMaze = () => {
    document.querySelector('.welcome').setAttribute('style', 'display: none');
    document.querySelector('.score').setAttribute('style', 'display: flex');
    gameBoard.setAttribute('style', 'display: grid');
    createMaze();
    newMaze.setup();
    newMaze.draw();
    populateBone();
    populateDog({x:0, y:0});
    window.requestAnimationFrame(gamePlay);
    startTimer();
}

// Change button color as per radio option
difficulty.forEach(diff => {
    diff.addEventListener('change', e => {
        if(e.target.checked) {
            var className = '';
            var gridClass = '';
            if(e.target.id === 'easy') {
                className = 'green-button';
                gridClass = 'easy-grid';
                buildSize = 10;
            }
            if(e.target.id === 'medium') {
                className = 'yellow-button';
                gridClass = 'medium-grid';
                buildSize = 15;
            } 
            if(e.target.id === 'hard') {
                className = 'red-button';
                gridClass = 'hard-grid';
                buildSize = 20;
            }
            btn.classList.remove('green-button', 'yellow-button', 'red-button');
            btn.classList.add(className);
            gameBoard.classList.remove('easy-grid', 'medium-grid', 'hard-grid');
            gameBoard.classList.add(gridClass);
        }
    } );
});

btn.addEventListener('click', buildMaze);

window.addEventListener('keydown', e => takeInput(e.key));

up.addEventListener("click", () => takeInput('ArrowUp'));
down.addEventListener("click", () => takeInput('ArrowDown'));
left.addEventListener("click", () => takeInput('ArrowLeft'));
right.addEventListener("click", () => takeInput('ArrowRight'));
