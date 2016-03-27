//variables
var board, snake, started, food;
var direction = 'right';
var speed = 100, round = 1, foodEatenCount = 0, MAX_FOOD_ROUND = 10;

//board game size
var boardWidth = 50, boardHeight = 50;

//snake size
var snakeWidth = 8, snakeHeight = 8;

//game keys
var ESC = 27, SPACE = 32, LEFT_ARROW = 37, UP_ARROW = 38, RIGHT_ARROW = 39, DOWN_ARROW = 40;

$(document).ready(function() {
    $('body').keydown(onKeyPress);
});

//function that handles, what happens when pressing certain keys on the keyboard
function onKeyPress(event) {
   var keyCode = event.which;
   
   switch(keyCode) {
      case LEFT_ARROW:
         direction = 'left';
         break;
      case UP_ARROW:
         direction = 'up';
         break;
      case RIGHT_ARROW:
         direction = 'right';
         break;
      case DOWN_ARROW:
         direction = 'down';
         break;
      case SPACE:
         startGame();
         break;
      case ESC:
         endGame();
         break;
   }
};

//function to start the game
function startGame() {
   board = new Board();
   direction = 'right';
   foodEatenCount = 0;
   round = 1;
   speed = 100;

   endGame();
   board.clearGameInfo();
   
   snake = new Snake(80, 80);
   snake.onCrash(loseGame,{xPos:400, yPos:400});
   drawSnake();
   started = setInterval(moveSnake, speed);
};

//function to end the game
function endGame() {
   if(started) {
      clearInterval(started);
   }
   
   board.clearBoard();
};

//function that handles what happens when the game is lost
function loseGame() {
   endGame();
   board.showLoseMsg();
};

//function that handles the start of a new round
function startNextRound() {
   round++;
   foodEatenCount = 0;
   board.showNextRoundMsg();
   speed = Math.floor(speed * 0.8);
   clearInterval(started);
   started = setInterval(moveSnake, speed);
};

//function to draw the snake in the game board
function drawSnake() {
   board.removeSnake();
   
   //draw the new snake
   var body = snake.getBody();
   
   for(var i = 0; i < body.length; i++) {
      board.drawElement('snake', body[i].xPos, body[i].yPos);
   }
};

//function to move snake
function moveSnake() {
   createFood();
   snake.move(direction);
   
   if(snake.hasPos(food.xPos, food.yPos)) {
      eatFood();
   }
      
   drawSnake();
};

//function that generates the food
function createFood() {
   if(board.hasNoCreatedFood()) {
      do {
         xPos = Math.floor(Math.random() * boardWidth) * snakeWidth;
         yPos = Math.floor(Math.random() * boardHeight)* snakeHeight;
      }
      while(snake.hasPos(xPos, yPos));
      food = {xPos:xPos, yPos:yPos};
      board.drawElement('food', xPos, yPos);
   }
};

//function that handles the action of the snake eating the food
function eatFood() {
   snake.eatFood();
   board.removeFood();
   
   foodEatenCount++;
   if(foodEatenCount >= MAX_FOOD_ROUND)
      startNextRound();
   
   board.updateScore(round);
};