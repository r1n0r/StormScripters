<?php
include 'includes/db.php';
include 'includes/auth.php';
require_login();

$user_id = $_SESSION['user_id'];
$users = [];
$res = $mysqli->query("SELECT id, full_name FROM users WHERE id != $user_id");
while ($row = $res->fetch_assoc()) {
    $users[] = $row;
}

$messages = [];
if (isset($_GET['with'])) {
    $with_id = (int)$_GET['with'];
    $res2 = $mysqli->query("SELECT * FROM messages WHERE (sender_id=$user_id AND receiver_id=$with_id) OR (sender_id=$with_id AND receiver_id=$user_id) ORDER BY sent_at ASC");
    while ($row2 = $res2->fetch_assoc()) {
        $messages[] = $row2;
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Chat</title></head>
<body>
    <h2>Chat</h2>
    <h3>Other Students:</h3>
    <ul>
    <?php foreach ($users as $u): ?>
        <li><a href="chat.php?with=<?= $u['id'] ?>"><?= htmlspecialchars($u['full_name']) ?></a></li>
    <?php endforeach; ?>
    </ul>
    <?php if (isset($with_id)): ?>
        <h3>Chat with <?= htmlspecialchars($with_id) ?></h3>
        <div style="border:1px solid #ccc; padding:10px; height:200px; overflow-y:scroll;">
            <?php foreach ($messages as $m): ?>
                <div>
                    <b><?= $m['sender_id'] == $user_id ? "You" : "Them" ?>:</b>
                    <?= htmlspecialchars($m['message_text']) ?>
                    <small>(<?= $m['sent_at'] ?>)</small>
                </div>
            <?php endforeach; ?>
        </div>
        <form method="post" action="send_message.php">
            <input type="hidden" name="receiver_id" value="<?= $with_id ?>">
            <input name="message_text" required>
            <button type="submit">Send</button>
        </form>
    <?php endif; ?>
    <a href="profile.php">Back to Profile</a>
</body>
</html> 