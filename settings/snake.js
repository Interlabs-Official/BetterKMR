const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Double the grid size but keep canvas the same
const GRID_SIZE = 40;
canvas.width = 600; // Double canvas size to maintain grid count
canvas.height = 600;
const CANVAS_SIZE = canvas.width;
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;
const WIN_LENGTH = Math.floor((CANVAS_SIZE / GRID_SIZE) ** 2 * 0.5); // Win when snake fills 50% of board
const INITIAL_SPEED = 150;
const MIN_SPEED = 50; // Maximum speed (minimum delay)
const SPEED_INCREASE = 1; // ms faster per food eaten

let snake = [];
let food = {};
let direction = { x: GRID_SIZE, y: 0 };
let nextDirection = { x: GRID_SIZE, y: 0 }; // Prevent multiple turns before next update
let gameInterval = null;
let isPaused = false;
let currentSpeed = INITIAL_SPEED;
let score = 0;

// Colors and styles
const COLORS = {
    background: '#1a1a1a',
    snake: {
        head: '#4CAF50',
        body: '#388E3C'
    },
    food: '#FF5722',
    border: '#333333',
    text: '#ffffff',
    menuBackground: 'rgba(0, 0, 0, 0.7)'
};

// Create menu elements
const pauseMenu = document.createElement('div');
pauseMenu.id = 'pauseMenu';
pauseMenu.style.position = 'absolute';
pauseMenu.style.top = '50%';
pauseMenu.style.left = '50%';
pauseMenu.style.transform = 'translate(-50%, -50%)';
pauseMenu.style.backgroundColor = COLORS.menuBackground;
pauseMenu.style.color = COLORS.text;
pauseMenu.style.padding = '20px';
pauseMenu.style.borderRadius = '10px';
pauseMenu.style.textAlign = 'center';
pauseMenu.style.display = 'none';
pauseMenu.style.zIndex = '1000';
pauseMenu.innerHTML = '<h2>Game Paused</h2><p>Press Space to resume</p>';

const startMenu = document.createElement('div');
startMenu.id = 'startMenu';
startMenu.style.position = 'absolute';
startMenu.style.top = '50%';
startMenu.style.left = '50%';
startMenu.style.transform = 'translate(-50%, -50%)';
startMenu.style.backgroundColor = COLORS.menuBackground;
startMenu.style.color = COLORS.text;
startMenu.style.padding = '20px';
startMenu.style.borderRadius = '10px';
startMenu.style.textAlign = 'center';
startMenu.style.zIndex = '1000';
startMenu.innerHTML = '<h2>Snake Game</h2><p>Press Space to start game</p>' +
                      '<p>Use Arrow Keys or WASD to move</p>';

// Add menus to the canvas container
canvas.parentElement.style.position = 'relative';
canvas.parentElement.appendChild(pauseMenu);
canvas.parentElement.appendChild(startMenu);

// Show/hide menus
function showPauseMenu() {
    pauseMenu.style.display = 'block';
}

function hidePauseMenu() {
    pauseMenu.style.display = 'none';
}

function showStartMenu() {
    startMenu.style.display = 'block';
}

function hideStartMenu() {
    startMenu.style.display = 'none';
}

function init() {
    // Start snake in the middle
    const middle = Math.floor(GRID_COUNT / 2) * GRID_SIZE;
    snake = [
        { x: middle, y: middle },
        { x: middle - GRID_SIZE, y: middle },
        { x: middle - GRID_SIZE * 2, y: middle }
    ];
    direction = { x: GRID_SIZE, y: 0 };
    nextDirection = { x: GRID_SIZE, y: 0 };
    currentSpeed = INITIAL_SPEED;
    score = 0;
    placeFood();
}

function placeFood() {
    // Keep trying until we find a valid spot
    do {
        food = {
            x: Math.floor(Math.random() * GRID_COUNT) * GRID_SIZE,
            y: Math.floor(Math.random() * GRID_COUNT) * GRID_SIZE
        };
    } while (collision(food, snake));
}

function collision(pos, array) {
    return array.some(segment => segment.x === pos.x && segment.y === pos.y);
}

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, GRID_SIZE - 2, GRID_SIZE - 2); // Slightly smaller to create grid effect
}

