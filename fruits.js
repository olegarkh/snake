function Fruits()
{
  var $cell = $('#matrix').children();
  this.number = 0;      //число съеденых фруктов
  var  _this = this;

  $('#info').html(_this.number);
  this.getRandomCell = function()
  {
      var col = parseInt(Math.random() * m1.cols);
      var row = parseInt(Math.random() * m1.rows);

      return  row * m1.cols + col;      //возвращает индекс сгенерированной случайной ячейки
  }

  this.create = function(value, name)
  {
      for (var i = 0; i < value; i++)
      {
          var ind = _this.getRandomCell();
          $cell.eq(ind).addClass(name);
      }
  }
    this.eaten = function(ind, name)
    {
        if (name != 'bomb') {
            _this.number++;
        }
        $cell.eq(ind).removeClass(name);
        $('#info').html(_this.number);
    }
}
