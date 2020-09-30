import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const expansionRate = 1;
let score = 0;

export function update() {
  if (onSnake(food)) {
    expandSnake(expansionRate);
    food = getRandomFoodPosition();
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("score").style.color = "#087505";
    setTimeout(() => {
      document.getElementById("score").style.color = "black";
    }, 300);

    document.getElementById("finalScore").textContent = score;
  }
}

export function draw(gameBoard) {
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add("food");
  gameBoard.appendChild(foodEl);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
