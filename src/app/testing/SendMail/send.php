<?php
// Allow CORS for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Read input data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['message'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit;
}

// Set up email details
$to = "your-email@example.com";  // Change this to your email
$subject = "New Enquiry from " . $data['name'];
$headers = "From: " . $data['email'] . "\r\n" .
           "Reply-To: " . $data['email'] . "\r\n" .
           "Content-Type: text/html; charset=UTF-8";

// Email message
$message = "<h2>Enquiry Details:</h2>";
$message .= "<p><strong>Name:</strong> " . $data['name'] . "</p>";
$message .= "<p><strong>Email:</strong> " . $data['email'] . "</p>";
$message .= "<p><strong>Message:</strong> " . $data['message'] . "</p>";

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send email"]);
}
?>
