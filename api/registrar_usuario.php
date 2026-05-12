<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("../conexion/config.php");

$data = json_decode(file_get_contents("php://input"), true);

if(!$data){

    echo json_encode([
        "success" => false,
        "mensaje" => "No llegaron datos"
    ]);

    exit;
}

$rol = $data['rol'] ?? '';
$dni = trim($data['dni'] ?? '');
$password = trim($data['password'] ?? '');

if(empty($dni) || empty($password)){

    echo json_encode([
        "success" => false,
        "mensaje" => "Campos vacíos"
    ]);

    exit;
}

# Validar DNI
if(!preg_match('/^[0-9]{8}$/', $dni)){

    echo json_encode([
        "success" => false,
        "mensaje" => "DNI inválido"
    ]);

    exit;
}

# Contraseña segura
if(
    !preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $password)
){

    echo json_encode([
        "success" => false,
        "mensaje" => "La contraseña debe tener mayúscula, minúscula, número y símbolo"
    ]);

    exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);

try {

    if($rol == "Doctor"){

        $sql = "INSERT INTO medico
        (dni, nombre, apellido, especialidad, usuario, clave_hash)
        VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $conexion->prepare($sql);

        $stmt->execute([
            $dni,
            'Doctor',
            'Sistema',
            'General',
            $dni,
            $hash
        ]);

    } elseif($rol == "Admision") {

        $sql = "INSERT INTO personal_admision
        (dni, nombre, apellido, usuario, clave_hash)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $conexion->prepare($sql);

        $stmt->execute([
            $dni,
            'Admision',
            'Sistema',
            $dni,
            $hash
        ]);

    } else {

        $sql = "INSERT INTO administrador
        (dni, nombre, apellido, usuario, clave_hash)
        VALUES (?, ?, ?, ?, ?)";

        $stmt = $conexion->prepare($sql);

        $stmt->execute([
            $dni,
            'Admin',
            'Sistema',
            $dni,
            $hash
        ]);
    }

    echo json_encode([
        "success" => true,
        "mensaje" => "Usuario registrado correctamente"
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}