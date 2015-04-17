/**
 * Created by oleg on 05.04.2015.
 */
function Snake(length)
{
    //this.body = [{row: 1, col: 1}, {row: 1, col: 2}];
    this.course = 'right';
    this.body = [];
    this.length = length;
    this.fruits = 0;
    var _this = this;


    for (var i = 0; i < length; i++ ) {
            this.body.unshift({row: 1, col: i+1});
    }

    this.draw = function (body) {
        for (var i = 0; i < body.length; i++) {
            m1.setCell(_this.body[i].row, _this.body[i].col, true);
        }
    }

    this.remove = function(body)
    {
        var last = _this.body.length - 1;

        for ( var i = 0; i <= last ; i++ ) {
            m1.setCell(body[i].row, body[i].col, false);
        }
    }

    _this.draw(_this.body);


    this.checkBorder = function()
    {
        var head = _this.body[0];
        var course = _this.course;

        if (((course == 'right') && (head.col >= m1.cols)) ||
            ((course == 'left' ) && (head.col <= 1)) ||
            ((course == 'up'   ) && (head.row <= 1)) ||
            ((course == 'down' ) && (head.row >= m1.rows)))
        {
            message.border();
            return false;
        }
        else{
            message.empty();
            return true;
        }
    }

    this.move = function()
    {
        var row = _this.body[0].row;
        var col = _this.body[0].col;

        if(_this.checkBorder() == false){
            return;
        }

        switch(_this.course)
        {
            case 'right':
             _this.body.unshift({row: row, col: col+1});
             break;
             case 'left':
             _this.body.unshift({row: row, col: col-1});
             break;
             case 'up':
             _this.body.unshift({row: row-1, col: col});
             break;
             case 'down':
             _this.body.unshift({row: row+1, col: col});
             break;
        }

        var head = _this.body[0];
        var res = m1.getCell(head.row, head.col);
        var index = m1.getCellInd(head.row, head.col);

        switch (res){
            case 'fruit':
               // _this.grow(1);
                message.win();
                _this.fruits++;
                fruits.eaten(index,'fruit');
                if (_this.fruits== 4){
                    game.level(2);
                }
                fruits.create(1,'fruit');
                break;
            case 'bomb':
                fruits.eaten(index,'bomb');
                message.game_over(_this.fruits);
                game.over();
                //alert('Game over !');
                break;
            case 'on':
                message.game_over(_this.fruits);
                game.over();
                //alert('Game over !');
                break;
            default:
                _this.remove(_this.body);
                _this.body.pop();
                break;
        }
        _this.draw(_this.body);
    }
}
