/**
 * Created by oleg on 07.04.2015.
 */
function Game()
{
    var timerId;
    var speed = 200;
    var _this = this;


    this.start = function()
    {
        var saved = false;

        m1 = new Matrix('#matrix', 20, 20);
        m1.create();

        var snake = new Snake(4);

        fruits = new Fruits();
        fruits.create(3,'fruit');

        message = new Message();
        message.empty();

        function playersList(data)//, textStatus)
        {
            for(var i = 0; i < data.length; i++) {
                var html = '<b>' + data[i].name + '</b> ';
                html += '<b id="b2">' + data[i].score + '</b>';
                html += '<hr/>';

                $('#players').prepend(html);
            }
        }

        function searchedPlayersList(data)//, textStatus)
        {
            //alert(searched);
            //for(var j = 0; j< data.length; j++){
                $('#players').empty();
            //}
            for(var i = 0; i < data.length; i++) {

                if (data[i].name == searched) {
                    var html = '<b>' + data[i].name + '</b> ';
                    html += '<b id="b2">' + data[i].score + '</b>';
                    html += '<hr/>';

                    $('#players').prepend(html);
                }
            }
            for(var i = 0; i < data.length; i++) {

                if (searched == '') {
                    var html = '<b>' + data[i].name + '</b> ';
                    html += '<b id="b2">' + data[i].score + '</b>';
                    html += '<hr/>';

                    $('#players').prepend(html);
                }
            }
        }

        $.post("get.php", {name: name, score: '' }, playersList, "json");

        this.level = function(number)
        {
            $('#matrix').css({'background-color': '#e8faf4'});
            speed =  200 / number;
            clearInterval(timerId);
            timerId = setInterval(snake.move, speed);
            fruits.create(2 * number, 'fruit');
            fruits.create(2 * number, 'bomb');

        }

        $('.SearchInput').change(function(event){

            searched = $('.SearchInput').val();
            $.post("get.php", {name: '', score: '' }, searchedPlayersList, "json");

        });

        this.clear = function()
        {
            clearInterval(timerId);
            var $cell = $('#matrix').children();
            for (var i = 1; i < 400; i++){
                if($cell.eq(i).hasClass('fruit')){
                    $cell.eq(i).removeClass('fruit');
                }
                if($('#matrix').children().eq(i).hasClass('on')){
                    $('#matrix').children().eq(i).removeClass('on');
                }
                if($('#matrix').children().eq(i).hasClass('bomb')){
                    $('#matrix').children().eq(i).removeClass('bomb');
                }
            }
        }

        $(document).keydown(function(event)
        {
            switch(event.keyCode)
            {
                case KEY_LEFT:
                    snake.course = 'left';
                    break;
                case KEY_RIGHT:
                    snake.course = 'right';
                    break;
                case KEY_UP:
                    snake.course = 'up';
                    break;
                case KEY_DOWN:
                    snake.course = 'down';
                    break;
                case KEY_PLUS:
                    fruits.create(1, 'cell fruit');
                    break;
                case KEY_SLASH:
                    $('#message').slideToggle(1000, 0);  //Скрыть/показать выпадающие сообщения
                    break;
                case KEY_ENTER:
                    break;
                case KEY_PAUSE:
                    break;
                case KEY_ESC:
                    message.empty();
                    _this.clear();
                    break;
            }
        });

        this.over = function()
        {
            clearInterval(timerId);

            $('#form').html('<input id="name" name="name" type="text" value="Ваше имя"/>' +
                                  '<input id="score" name="score" type="hidden" value="0"/>'+
                                  '<input type="button" id="ok_button" value="ok"/>'
                                  );
            $('#score').val(fruits.number);

            $("#ok_button").click(function(event){

                if (!saved) {

                    var name = $('#name').val();
                    var score = $('#score').val();

                    if(name == '' || score == 0)
                        return false;

                    $.post('add.php', {name: name, score: score}, function(){alert('json!')},"json");
                    saved = true;
                }
                $.post("get.php", {name: name, score: score}, playersList, "json");
            });
        }
        timerId = setInterval(snake.move, speed);

    }
}