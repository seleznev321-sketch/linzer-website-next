<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$BOT_TOKEN = '8379242736:AAFJ7ec_fJrz_lmbzwNGaxHr38SC8uX4G9A';
$CHAT_ID   = '5026462041';

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) $data = $_POST;

$form = isset($data['_form']) ? (string)$data['_form'] : 'Форма';
unset($data['_form']);

$labels = [
    'name'         => 'Имя',
    'phone'        => 'Телефон',
    'email'        => 'E-mail',
    'company'      => 'Компания',
    'object'       => 'Объект',
    'worktype'     => 'Тип работ',
    'area'         => 'Площадь',
    'message'      => 'Сообщение',
    'contact'      => 'Контакт',
    'nomenclature' => 'Номенклатура',
    'position'     => 'Должность',
    'experience'   => 'Опыт',
    'way'          => 'Способ',
    'recipient'    => 'Куда отправить',
];

$lines = ['📩 <b>' . htmlspecialchars($form, ENT_QUOTES, 'UTF-8') . '</b>'];
foreach ($data as $key => $val) {
    $val = (string)$val;
    if ($val === '') continue;
    $lbl = isset($labels[$key]) ? $labels[$key] : $key;
    $lines[] = '• ' . $lbl . ': ' . htmlspecialchars($val, ENT_QUOTES, 'UTF-8');
}
$text = implode("\n", $lines);

$ch = curl_init("https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage");
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode([
        'chat_id'    => $CHAT_ID,
        'text'       => $text,
        'parse_mode' => 'HTML',
    ]),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$res = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    echo json_encode(['ok' => false, 'error' => $err]);
} else {
    echo $res;
}
