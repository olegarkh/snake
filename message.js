//
//Сообщение при достижение границ матрицы
//
function Message()
{
   var $message = $('#message');

   this.border = function()
   {
       $message.html('&nbsp;Border! Press an arrow to continue...');
   }

   this.win = function()
   {
	   //document.getElementById('message').innerHTML = 'You Win !';
	   $message.html('You Win !');
   }

   this.game_over = function(value)
   {
       $message.html('Game over!' +'<br>'+ 'You have ' + value + ' fruits. ');
   }

   this.continue = function()
   {
       $message.html('Press Enter for continue...');
   }

   this.box = function(text)
   {
       $message.html(text);
   }

   this.empty = function()
   {
	   $message.html('');
   }
}