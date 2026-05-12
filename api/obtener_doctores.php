<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("../conexion/config.php");

try {

    $sql = "
        SELECT idMedico, nombre, apellido, especialidad
        FROM medico
        ORDER BY nombre ASC
    ";

    $stmt = $conexion->prepare($sql);

    $stmt->execute();

    $doctores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "doctores" => $doctores
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al obtener doctores"
    ]);
}