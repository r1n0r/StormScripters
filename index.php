<?php include 'includes/auth.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Future Finder</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <h1>Welcome to Future Finder</h1>
    <p>Helping you discover the right academic path!</p>
    <?php if (is_logged_in()): ?>
        <a href="quiz.php">Start Quiz</a> | 
        <a href="profile.php">Profile</a> | 
        <a href="logout.php">Logout</a>
    <?php else: ?>
        <a href="quiz.php">Start Quiz</a> | 
        <a href="login.php">Login</a> | 
        <a href="register.php">Register</a>
    <?php endif; ?>
</body>
</html> 