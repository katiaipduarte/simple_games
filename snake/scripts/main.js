//variables
var board, snake, start, food;
var direction = 'right';
var speed = 100, round = 1, eatenFoodCount = 0;
var MAX_FOOD = 12;

//board size (400px)
var boardWidth = 50, boardHeight = 50;

//width and height of the snake
var snakeWidth = 8, snakeHeight = 8;

//game keys
var ESC = 27;
var SPACE = 32;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;


$(document).ready(function() {
   $('body').keydown(keyPressed);
});

//function that handles, what happens when pressing certain keys on the keyboard
function keyPressed(event) {
   var keyCode = event.which;

   switch (keyCode) {
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

};

//function to end the game
function endGame() {

};

//function that handles what happens when the game is lost
function loseGame() {

};

//function that handles the start of a new round
function nextGameRound() {

};

//function to draw the snake in the game board
function drawSnake() {

};

//function to move snake
function moveSnake() {
   generateFood();
   snake.moveSnake(direction);

   if (snake.hasPos(food.xPos, food.yPos)) {
      eatFood();
   }

   drawSnake();
};

//function that generates the food
function generateFood() {

};

//fucntion that handles the action of the snake eating the food
function eatFood() {

};
