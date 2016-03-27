function Board() {

   //draw snake in board
   this.drawElement = function (classname, xPos,yPos) {
      var $element = $('<div/>').addClass(classname);
      $element.css('top', yPos+'px').css('left', xPos+'px');
      $('#game').append($element);
   };

   this.clearBoard = function(){
      $('div.snake').remove();
      $('.food').remove();
   };

   this.clearGameInfo = function() {
      $('#score').html('0');
      $('#loseMsg').css('visibility','hidden');
      $('#speed').html('1');
   };

   this.hasNoCreatedFood = function() {
      return $('.food').length == 0 ;
   };

   this.removeSnake = function() {
      $('div.snake').remove();
   };

   this.removeFood = function() {
      $('.food').remove();
   };

   this.updateScore = function(currentRound) {
      var $currentScore = Number($('#score').html());
      $currentScore += currentRound;
      $('#score').html($currentScore);
   };

   this.showLoseMsg = function(){
      $('#loseMsg').css('visibility','visible');
   };

   this.showNextRoundMsg = function() {
      $('#nextRndMsg').hide().css({visibility: 'visible'}).fadeIn(2000);
      $('#nextRndMsg').fadeOut(2000, function() {
         $(this).show().css({visibility: 'hidden'});
      });

      var $currentSpeed = Number($('#speed').html());
      $currentSpeed++;
      $('#speed').html($currentSpeed);
   };
}
