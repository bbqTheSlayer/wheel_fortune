<?php

$Data = array(
    ['color' => "#f82", 'label' => "Акция 1", 'id' => '1'],
    ['color' => "#0bf", 'label' => "Акция 2", 'id' => '2'],
    ['color' => "#fb0", 'label' => "Акция 3", 'id' => '3'],
    ['color' => "#0fb", 'label' => "Акция 4", 'id' => '4'],
    ['color' => "#b0f", 'label' => "Акция 5", 'id' => '5'],
    ['color' => "#f0b", 'label' => "Акция 6", 'id' => '6'],
    ['color' => "#bf0", 'label' => "Акция 7", 'id' => '7']
);

header('Content-type: application/json');
echo json_encode($Data);

$Result = $Data;

return $Result;