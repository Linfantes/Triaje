<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require_once("../conexion/config.php");

try {

    $sql = "
    SELECT 
        p.nombre,
        p.apellido,
        sv.temperatura,
        sv.pulso,
        sv.saturacion_oxigeno,
        c.nivel
    FROM paciente p

    INNER JOIN admision a
        ON p.id_paciente = a.id_paciente

    INNER JOIN ticket t
        ON a.id_admision = t.id_admision

    INNER JOIN triaje tr
        ON t.id_ticket = tr.id_ticket

    INNER JOIN signos_vitales sv
        ON tr.id_triaje = sv.id_triaje

    INNER JOIN clasificacion c
        ON tr.id_triaje = c.id_triaje

    WHERE t.estado != 'atendido'

    ORDER BY
    CASE
        WHEN c.nivel = 'ROJO' THEN 1
        WHEN c.nivel = 'AMARILLO' THEN 2
        ELSE 3
    END
    ";

    $stmt = $conexion->prepare($sql);

    $stmt->execute();

    $pacientes = $stmt->fetchAll();

    echo json_encode([
        "success" => true,
        "pacientes" => $pacientes
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}