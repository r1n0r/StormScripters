<?php
include 'includes/db.php';
include 'includes/auth.php';
require_login();

$user_id = $_SESSION['user_id'];
$quiz_id = 1; // If you have multiple quizzes, get the correct ID
$matched_category = $mysqli->real_escape_string($_POST['matched_category']);

$mysqli->query("INSERT INTO user_quiz_results (user_id, quiz_id, matched_category) VALUES ($user_id, $quiz_id, '$matched_category')");
header("Location: result.php");
exit;
?> 