<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json;");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['answers']) || count($data['answers']) != 20) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input, expected 20 answers']);
    exit;
}

$answers = $data['answers'];

$stmt = $pdo->query("SELECT * FROM laptops");
$laptops = $stmt->fetchAll();

$stmt = $pdo->query("SELECT * FROM laptop_scores");
$scoresList = $stmt->fetchAll();

// laptop_id | question_id | option_index | score
// 1         | 1           | 1            | 10
// 1         | 1           | 2            | 2
// 1         | 1           | 3            | 8
// ...

$scores = [];
foreach ($scoresList as $s) {
    $scores[$s['laptop_id']][$s['question_id']][$s['option_index']] = $s['score'];
}
//before
// $scoresList[0]['laptop_id'] = 1
// $scoresList[0]['question_id'] = 1
// $scoresList[0]['option_index'] = 1
// $scoresList[0]['score'] = 10

//after
// $scores[1][1][1] = 10
// $scores[1][1][2] = 2
// $scores[1][1][3] = 8
// ...

$results = [];
foreach ($laptops as $laptop) {
    $total = 0;
    $laptopId = $laptop['id'];
    
    for ($i = 0; $i < 20; $i++) {
        $questionId = $i + 1;
        $selectedOption = $answers[$i];
        
        if (isset($scores[$laptopId][$questionId][$selectedOption])) {
            $total += $scores[$laptopId][$questionId][$selectedOption];
        }
    }
    
    $results[] = [
        'laptop' => $laptop,
        'score' => $total
    ];
//     [
//         'laptop' => ['id' => 1, 'name' => 'Dell XPS 15', ...],
//         'score' => 175
//     ],
//     [
//         'laptop' => ['id' => 2, 'name' => 'ASUS ROG Zephyrus G14', ...],
//         'score' => 162
//     ],
//     [
//         'laptop' => ['id' => 3, 'name' => 'MacBook Pro 14', ...],
//         'score' => 158
//     ],
//     [
//         'laptop' => ['id' => 4, 'name' => 'Lenovo Legion 5', ...],
//         'score' => 170
//     ],
//     [
//         'laptop' => ['id' => 5, 'name' => 'HP Spectre x360', ...],
//         'score' => 145
//     ]
// ]
}

usort($results, function($a, $b) {
    return $b['score'] - $a['score'];
});

if (count($results) > 0) {
    echo json_encode($results[0]['laptop']);
} else {
    echo json_encode(['error' => 'No laptop found']);
}
?>