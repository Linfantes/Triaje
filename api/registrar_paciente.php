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
$nombre = trim($data['nombre'] ?? '');
$apellido = trim($data['apellido'] ?? '');
$fechaNacimiento = trim($data['fechaNacimiento'] ?? '');
$doctor = trim($data['doctor'] ?? '');
$fechaCita = trim($data['fechaCita'] ?? '');
$horaCita = trim($data['horaCita'] ?? '');

if(
    empty($dni) ||
    empty($nombre) ||
    empty($apellido) ||
    empty($fechaNacimiento) ||
    empty($doctor) ||
    empty($fechaCita) ||
    empty($horaCita)
){

    echo json_encode([
        "success" => false,
        "mensaje" => "Complete todos los campos"
    ]);
    exit;
}

try {

    // Verificar DNI
    $verificar = $conexion->prepare(
        "SELECT * FROM paciente WHERE dni = ?"
    );

    $verificar->execute([$dni]);

    if($verificar->rowCount() > 0){

        echo json_encode([
            "success" => false,
            "mensaje" => "El paciente ya está registrado"
        ]);

        exit;
    }

    // Registrar paciente
    $sqlPaciente = "
        INSERT INTO paciente
        (dni, nombre, apellido, fecha_nacimiento)
        VALUES (?, ?, ?, ?)
    ";

    $stmtPaciente = $conexion->prepare($sqlPaciente);

    $stmtPaciente->execute([
        $dni,
        $nombre,
        $apellido,
        $fechaNacimiento
    ]);

    $idPaciente = $conexion->lastInsertId();

    // Registrar cita
    $sqlCita = "
        INSERT INTO cita
        (idPaciente, doctor, fecha_cita, hora_cita)
        VALUES (?, ?, ?, ?)
    ";

    $stmtCita = $conexion->prepare($sqlCita);

    $stmtCita->execute([
        $idPaciente,
        $doctor,
        $fechaCita,
        $horaCita
    ]);

    echo json_encode([
        "success" => true,
        "mensaje" => "Paciente registrado correctamente"
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "mensaje" => "Error del servidor"
    ]);
}