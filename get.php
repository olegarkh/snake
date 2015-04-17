<?php
//$results = file('results.txt');

$strings = file('results.txt');
$messages = array();

foreach($strings as $key => $result)
{
    $string = explode(':', $result);

    $arr['name'] = $string[0];
    $arr['score'] = $string[1]."<br>";
    $messages[] = $arr;

}

echo json_encode($messages);

