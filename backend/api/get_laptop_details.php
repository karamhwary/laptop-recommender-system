<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json;");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'error']);
    exit;
}

$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM laptops WHERE id = ?");
$stmt->execute([$id]);
$laptop = $stmt->fetch();

// http://localhost/laptop_recommender/backend/api/get_laptop_details.php?id=3
//                                           └─────────────────┬─────────────────┘
//                                                             │
//                                                     $_GET['id'] = 3

if (!$laptop) {
    http_response_code(404);
    echo json_encode(['error' => 'Laptop not found']);
    exit;
}

echo json_encode($laptop);
?>