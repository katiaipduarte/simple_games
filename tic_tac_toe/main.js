var winComb, played, player;

var board, ctx, playedSquare = 0;

//variable that take care on counting the number of possible turns that the
//players can make per game
var turn = 0, MAX_TURNS = 9;


//Construct - Instanciate Arrays
window.onload = function() {
   //array of booleans that contains the knowledge if the square was played or not
   played = new Array();
   //array that contains the knowledge of which player used the square
   player = new Array();
   //all the possible combinations that permits a player to win the game
   winComb = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

   for(var i = 0; i <= 8; i++) {
      played[i] = false;
      player[i]='';
   }
}

//function that handles, what happens when pressing certain square in the board game
function onSquarePress(value) {
   this.board = document.getElementById(value);
   this.ctx = board.getContext("2d");

   if(played[value-1] == false) {
      if(turn % 2 == 0) {
         playX(value-1);
      } else {
         playO(value-1);
      }

      turn++;
      played[value-1] = true;
      playedSquare++;
      hasWinner(player[value-1]);

      if(playedSquare == MAX_TURNS) {
         tieGame();
      }
   } else {
      alert("You can't choose that square!");
   }
}

//boolean function that checks if there is a winner and which player won
function hasWinner(play) {
   for(var i = 0; i < winComb.length; i++){
      if(player[winComb[i][0]] == play && player[winComb[i][1]] == play && player[winComb[i][2]] == play){
         alert("Player " + play + " wins the game!");
         startNextRound();
      }
   }
}

//function that handles the start of a new round
function startNextRound() {
   newRound = confirm("New round?");

   if (newRound == false) {
      alert("Goodbye!");
   } else {
      location.reload(true);
   }
}

//function that handles when the game ends up in a tie
function tieGame() {
   alert("It's a tie! Game over!");
   startNextRound();
}

//function that treats the action that occurs, when Player X plays
function playX(value) {
   //create the symbol X in the board game
   ctx.beginPath();
   ctx.moveTo(10,10);
   ctx.lineTo(40,40);
   ctx.moveTo(40,10);
   ctx.lineTo(10,40);
   ctx.stroke();
   ctx.closePath();

   player[value] = 'X';
}

//function that treats the action that occurs, when Player O plays
function playO(value) {
   //create the symbol O in the board game
   ctx.beginPath();
   //x,y,radius, start angle, end angle
   ctx.arc(25,25,20,0,Math.PI*2);
   ctx.stroke();
   ctx.closePath();

   player[value-1] = 'O';
}
