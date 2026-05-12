<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

require_once("../conexion/config.php");

$data = json_decode(file_get_contents("php://input"), true);

$dni = trim($data['dni'] ?? '');
$password = trim($data['password'] ?? '');

if(empty($dni) || empty($password)){

    echo json_encode([
        "success" => false,
        "mensaje" => "Campos vacíos"
    ]);

    exit;
}

try {

    # Buscar primero en administrador
    $sql = "SELECT * FROM administrador WHERE dni = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([$dni]);

    $usuario = $stmt->fetch();

    $rol = "Administrador";

    # Si no existe, buscar en médicos
    if(!$usuario){

        $sql = "SELECT * FROM medico WHERE dni = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([$dni]);

        $usuario = $stmt->fetch();

        $rol = "Doctor";
    }

    # Si no existe, buscar admisión
    if(!$usuario){

        $sql = "SELECT * FROM personal_admision WHERE dni = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([$dni]);

        $usuario = $stmt->fetch();

        $rol = "Admision";
    }

    if(!$usuario){

        echo json_encode([
            "success" => false,
            "mensaje" => "Usuario no encontrado"
        ]);

        exit;
    }

    # Verificar contraseña hasheada
    if(!password_verify($password, $usuario['clave_hash'])){

        echo json_encode([
            "success" => false,
            "mensaje" => "Contraseña incorrecta"
        ]);

        exit;
    }

    # Crear sesión
    $_SESSION['usuario'] = $usuario['dni'];
    $_SESSION['rol'] = $rol;

    echo json_encode([
        "success" => true,
        "mensaje" => "Login exitoso",
        "rol" => $rol
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}