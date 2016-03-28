//better use this option than jQuery version: $(document).ready(function() {})
//This happens because the jQuery version loads faster, if we use to many images
//or animation may cause a delay
//With window.onload the data is only showed when the page is fully processed by
//the browser
window.onload = function() {

   //variable that defines the board game (in 2 dimensions)
	var board = document.getElementById("board"),
		ctx = board.getContext("2d"),
		width = window.innerWidth,
		height = window.innerHeight;

	board.width = width;
	board.height = height;

   //starts score at 0 to both players
	var score = [0,0];
	var points = 10;
	var winner = false;

   //game keys
   var ESC = 27, SPACE = 32, UP_ARROW = 38, DOWN_ARROW = 40, W_KEY = 87, S_KEY = 83;

   //variable with game keys for each player
   //Player 1(w, s, left)
   //Player 2(up arrow, down arrow, right bar)
	var keys = {
		p1: {
			up: false,
			down: false
		},
		p2: {
			up: false,
			down: false
		}
	}

	var players = [
		new Player("left"),
		new Player("right")
	];

   //variable that creates the ball for the game
	var ball = new Ball();

	setInterval(draw, 33);

   //function/class that creates the ball and let her move
	function Ball() {
		this.x = width / 2;
		this.y = height / 2;
		this.style = "white";
		this.radius = 10;
      //angles are expressed in radians
      this.startAngle = 0;
      this.endAngle = Math.PI * 2;
      //coord of the ball
		this.xBall = random() == 0 ? -5 : 5;
		this.yBall = random() == 0 ? -5 : 5;

      //method that draws the ball
		this.draw = function() {
			ctx.beginPath();
			ctx.fillStyle = this.style;
			ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
			ctx.fill();
		}

      //method that updates the ball
		this.update = function() {
         //if the ball is on the left side of the board game then the winner
         //will be Player 2
         if(this.x < 0) {
				winner = 2;
			}
         //if the ball is on the right side of the board game then the winner
         //will be Player 1
			else if(this.x > width - this.radius) {
				winner = 1;
			} else {
				if(this.y < 0) {
					this.y = 0;
					this.yBall *= -1;
				}
				if(this.y > height - this.radius) {
					this.y = height - this.radius;
					this.yBall *= -1;
				}

				var p1 = players[0];
				var p2 = players[1];

				if(this.x > p1.x && this.x < p1.x + p1.rectangleWidth) {
					if(this.y > p1.y && this.y < p1.y + p1.rectangleHeight) {
						this.xBall *= -1;
						score[0] += points;
					}
            }
				if(this.x > p2.x && this.x < p2.x + p2.rectangleWidth) {
					if(this.y > p2.y && this.y < p2.y + p2.rectangleHeight) {
						this.xBall *= -1;
						score[1] += points;
					}
            }
				this.x += this.xBall;
				this.y += this.yBall;
			}
		}
	}

   //function/class that creates the 2 players and lets them move
	function Player(side) {
		this.side = side;

      //if it's the left bar (Player 1) then its red
      //if it's the right bar (Player 2) then its green
		this.style = side == "left" ? "red" : "green";

      //height and width of the bar
		this.rectangleWidth = 25;
		this.rectangleHeight = 100;


      //coordinates for x and y on the upper-left corner of the rectangle
		this.x = side == "left" ? 100 : (width - 100);
		this.y = (height / 2) - (this.rectangleHeight / 2);

      //speed that the bar move
		this.speed = 10;

      //method that draws the rectangle
		this.draw = function() {
			ctx.fillStyle = this.style;
			ctx.fillRect(this.x, this.y, this.rectangleWidth, this.rectangleHeight);
		}

      //method that updates the rectangle
		this.update = function() {
			if(this.side == "left") {
				if(keys.p1.down) {
					this.y += this.speed;
				}
				if(keys.p1.up) {
					this.y -= this.speed;
				}
			} else {
				if(keys.p2.down) {
					this.y += this.speed;
				}
				if(keys.p2.up) {
					this.y -= this.speed;
				}
			}
		}
	}

   //function that draws the board game
	function draw() {
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "#c2c2d6";
		ctx.fillRect(0, 0, width, height);

		if(winner == false) {
         //draws the players into the board game
			for(var i = 0; i < players.length; i++) {
				players[i].draw();
				players[i].update();
			}

         //draws the ball into the board game
			ball.draw();
			ball.update();

         //draws the text with the score into the board game
			ctx.font = "14px Verdana";
			ctx.fillStyle = "white";
         //fillText(text, x coord, y coord), the coord are related to where
         //the text starts to be written in relation to the canvas/board
			ctx.fillText("Player 1: "+ score[0], 15, 35);
			ctx.fillText("Player 2: "+ score[1], 15, 55);
		}
		else {
         //what happens when one of the players wins
         var text = winner == 1 ? "Player 1 wins the game!!!" : "Player 2 wins the game!!!";
			var color = winner == 1 ? "red" : "green";
			var finalScore = winner == 1 ? score[0] : score[1];

         //Winner Text
			ctx.font = "40px Verdana";
			ctx.fillStyle = color;
			ctx.fillText(text, 30, height / 2);
			ctx.font = "14px Verdana";
			ctx.fillStyle = "white;"
			ctx.fillText("Scored "+ finalScore + " points!", 30, 40 + height / 2) ;
		}
	}

   //function that makes this game responsive
	function resizeCanvas() {
		width = window.innerWidth;
		height = window.innerHeight;

		board.width = width;
		board.height = height;
	}

	function keyUp(event) {
      var keyCode = event.which;

		switch(keyCode) {
			//Player 1 UP
			case W_KEY:
				keys.p1.up = false;
			break;
			//Player 1 DOWN
			case S_KEY:
				keys.p1.down = false;
			break;
			//Player 2 UP
			case UP_ARROW:
				keys.p2.up = false;
			break;
			//Player 2 DOWN
			case DOWN_ARROW:
				keys.p2.down = false;
			break;
		}
	}

	function keyDown(event) {
      var keyCode = event.which;

		switch(keyCode) {
			//Player 1 UP
			case W_KEY:
				keys.p1.up = true;
			break;
			//Player 1 DOWN
			case S_KEY:
				keys.p1.down = true;
			break;
			//Player 2 UP
			case UP_ARROW:
				keys.p2.up = true;
			break;
			//Player 2 DOWN
			case DOWN_ARROW:
				keys.p2.down = true;
			break;
		}
	}

	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);
   //resize board, when the height and/or width of the browser window changes
	window.onresize = resizeCanvas;
}

function random() {
	return Math.floor(Math.random());
}

Array.prototype.contains = function(item) {
	return (this.indexOf(item) != -1);
}
