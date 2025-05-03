<?php
include 'includes/db.php';
include 'includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $mysqli->real_escape_string($_POST['email']);
    $result = $mysqli->query("SELECT id, password FROM users WHERE email='$email'");
    if ($row = $result->fetch_assoc()) {
        if (password_verify($_POST['password'], $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            header("Location: quiz.php");
            exit;
        }
    }
    $error = "Invalid email or password.";
}
?>
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
    <h2>Login</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="post">
        Email: <input name="email" type="email" required><br>
        Password: <input name="password" type="password" required><br>
        <button type="submit">Login</button>
    </form>
    <a href="register.php">No account? Register</a>
</body>
</html> 