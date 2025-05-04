<?php
include '../includes/db.php';

// Test database connection
echo "Testing database connection...\n";
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
echo "Database connection successful\n\n";

// Test messages table
echo "Checking messages table...\n";
$result = $mysqli->query("SHOW TABLES LIKE 'messages'");
if ($result->num_rows == 0) {
    echo "Messages table does not exist. Creating it...\n";
    $createTable = "CREATE TABLE messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    if ($mysqli->query($createTable)) {
        echo "Messages table created successfully\n";
    } else {
        echo "Error creating messages table: " . $mysqli->error . "\n";
    }
} else {
    echo "Messages table exists\n";
}

// Test inserting a message
echo "\nTesting message insertion...\n";
$testMessage = "Test message " . date('Y-m-d H:i:s');
$stmt = $mysqli->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)");
$senderId = 1;
$receiverId = 2;
$stmt->bind_param("iis", $senderId, $receiverId, $testMessage);
if ($stmt->execute()) {
    echo "Message inserted successfully\n";
    $messageId = $stmt->insert_id;
    echo "Message ID: " . $messageId . "\n";
} else {
    echo "Error inserting message: " . $stmt->error . "\n";
}

// Test retrieving messages
echo "\nTesting message retrieval...\n";
$stmt = $mysqli->prepare("SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ?");
$stmt->bind_param("ii", $senderId, $receiverId);
$stmt->execute();
$result = $stmt->get_result();
echo "Found " . $result->num_rows . " messages\n";
while ($row = $result->fetch_assoc()) {
    echo "Message: " . $row['message'] . " (ID: " . $row['id'] . ")\n";
}

// Test users table
echo "\nChecking users table...\n";
$result = $mysqli->query("SHOW TABLES LIKE 'users'");
if ($result->num_rows == 0) {
    echo "Users table does not exist. Please create it first.\n";
} else {
    echo "Users table exists\n";
    $result = $mysqli->query("SELECT * FROM users LIMIT 5");
    echo "First 5 users:\n";
    while ($row = $result->fetch_assoc()) {
        echo "User ID: " . $row['id'] . ", Name: " . $row['full_name'] . "\n";
    }
}
?> 