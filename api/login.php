<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../conexion/config.php");

$data = json_decode(file_get_contents("php://input"), true);

$dni = trim($data['dni'] ?? '');
$password = trim($data['password'] ?? '');

if(empty($dni) || empty($password)){

    echo json_encode([
        "success" => false,
        "mensaje" => "Complete todos los campos"
    ]);
    exit;
}

try {

    // ADMIN
    $sql = "SELECT * FROM administrador WHERE dni = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([$dni]);

    $usuario = $stmt->fetch();

    if($usuario && password_verify($password, $usuario['clave_hash'])){

        echo json_encode([
            "success" => true,
            "rol" => "Admin"
        ]);
        exit;
    }

    // DOCTOR
    $sql = "SELECT * FROM medico WHERE dni = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([$dni]);

    $usuario = $stmt->fetch();

    if($usuario && password_verify($password, $usuario['clave_hash'])){

        echo json_encode([
            "success" => true,
            "rol" => "Doctor"
        ]);
        exit;
    }

    // ADMISION
    $sql = "SELECT * FROM personal_admision WHERE dni = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([$dni]);

    $usuario = $stmt->fetch();

    if($usuario && password_verify($password, $usuario['clave_hash'])){

        echo json_encode([
            "success" => true,
            "rol" => "Admision"
        ]);
        exit;
    }

    echo json_encode([
        "success" => false,
        "mensaje" => "Credenciales incorrectas"
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "mensaje" => "Error del servidor"
    ]);
}