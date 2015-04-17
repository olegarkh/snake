//
//Класс матрицы
//
function Matrix(containerId, rows, cols)
{
    this.containerId = containerId;
    this.rows = rows; //число строк
    this.cols = cols; //число столбцов


    var _this = this;

	//создание сетки
	this.create = function()
	{
        var n = this.rows * this.cols;
        for(var i =0; i < n; i++) {
            $('#matrix').append('<div class="cell"></div>'); // Добавить ячейки матрицы
        }
	}
	
	//Получить значение ячейки - её индекс( номер в сетке, начинается с 0 до 399)
    this.getCellInd = function(row, col)
    {
        return (row - 1) * this.cols + col - 1;
    }

	this.getCell = function(row, col)
    {
        var ind = (row - 1) * this.cols + col - 1;

        var $matrix = $('#matrix');
		//var $cell =  $matrix.children().eq(ind);
		var $cell =  $matrix.find('.cell').eq(ind);

        if ($cell.hasClass('fruit')){return 'fruit';}
        if ($cell.hasClass('bomb')){return 'bomb';}
        if ($cell.hasClass('on')){return 'on';}


        return false;
	}
    //Установить значение ячейки
    //функция принимает координаты ячейки
    //если val = true закрашивает сетку красным
    //иначе убирает закраску
	this.setCell = function(row, col, val)
	{
		var ind = (row - 1) * this.cols + col - 1;

        var $matrix = $('#matrix');
        var $cell = $matrix.find('.cell').eq(ind);
        $cell.toggleClass('on',val);

	}
}
		
