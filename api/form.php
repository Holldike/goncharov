<?php
if (
    $_SERVER['REQUEST_METHOD'] === 'POST' &&
    isset($_POST['full_name']) && $_POST['full_name'] &&
    isset($_POST['email']) && $_POST['email'] &&
    isset($_POST['text']) && $_POST['text']
) {

    $user = 'vlad';
    $password = 'vlad';
    $dbName = 'floppyapp';
    $host = 'localhost';

    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);

    $stmt = $pdo->prepare("INSERT INTO contact_message (full_name, email, phone, text) VALUES (:full_name, :email, :phone, :text)");

    $fullName = $_POST['full_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $text = $_POST['text'];

    $stmt->bindParam(':full_name', $fullName);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':text', $text);

    $stmt->execute();

}