<?php
class Job {
    private $conn;
    private $table_name = "jobs";

    public $id;
    public $title;
    public $description;
    public $company;
    public $location;
    public $type;
    public $salary;
    public $requirements;
    public $skills;
    public $posted_by;
    public $created_at;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                (title, description, company, location, type, salary, requirements, skills, posted_by, status)
                VALUES
                (:title, :description, :company, :location, :type, :salary, :requirements, :skills, :posted_by, :status)";

        $stmt = $this->conn->prepare($query);

        // Sanitize input
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->company = htmlspecialchars(strip_tags($this->company));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->salary = htmlspecialchars(strip_tags($this->salary));
        $this->requirements = htmlspecialchars(strip_tags($this->requirements));
        $this->skills = htmlspecialchars(strip_tags($this->skills));
        $this->posted_by = htmlspecialchars(strip_tags($this->posted_by));
        $this->status = htmlspecialchars(strip_tags($this->status));

        // Bind values
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":company", $this->company);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":salary", $this->salary);
        $stmt->bindParam(":requirements", $this->requirements);
        $stmt->bindParam(":skills", $this->skills);
        $stmt->bindParam(":posted_by", $this->posted_by);
        $stmt->bindParam(":status", $this->status);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE status = 'active' ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->title = $row['title'];
            $this->description = $row['description'];
            $this->company = $row['company'];
            $this->location = $row['location'];
            $this->type = $row['type'];
            $this->salary = $row['salary'];
            $this->requirements = $row['requirements'];
            $this->skills = $row['skills'];
            $this->posted_by = $row['posted_by'];
            $this->created_at = $row['created_at'];
            $this->status = $row['status'];
            return true;
        }
        return false;
    }
}
?> 