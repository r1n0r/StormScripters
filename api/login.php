<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include '../includes/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$email = $mysqli->real_escape_string($data['email']);
$result = $mysqli->query("SELECT id, password, full_name FROM users WHERE email='$email'");
if ($row = $result->fetch_assoc()) {
    if (password_verify($data['password'], $row['password'])) {
        echo json_encode([
            'success' => true, 
            'message' => 'Login successful!', 
            'full_name' => $row['full_name'],
            'userId' => $row['id']
        ]);
        exit;
    }
}
echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
?> 