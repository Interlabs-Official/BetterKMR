// Snake, coded by AI because why would I bother lol

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = canvas.width; 
let snake = [];
let food = {};
let direction = {x: gridSize, y: 0}; 
let gameInterval = null;
let isPaused = false;
const speed = 100; 

function init() {
  snake = [
    {x: 200, y: 200},
    {x: 180, y: 200},
    {x: 160, y: 200}
  ];
  direction = {x: gridSize, y: 0};
  placeFood();
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
  };

  snake.forEach(segment => {
    if(segment.x === food.x && segment.y === food.y) {
      placeFood();
    }
  });
}

function collision(head, array) {
  return array.some(segment => segment.x === head.x && segment.y === head.y);
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const update = async () => {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    collision(head, snake)
  ) {
    clearInterval(gameInterval);
    gameInterval = null;
    createNotification(`Game over.`, "#961a1a", "#ffffff");
    document.getElementById("super-secret-tab-header").style.visibility = "hidden";

    const tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const tabContents = document.querySelectorAll('.tab-content');
          tabContents.forEach(tc => tc.classList.remove('active'));
        });
    await delay(1000);
    window.location.reload();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }
}

function draw() {

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function gameLoop() {
  if (!isPaused) {
    update();
    draw();
  }
}

document.addEventListener("keydown", function(e) {
  switch(e.key) {
    case "ArrowUp":
      if (direction.y === 0) {
        direction = {x: 0, y: -gridSize};
      }
      break;
    case "ArrowDown":
      if (direction.y === 0) {
        direction = {x: 0, y: gridSize};
      }
      break;
    case "ArrowLeft":
      if (direction.x === 0) {
        direction = {x: -gridSize, y: 0};
      }
      break;
    case "ArrowRight":
      if (direction.x === 0) {
        direction = {x: gridSize, y: 0};
      }
      break;
  }
});

document.getElementById("snakePlayBtn").addEventListener("click", function() {
  if (!gameInterval) {
    init();
    draw();
    gameInterval = setInterval(gameLoop, speed);
    isPaused = false;
  } else {
    isPaused = false;
  }
});

init();
draw();