<?php
include 'includes/db.php';
include 'includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $mysqli->real_escape_string($_POST['name']);
    $email = $mysqli->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $result = $mysqli->query("SELECT id FROM users WHERE email='$email'");
    if ($result->num_rows > 0) {
        $error = "Email already registered.";
    } else {
        $mysqli->query("INSERT INTO users (email, password, full_name) VALUES ('$email', '$password', '$name')");
        $_SESSION['user_id'] = $mysqli->insert_id;
        header("Location: quiz.php");
        exit;
    }
}
?>
<!DOCTYPE html>
<html>
<head><title>Register</title></head>
<body>
    <h2>Register</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="post">
        Name: <input name="name" required><br>
        Email: <input name="email" type="email" required><br>
        Password: <input name="password" type="password" required><br>
        <button type="submit">Register</button>
    </form>
    <a href="login.php">Already have an account? Login</a>
</body>
</html> 