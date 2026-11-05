<?php

$apiKey = getenv('GEMINI_API_KEY');

if (!$apiKey) {
    die("ERROR: No se encontró la variable GEMINI_API_KEY.");
}

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

$data = [
    "contents" => [
        [
            "parts" => [
                [
                    "text" => "Responde en español: ¿Qué es una tasa de interés? Explícalo de forma sencilla y con un ejemplo corto."
                ]
            ]
        ]
    ]
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "x-goog-api-key: " . $apiKey
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    die("ERROR DE CURL: " . curl_error($ch));
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

$result = json_decode($response, true);

if ($httpCode !== 200) {
    echo "<h2>Error al conectar con Gemini</h2>";
    echo "<pre>";
    print_r($result);
    echo "</pre>";
    exit;
}

$respuesta = $result['candidates'][0]['content']['parts'][0]['text'] ?? 'No se recibió respuesta.';

echo "<h1>Conexión con Gemini funcionando</h1>";
echo "<p>" . nl2br(htmlspecialchars($respuesta)) . "</p>";