//
// Точка входа
//
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var KEY_PLUS = 107;   //Добавление фруктов в матрицу
var KEY_SLASH = 111;  //Скрыть/показать всплывающие подсказки
var KEY_PAUSE = 19;   //Пауза в игре
var KEY_ENTER = 13;   //Прождолжение/начало  игры
var KEY_ESC = 27;     //Закончить игру


$(document).ready(function() {
    game = new Game();
    game.start();
});