function drawScore() {
    ctx.fillStyle = COLORS.text;
    ctx.font = '30px Inter'; // Larger font for larger canvas
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 20, 50);
    
    // Show win target
    ctx.textAlign = 'right';
    ctx.fillText(`Target: ${WIN_LENGTH}`, CANVAS_SIZE - 20, 50);
}

const update = () => {
    // Update direction from nextDirection
    direction = { ...nextDirection };
    
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };

    // Check wall collision - die when hitting walls instead of wrapping
    if (head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE) {
        gameOver();
        return;
    }

    // Check self-collision
    if (collision(head, snake)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Handle food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        // Speed up the game
        currentSpeed = Math.max(MIN_SPEED, currentSpeed - SPEED_INCREASE);
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, currentSpeed);
        }
        
        // Check win condition
        if (snake.length >= WIN_LENGTH) {
            victory();
            return;
        }
        
        placeFood();
    } else {
        snake.pop();
    }
};

function draw() {
    // Clear canvas with background
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid (optional)
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_SIZE; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_SIZE, i);
        ctx.stroke();
    }

    // Draw food
    drawBlock(food.x, food.y, COLORS.food);

    // Draw snake
    snake.forEach((segment, index) => {
        drawBlock(
            segment.x, 
            segment.y, 
            index === 0 ? COLORS.snake.head : COLORS.snake.body
        );
    });

    drawScore();
}

function gameLoop() {
    if (!isPaused) {
        update();
        draw();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    gameInterval = null;
    createNotification('Game Over! Score: ' + score, "#961a1a", "#ffffff");
    resetGame();
    showStartMenu();
}

function victory() {
    clearInterval(gameInterval);
    gameInterval = null;
    createNotification('Victory! You filled the board!', "#3c8443", "#ffffff");
    resetGame();
    showStartMenu();
}

function resetGame() {
    document.getElementById("super-secret-tab-header").style.visibility = "hidden";
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === 'general') {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tc => tc.classList.remove('active'));
            document.getElementById('tab-general').classList.add('active');
        }
    });
    document.querySelectorAll('.nested-tab-item').forEach(nTab => {
        if (nTab.getAttribute('data-nested-tab') === 'general') {
            selectNestedTab(nTab);
        }
    });
    window.isSecretCodeActivated = false;
}

window.pauseGame = function() {
    if (gameInterval) {
        isPaused = true;
        showPauseMenu();
    }
}

function resumeGame() {
    if (gameInterval) {
        isPaused = false;
        hidePauseMenu();
    }
}

function startGame() {
    if (!gameInterval) {
        init();
        draw();
        gameInterval = setInterval(gameLoop, currentSpeed);
        isPaused = false;
        hideStartMenu();
    }
}

function handleKeydown(e) {
    // Prevent default behavior for arrow keys and WASD
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D", " "].includes(e.key)) {
        e.preventDefault();
    }

    const isOnSecretTab = Array.from(document.querySelectorAll('.tab-item')).find(tab => 
        tab.classList.contains('active') && tab.textContent == "Super Secret Settings"
    ) != null;
    if (e.key === " " && isOnSecretTab) {
        // Space key behavior depends on game state
        if (!gameInterval) {
            startGame();
        } else if (isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
        return;
    }

    if (!gameInterval || isPaused) return; // Only register movement when game is running and not paused

    // Check both arrow keys and WASD
    switch(e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if (direction.y === 0) { // Prevent 180-degree turns
                nextDirection = {x: 0, y: -GRID_SIZE};
            }
            break;
        case "ArrowDown":
        case "s":
        case "S":
            if (direction.y === 0) {
                nextDirection = {x: 0, y: GRID_SIZE};
            }
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            if (direction.x === 0) {
                nextDirection = {x: -GRID_SIZE, y: 0};
            }
            break;
        case "ArrowRight":
        case "d":
        case "D":
            if (direction.x === 0) {
                nextDirection = {x: GRID_SIZE, y: 0};
            }
            break;
    }
}

document.addEventListener("keydown", handleKeydown);

// Add focus/blur event listeners
window.addEventListener("blur", function() {
    if (gameInterval && !isPaused) {
        pauseGame();
    }
});

// Hide the play button
const playButton = document.getElementById("snakePlayBtn");
playButton.style.display = "none";

// Initial draw and show start menu
init();
draw();
showStartMenu();