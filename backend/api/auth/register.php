<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->role)
) {
    $user->name = $data->name;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->role = $data->role;
    $user->school = $data->school ?? '';
    $user->grade = $data->grade ?? '';
    $user->skills = $data->skills ?? '';
    $user->interests = $data->interests ?? '';

    if($user->register()) {
        http_response_code(201);
        echo json_encode(array("message" => "User was registered successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to register user."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register user. Data is incomplete."));
}
?> 