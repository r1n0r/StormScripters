<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/Job.php';

$database = new Database();
$db = $database->getConnection();

$job = new Job($db);

$stmt = $job->read();
$num = $stmt->rowCount();

if($num > 0) {
    $jobs_arr = array();
    $jobs_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $job_item = array(
            "id" => $id,
            "title" => $title,
            "description" => $description,
            "company" => $company,
            "location" => $location,
            "type" => $type,
            "salary" => $salary,
            "requirements" => $requirements,
            "skills" => $skills,
            "posted_by" => $posted_by,
            "created_at" => $created_at
        );

        array_push($jobs_arr["records"], $job_item);
    }

    http_response_code(200);
    echo json_encode($jobs_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No jobs found."));
}
?> 