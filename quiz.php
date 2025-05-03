<?php
include 'includes/db.php';
include 'includes/auth.php';

$questions = [];
$res = $mysqli->query("SELECT qq.id, qq.question_text, qa.id as answer_id, qa.answer_text, qa.category
    FROM quiz_questions qq
    JOIN quiz_answers qa ON qa.question_id = qq.id
    ORDER BY qq.id, qa.id");
while ($row = $res->fetch_assoc()) {
    $questions[$row['id']]['text'] = $row['question_text'];
    $questions[$row['id']]['answers'][] = [
        'id' => $row['answer_id'],
        'text' => $row['answer_text'],
        'category' => $row['category']
    ];
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Quiz</title>
    <script>
    function calculateCategory() {
        let categories = {};
        document.querySelectorAll('input[type=radio]:checked').forEach(radio => {
            let cat = radio.dataset.category;
            categories[cat] = (categories[cat] || 0) + 1;
        });
        let maxCat = null, maxVal = 0;
        for (let cat in categories) {
            if (categories[cat] > maxVal) {
                maxVal = categories[cat];
                maxCat = cat;
            }
        }
        document.getElementById('matched_category').value = maxCat;
    }
    </script>
</head>
<body>
    <h2>Quiz</h2>
    <form method="post" action="submit_quiz.php" onsubmit="calculateCategory()">
        <?php foreach ($questions as $qid => $q): ?>
            <div>
                <p><?= htmlspecialchars($q['text']) ?></p>
                <?php foreach ($q['answers'] as $a): ?>
                    <label>
                        <input type="radio" name="q<?= $qid ?>" value="<?= $a['id'] ?>" data-category="<?= $a['category'] ?>" required>
                        <?= htmlspecialchars($a['text']) ?>
                    </label><br>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
        <input type="hidden" name="matched_category" id="matched_category">
        <button type="submit">Submit Quiz</button>
    </form>
</body>
</html> 