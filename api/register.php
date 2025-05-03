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

if (!$data || !isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$name = $mysqli->real_escape_string($data['name']);
$email = $mysqli->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$result = $mysqli->query("SELECT id FROM users WHERE email='$email'");
if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered.']);
    exit;
}

$mysqli->query("INSERT INTO users (email, password, full_name) VALUES ('$email', '$password', '$name')");
echo json_encode(['success' => true, 'message' => 'Registration successful!']);
?> 