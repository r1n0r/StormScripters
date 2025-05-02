<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/Job.php';

$database = new Database();
$db = $database->getConnection();

$job = new Job($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->title) &&
    !empty($data->description) &&
    !empty($data->company) &&
    !empty($data->location) &&
    !empty($data->type) &&
    !empty($data->posted_by)
) {
    $job->title = $data->title;
    $job->description = $data->description;
    $job->company = $data->company;
    $job->location = $data->location;
    $job->type = $data->type;
    $job->salary = $data->salary ?? '';
    $job->requirements = $data->requirements ?? '';
    $job->skills = $data->skills ?? '';
    $job->posted_by = $data->posted_by;
    $job->status = 'active';

    if($job->create()) {
        http_response_code(201);
        echo json_encode(array("message" => "Job was created successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create job."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create job. Data is incomplete."));
}
?> 