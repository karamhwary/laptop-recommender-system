<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; ");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';


if (isset($_GET['best_for'])) {
    $filter = $_GET['best_for'];
} else {
    $filter = '';
}
// http://localhost/laptop_recommender/backend/api/get_laptops.php?best_for=programming
//                                           └─────────────────┬─────────────────┘
//                                                             │
//                                                     $_GET['best_for'] = 'programming'

if ($filter && $filter !== 'all') {
    $stmt = $pdo->prepare("SELECT * FROM laptops WHERE FIND_IN_SET(:filter, best_for) > 0");
    $stmt->execute(['filter' => $filter]);
} else {
    $stmt = $pdo->query("SELECT * FROM laptops");
}

$laptops = $stmt->fetchAll();
echo json_encode($laptops);


?>