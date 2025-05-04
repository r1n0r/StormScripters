<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

include '../includes/db.php';

// Create messages table if it doesn't exist
$createTable = "CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$mysqli->query($createTable);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'send':
                if (isset($data['sender_id'], $data['receiver_id'], $data['message'])) {
                    $stmt = $mysqli->prepare("INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)");
                    if (!$stmt) {
                        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement: ' . $mysqli->error]);
                        exit;
                    }
                    $stmt->bind_param("iis", $data['sender_id'], $data['receiver_id'], $data['message']);
                    if ($stmt->execute()) {
                        $messageId = $stmt->insert_id;
                        $result = $mysqli->query("SELECT * FROM messages WHERE id = $messageId");
                        $newMessage = $result->fetch_assoc();
                        echo json_encode(['success' => true, 'message' => 'Message sent successfully', 'newMessage' => $newMessage]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to send message: ' . $stmt->error]);
                    }
                    $stmt->close();
                } else {
                    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                }
                break;
            case 'get':
                if (isset($data['user1_id'], $data['user2_id'])) {
                    $stmt = $mysqli->prepare("
                        SELECT m.*, u1.full_name as sender_name, u2.full_name as receiver_name 
                        FROM messages m 
                        LEFT JOIN users u1 ON m.sender_id = u1.id 
                        LEFT JOIN users u2 ON m.receiver_id = u2.id 
                        WHERE (sender_id = ? AND receiver_id = ?) 
                        OR (sender_id = ? AND receiver_id = ?) 
                        ORDER BY sent_at ASC
                    ");
                    $stmt->bind_param("iiii", $data['user1_id'], $data['user2_id'], $data['user2_id'], $data['user1_id']);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $messages = [];
                    while ($row = $result->fetch_assoc()) {
                        $messages[] = $row;
                    }
                    echo json_encode(['success' => true, 'messages' => $messages]);
                }
                break;
            case 'get_users':
                if (!isset($data['current_user_id'])) {
                    echo json_encode(['success' => false, 'message' => 'Current user ID is required']);
                    exit;
                }
                $stmt = $mysqli->prepare("SELECT id, full_name FROM users WHERE id != ?");
                $stmt->bind_param("i", $data['current_user_id']);
                $stmt->execute();
                $result = $stmt->get_result();
                $users = [];
                while ($row = $result->fetch_assoc()) {
                    $users[] = $row;
                }
                echo json_encode(['success' => true, 'users' => $users]);
                break;
        }
    }
}
?> 