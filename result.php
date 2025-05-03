<?php
include 'includes/db.php';
include 'includes/auth.php';
require_login();

$user_id = $_SESSION['user_id'];
$res = $mysqli->query("SELECT matched_category FROM user_quiz_results WHERE user_id=$user_id ORDER BY completed_at DESC LIMIT 1");
$row = $res->fetch_assoc();
$category = $row['matched_category'] ?? null;

$programs = [];
if ($category) {
    $sql = "SELECT p.name as program, p.description, u.name as university, u.location, u.website
            FROM programs p
            JOIN universities u ON p.university_id = u.id
            WHERE p.field = '$category'";
    $res2 = $mysqli->query($sql);
    while ($row2 = $res2->fetch_assoc()) {
        $programs[] = $row2;
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Quiz Result</title></head>
<body>
    <h2>Your Result</h2>
    <?php if ($category): ?>
        <p>You're a great fit for <b><?= htmlspecialchars($category) ?></b>!</p>
        <h3>Recommended Programs:</h3>
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
        <p>No result found. Please take the quiz.</p>
    <?php endif; ?>
    <a href="profile.php">Go to Profile</a>
</body>
</html> 