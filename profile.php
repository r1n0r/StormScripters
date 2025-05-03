<?php
include 'includes/db.php';
include 'includes/auth.php';
require_login();

$user_id = $_SESSION['user_id'];
$res = $mysqli->query("SELECT full_name, email FROM users WHERE id=$user_id");
$user = $res->fetch_assoc();

$res2 = $mysqli->query("SELECT matched_category FROM user_quiz_results WHERE user_id=$user_id ORDER BY completed_at DESC LIMIT 1");
$row2 = $res2->fetch_assoc();
$category = $row2['matched_category'] ?? null;

$programs = [];
if ($category) {
    $sql = "SELECT p.name as program, p.description, u.name as university, u.location, u.website
            FROM programs p
            JOIN universities u ON p.university_id = u.id
            WHERE p.field = '$category'";
    $res3 = $mysqli->query($sql);
    while ($row3 = $res3->fetch_assoc()) {
        $programs[] = $row3;
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Profile</title></head>
<body>
    <h2>Profile</h2>
    <p>Name: <?= htmlspecialchars($user['full_name']) ?></p>
    <p>Email: <?= htmlspecialchars($user['email']) ?></p>
    <h3>Quiz Result</h3>
    <?php if ($category): ?>
        <p>Matched Category: <b><?= htmlspecialchars($category) ?></b></p>
        <h4>Recommended Programs:</h4>
        <ul>
        <?php foreach ($programs as $p): ?>
            <li>
                <b><?= htmlspecialchars($p['program']) ?></b> at <?= htmlspecialchars($p['university']) ?> (<?= htmlspecialchars($p['location']) ?>)
                <br><?= htmlspecialchars($p['description']) ?>
                <br><a href="<?= htmlspecialchars($p['website']) ?>" target="_blank">Visit University</a>
            </li>
        <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>No quiz result yet. <a href="quiz.php">Take the quiz</a></p>
    <?php endif; ?>
    <a href="chat.php">Go to Chat</a> | <a href="logout.php">Logout</a>
</body>
</html> 