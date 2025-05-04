<?php
include '../includes/db.php';

// Check if messages table exists
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

// Check if users table exists
$result = $mysqli->query("SHOW TABLES LIKE 'users'");
if ($result->num_rows == 0) {
    echo "Users table does not exist. Please create it first.\n";
} else {
    echo "Users table exists\n";
    
    // Check users table structure
    $result = $mysqli->query("DESCRIBE users");
    echo "\nUsers table structure:\n";
    while ($row = $result->fetch_assoc()) {
        echo $row['Field'] . " - " . $row['Type'] . "\n";
    }
}

// Check if there are any users
$result = $mysqli->query("SELECT COUNT(*) as count FROM users");
$row = $result->fetch_assoc();
echo "\nNumber of users in database: " . $row['count'] . "\n";

// Check if there are any messages
$result = $mysqli->query("SELECT COUNT(*) as count FROM messages");
$row = $result->fetch_assoc();
echo "Number of messages in database: " . $row['count'] . "\n";
?> 