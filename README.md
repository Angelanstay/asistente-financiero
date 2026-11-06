 # Asistente Financiero

Prototipo de un asistente conversacional basado en inteligencia artificial para la orientación y educación financiera en un entorno bancario digital simulado.

## 1. Descripción del proyecto

El Asistente Financiero es un prototipo web desarrollado como proyecto académico. Su objetivo es facilitar la comprensión de conceptos financieros básicos mediante conversaciones en lenguaje natural.

El asistente permite realizar preguntas sobre tasas de interés, créditos, préstamos, cuotas e intereses. Utiliza inteligencia artificial para identificar qué necesita el usuario y generar explicaciones adaptadas a cada consulta.

**Importante:** es una herramienta educativa y demostrativa. No realiza operaciones bancarias reales ni se conecta con cuentas o entidades financieras.

## 2. Funcionalidades

- Explicación de conceptos financieros básicos.
- Comparación entre conceptos.
- Ejemplos sencillos y situaciones cotidianas.
- Reformulación de explicaciones cuando el usuario no comprende.
- Identificación de preguntas que están fuera del alcance del asistente.
- Cálculos básicos de intereses.
- Conservación del contexto de la conversación.

## 3. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| HTML | Estructura de la página web. |
| CSS | Diseño visual de la plataforma. |
| JavaScript | Interacción del chat y envío de mensajes. |
| PHP | Procesamiento de consultas. |
| Gemini API | Reconocimiento de intenciones y generación de respuestas. |
| cURL | Comunicación con Gemini desde PHP. |
| JSON | Intercambio de información entre los componentes. |
| XAMPP | Entorno de desarrollo local. |
| Apache | Servidor web. |
| Git y GitHub | Control de versiones y almacenamiento del código. |

### Librerías y dependencias

El proyecto utiliza JavaScript nativo y funciones propias de PHP. No requiere instalar paquetes mediante Composer ni librerías externas de JavaScript.

Para la comunicación con Gemini se utiliza la extensión cURL de PHP.

## 4. Requisitos para ejecutar el proyecto

- Windows.
- XAMPP con PHP 8.1 o superior.
- Extensión cURL de PHP habilitada.
- Conexión a internet.
- API Key de Google AI Studio.

## 5. Instalación y ejecución con XAMPP

### Paso 1. Descargar el proyecto

Ingresar al repositorio:

https://github.com/Angelanstay/asistente-financiero

Hacer clic en **Code** y seleccionar **Download ZIP**.

Descomprimir el archivo descargado.

### Paso 2. Copiar los archivos

Copiar la carpeta del proyecto dentro de la carpeta `htdocs` de XAMPP.

La ubicación debe quedar así:

`C:\xampp\htdocs\asistente-financiero`

### Paso 3. Iniciar Apache

Abrir el panel de control de XAMPP e iniciar el servicio Apache.

No es necesario iniciar MySQL, ya que el proyecto no utiliza una base de datos.

### Paso 4. Configurar la API Key

El asistente necesita una clave de acceso para comunicarse con Gemini.

1. Ingresar a https://aistudio.google.com/
2. Crear una API Key.
3. En Windows, abrir la configuración de variables de entorno.
4. Crear una variable llamada `GEMINI_API_KEY`.
5. Asignarle el valor de la clave generada.

La clave debe mantenerse privada y no debe publicarse en GitHub ni escribirse directamente en los archivos del proyecto.

Después de configurar la variable, cerrar y volver a abrir XAMPP para que Apache pueda reconocerla.

### Paso 5. Comprobar la conexión con Gemini

Abrir en el navegador:

`http://localhost/asistente-financiero/backend/prueba-gemini.php`

Si la configuración es correcta, aparecerá un mensaje indicando que la conexión con Gemini funciona y se mostrará una respuesta de prueba.

### Paso 6. Abrir el asistente

Ingresar a la siguiente dirección:

`http://localhost/asistente-financiero/`

Se mostrará el entorno bancario simulado. Desde allí se puede abrir el chat y comenzar a realizar preguntas.

## 6. Funcionamiento del asistente

El procesamiento de las consultas se realiza en dos etapas:

**Primera etapa: reconocimiento de intención.**

Gemini analiza el mensaje y el historial de la conversación para identificar qué necesita el usuario y sobre qué concepto está preguntando.

**Segunda etapa: generación de respuesta.**

El sistema utiliza la clasificación obtenida para generar una respuesta conversacional adaptada a la consulta.

Las intenciones contempladas son:

| Intención | Descripción |
|---|---|
| Definición | Explica el significado de un concepto. |
| Comparación | Identifica diferencias entre conceptos. |
| Ejemplo | Presenta una situación práctica. |
| Reformulación | Explica nuevamente un concepto de otra manera. |
| Fuera de alcance | Identifica preguntas que no corresponden a la finalidad del asistente. |

## 7. Estructura del proyecto

```text
asistente-financiero/
│
├── backend/
│   ├── chat.php
│   └── prueba-gemini.php
│
├── index.html
├── script.js
├── estilo.css
├── Dockerfile
├── .gitignore
└── README.md
```

### Descripción de los archivos

- **index.html:** contiene la estructura de la interfaz web.
- **estilo.css:** define los estilos visuales de la plataforma.
- **script.js:** controla la interacción del chat y el envío de consultas.
- **backend/chat.php:** recibe los mensajes, identifica las intenciones y solicita las respuestas a Gemini.
- **backend/prueba-gemini.php:** permite comprobar la conexión con Gemini.
- **Dockerfile:** contiene la configuración para el despliegue del proyecto.
- **.gitignore:** establece qué archivos deben excluirse del repositorio.

## 8. Modelo de inteligencia artificial

El proyecto utiliza el modelo `gemini-3.5-flash-lite` mediante la API de Gemini.

La comunicación se realiza desde PHP utilizando cURL. La clave de acceso se obtiene mediante la variable de entorno `GEMINI_API_KEY`, evitando exponerla en el código visible para los usuarios.

## 9. Consideraciones y limitaciones

- El asistente está orientado a conceptos financieros básicos.
- Las respuestas son generadas mediante inteligencia artificial y pueden presentar limitaciones.
- No proporciona asesoramiento financiero personalizado.
- No realiza transferencias, pagos ni operaciones bancarias.
- No consulta saldos ni accede a cuentas reales.
- Requiere conexión a internet y una API Key válida para generar respuestas.

## 10. Acceso al proyecto

**Repositorio de GitHub:**  
https://github.com/Angelanstay/asistente-financiero

**Prototipo funcional:**  
https://asistente-financiero-85aa.onrender.com

## 11. Autoría

Proyecto desarrollado como trabajo de grado del programa de Ingeniería de Sistemas de la Corporación Universitaria de Ciencia y Desarrollo – UNICIENCIA.
