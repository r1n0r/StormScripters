<?php
include 'includes/db.php';
include 'includes/auth.php';
require_login();

$sender_id = $_SESSION['user_id'];
$receiver_id = (int)$_POST['receiver_id'];
$message_text = $mysqli->real_escape_string($_POST['message_text']);

$mysqli->query("INSERT INTO messages (sender_id, receiver_id, message_text) VALUES ($sender_id, $receiver_id, '$message_text')");
header("Location: chat.php?with=$receiver_id");
exit;
?> 