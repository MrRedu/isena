CREATE DATABASE `db_isena`;
USE `db_isena`;

DROP TABLE IF EXISTS `tbl_roles`;
CREATE TABLE `tbl_roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del rol de los usuarios',
  `nombre_rol` varchar(32) NOT NULL COMMENT 'Nombre del rol para los usuarios'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de roles';
INSERT INTO `tbl_roles` (id_rol, nombre_rol) VALUES (1, 'Administrador'), (2, 'Desarrollador'), (3, 'Médico'), (4, 'Visualizador');

DROP TABLE IF EXISTS `tbl_status_usuarios`;
CREATE TABLE `tbl_status_usuarios` (
  `id_status` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del estado de los usuarios',
  `nombre_status` varchar(32) NOT NULL COMMENT 'Nombre del estado de los usuarios'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de los estados de los usuarios';
INSERT INTO `tbl_status_usuarios` (`id_status`, `nombre_status`) VALUES (1, 'Habilitado'), (2, 'Deshabilitado');

DROP TABLE IF EXISTS `tbl_usuarios`;
CREATE TABLE `tbl_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del usuario/doctor',
  `nombres_usuario` varchar(64) NOT NULL COMMENT 'Nombres del usuario',
  `apellidos_usuario` varchar(64) NOT NULL COMMENT 'Apellidos del usuario',
  `correo_usuario` varchar(82) NOT NULL COMMENT 'Correo electrónico del usuario',
  `contrasena_usuario` varchar(255) NOT NULL COMMENT 'Contraseña encriptada del usuario',

  -- Llaves foráneas

  `id_rol_usuario` int(11) NOT NULL DEFAULT '4' COMMENT 'ID del rol del usuario',
  `id_status_usuario` int(11) NOT NULL DEFAULT '2' COMMENT 'ID del status del usuario',

  FOREIGN KEY (`id_rol_usuario`) REFERENCES `tbl_roles`(`id_rol`),
  FOREIGN KEY (`id_status_usuario`) REFERENCES `tbl_status_usuarios`(`id_status`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de usuarios';
INSERT INTO `tbl_usuarios` (`id_usuario`, `nombres_usuario`, `apellidos_usuario`, `correo_usuario`, `contrasena_usuario`, `id_rol_usuario`, `id_status_usuario`) VALUES (1, 'Administrador', 'Admin', 'admin@admin.com', '$2a$10$0FfP3KWKDIw508ZMm06SVewQX1qA6GqRHJ8VPr5MnNjbWPjPbvBwa', 1, 1),
(2, 'Desarrollador', 'Dev', 'dev@dev.com', '$2a$10$0FfP3KWKDIw508ZMm06SVewQX1qA6GqRHJ8VPr5MnNjbWPjPbvBwa', 2, 1),
(3, 'Médico', 'Doc', 'medico@medico.com', '$2a$10$0FfP3KWKDIw508ZMm06SVewQX1qA6GqRHJ8VPr5MnNjbWPjPbvBwa', 3, 1),
(4, 'Visualizador', 'Visual', 'visualizador@visualizador.com', '$2a$10$0FfP3KWKDIw508ZMm06SVewQX1qA6GqRHJ8VPr5MnNjbWPjPbvBwa', 4, 1);
-- Password: 12345678

DROP TABLE IF EXISTS `tbl_bitacora`;
CREATE TABLE `tbl_bitacora` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de la bitácora',
  `descripcion_bitacora` varchar(255) NOT NULL COMMENT 'Descripción del registro en la tabla',
  `fecha_registro` DATETIME NOT NULL COMMENT 'Fecha y hora en que se realizó la acción' 
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de bitácora/leyenda/logs';

DROP TABLE IF EXISTS `tbl_pacientes`;
CREATE TABLE `tbl_pacientes` (
  `cedula_paciente` int(11) NOT NULL PRIMARY KEY COMMENT 'Cédula de identidad del paciente',
  `nombres_paciente` varchar(64) NOT NULL COMMENT 'Nombres del paciente',
  `apellidos_paciente` varchar(64) NOT NULL COMMENT 'Apellidos del paciente',
  `telefono_paciente` varchar(11) NOT NULL COMMENT 'Teléfono del paciente',
  `fecha_nacimiento_paciente` DATE NOT NULL COMMENT 'Fecha de nacimiento del paciente',
  `correo_paciente` varchar(82) COMMENT 'Correo del paciente',
  `direccion_paciente` varchar(255) COMMENT 'Dirección del paciente'

  -- alturas 
  -- pesos --> "pesos": [{ "valor": 75, "fecha_peso": "2022-01-01"},{  "valor": 80,"fecha_peso": "2022-06-06"}, ...],
  -- temperaturas
  -- frecuencias respiratorias
  -- presiones arteriales
  -- frecuencias cardíacas
  -- medicamentos
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de pacientes';
INSERT INTO `tbl_pacientes` (`cedula_paciente`, `nombres_paciente`, `apellidos_paciente`, `telefono_paciente`, `fecha_nacimiento_paciente`, `correo_paciente`, `direccion_paciente`) VALUES (12345678, 'Luis Andrés', 'Cheng Romero', '04141234567', '2000-01-01', '7Dj5V@example.com', 'Calle 1 # 2-3'), (87654321, 'José Ramón', 'Fernandez Gutierrez', '04147654321', '1980-06-06', '7Dj5V@example.com', 'Calle 2 # 3-4');

DROP TABLE IF EXISTS `tbl_alturas`;
CREATE TABLE `tbl_alturas` (
  `id_altura` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de altura',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `altura` decimal(5,2) NOT NULL COMMENT 'Altura del paciente registrado',
  `fecha_registro` DATE NOT NULL  COMMENT 'Fecha del registro en la tabla de alturas',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de alturas por paciente';
INSERT INTO `tbl_alturas` (`id_altura`, `cedula_paciente`, `altura`, `fecha_registro`) VALUES (1, 12345678, '1.75', '2022-01-01'), (2, 12345678, '1.80', '2022-06-06'), (3, 12345678, '1.90', '2023-01-01'), (4, 12345678, '1.95', '2023-06-06'), (5, 87654321, '1.75', '2022-01-01'), (6, 87654321, '1.80', '2022-06-06'), (7, 87654321, '1.90', '2023-01-01'), (8, 87654321, '1.95', '2023-06-06');

DROP TABLE IF EXISTS `tbl_pesos`;
CREATE TABLE `tbl_pesos` (
  `id_peso` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de peso',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `peso` decimal(5,2) NOT NULL COMMENT 'Peso del paciente registrado',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha del registro en la tabla de pesos',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de pesos por paciente';
INSERT INTO `tbl_pesos` (`id_peso`, `cedula_paciente`, `peso`, `fecha_registro`) VALUES (1, 12345678, '75.00', '2022-01-01'), (2, 12345678, '80.00', '2022-06-06'), (3, 12345678, '90.00', '2023-01-01'), (4, 12345678, '95.00', '2023-06-06'), (5, 87654321, '75.00', '2022-01-01'), (6, 87654321, '80.00', '2022-06-06'), (7, 87654321, '90.00', '2023-01-01'), (8, 87654321, '95.00', '2023-06-06');

DROP TABLE IF EXISTS `tbl_temperaturas`;
CREATE TABLE `tbl_temperaturas` (
  `id_temperatura` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de temperatura',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `temperatura` decimal(4,2) NOT NULL COMMENT 'Temperatura del paciente registrado',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha del registro en la tabla de temperaturas',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de temperaturas por paciente';
INSERT INTO `tbl_temperaturas` (`id_temperatura`, `cedula_paciente`, `temperatura`, `fecha_registro`) VALUES (1, 12345678, '36.00', '2022-01-01'), (2, 12345678, '37.00', '2022-06-06'), (3, 12345678, '38.00', '2023-01-01'), (4, 12345678, '39.00', '2023-06-06'), (5, 87654321, '36.00', '2022-01-01'), (6, 87654321, '37.00', '2022-06-06'), (7, 87654321, '38.00', '2023-01-01'), (8, 87654321, '39.00', '2023-06-06');

DROP TABLE IF EXISTS `tbl_frecuencias_respiratorias`;
CREATE TABLE `tbl_frecuencias_respiratorias` (
  `id_frecuencia` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la frecuencia respiratoria',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la frecuencia respiratoria', 
  `frecuencia_respiratoria` int(3) NOT NULL COMMENT 'Frecuencia respiratoria del paciente',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de frecuencias respiratorias por paciente';
INSERT INTO `tbl_frecuencias_respiratorias` (`id_frecuencia`, `cedula_paciente`, `frecuencia_respiratoria`, `fecha_registro`) VALUES (1, 12345678, 80, '2022-01-01'), (2, 12345678, '90', '2022-06-06'), (3, 12345678, 9, '2023-01-01'), (4, 12345678, 120, '2023-06-06'), (5, 87654321, 80, '2022-01-01'), (6, 87654321, 90, '2022-06-06'), (7, 87654321, 9, '2023-01-01'), (8, 87654321, 120, '2023-06-06');

DROP TABLE IF EXISTS `tbl_presiones_arteriales`;
CREATE TABLE `tbl_presiones_arteriales` (
  `id_presion` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la presión arterial',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la presión arterial',
  `presion_sistolica` int(3) NOT NULL COMMENT 'Presión sistólica',
  `presion_diastolica` int(3) NOT NULL COMMENT 'Presión distólica',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de presiones arteriales por paciente';
INSERT INTO `tbl_presiones_arteriales` (`id_presion`, `cedula_paciente`, `presion_sistolica`, `presion_diastolica`, `fecha_registro`) VALUES (1, 12345678, 120, 80, '2022-01-01'), (2, 12345678, 130, 90, '2022-06-06'), (3, 12345678, 140, 100, '2023-01-01'), (4, 12345678, 150, 110, '2023-06-06'), (5, 87654321, 120, 80, '2022-01-01'), (6, 87654321, 130, 90, '2022-06-06'), (7, 87654321, 140, 100, '2023-01-01'), (8, 87654321, 150, 110, '2023-06-06');

DROP DATABASE IF EXISTS `tbl_frecuencias_cardiacas`;
CREATE TABLE `tbl_frecuencias_cardiacas` (
  `id_frecuencia` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la frecuencia cardiaca',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la frecuencia cardiaca',
  `frecuencia_cardiaca` int(3) NOT NULL COMMENT 'Frecuencia cardiaca del paciente',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de frecuencias cardiacas por paciente';
INSERT INTO `tbl_frecuencias_cardiacas` (`id_frecuencia`, `cedula_paciente`, `frecuencia_cardiaca`, `fecha_registro`) VALUES (1, 12345678, 80, '2022-01-01'), (2, 12345678, 90, '2022-06-06'), (3, 12345678, 100, '2023-01-01'), (4, 12345678, 110, '2023-06-06'), (5, 87654321, 80, '2022-01-01'), (6, 87654321, 90, '2022-06-06'), (7, 87654321, 100, '2023-01-01'), (8, 87654321, 110, '2023-06-06');

DROP TABLE IF EXISTS `tbl_medicamentos`;
CREATE TABLE `tbl_medicamentos` (
  `id_medicamento` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del medicamento',
  `cedula_paciente` int(11) NOT NULL COMMENT 'Cedula del paciente',
  `nombre_medicamento` varchar(128) NOT NULL COMMENT 'Nombre del medicamento',
  `dosis_medicamento` varchar(64) NOT NULL COMMENT 'Dosis/explicación del medicamento',
  `via_administracion_medicamento` varchar(64) NOT NULL COMMENT 'Via de administración del medicamento',
  `intervalo_medicamento` varchar(64) NOT NULL COMMENT 'Duración del medicamento',
  `fecha_inicio_medicamento` DATE NOT NULL COMMENT 'Fecha de inicio para el medicamento',
  `fecha_fin_medicamento` DATE COMMENT 'Fecha de fin para el medicamento',
  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de medicamentos';
INSERT INTO `tbl_medicamentos` (`cedula_paciente`, `nombre_medicamento`, `dosis_medicamento`, `via_administracion_medicamento`, `intervalo_medicamento`, `fecha_inicio_medicamento`, `fecha_fin_medicamento`) VALUES (12345678, 'Paracetamol', '500 mg', 'Oral', 'Cada 8 horas', '2024-10-01', '2024-10-06'), (12345678, 'Ibuprofeno', '400 mg', 'Oral', 'Cada 6 horas', '2024-10-05', NULL), (12345678, 'Amoxicilina', '250 mg', 'Oral', 'Cada 12 horas', '2024-10-10', '2024-10-20'), (12345678, 'Loratadina', '10 mg', 'Oral', 'Una vez al día', '2024-10-15', NULL), (12345678, 'Metformina', '500 mg', 'Oral', 'Cada 12 horas', '2024-09-01', NULL), (12345678, 'Salbutamol', '100 mcg', 'Inhalación', 'Según necesidad', '2024-10-01', NULL), (12345678, 'Losartán', '50 mg', 'Oral', 'Una vez al día', '2024-08-15', NULL), (12345678, 'Omeprazol', '20 mg', 'Oral', 'Una vez al día antes de comer', '2024-09-10', NULL), (87654321, 'Paracetamol', '500 mg', 'Oral', 'Cada 8 horas', '2024-10-01', '2024-10-06'), (87654321, 'Ibuprofeno', '400 mg', 'Oral', 'Cada 6 horas', '2024-10-05', NULL), (87654321, 'Amoxicilina', '250 mg', 'Oral', 'Cada 12 horas', '2024-10-10', '2024-10-20'), (87654321, 'Loratadina', '10 mg', 'Oral', 'Una vez al día', '2024-10-15', NULL), (87654321, 'Metformina', '500 mg', 'Oral', 'Cada 12 horas', '2024-09-01', NULL), (87654321, 'Salbutamol', '100 mcg', 'Inhalación', 'Según necesidad', '2024-10-01', NULL), (87654321, 'Losartán', '50 mg', 'Oral', 'Una vez al día', '2024-08-15', NULL);

DROP TABLE IF EXISTS `tbl_consultas`;
CREATE TABLE `tbl_consultas` (
  `id_consulta` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la consulta',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la consulta',
  `id_usuario` int(11) NOT NULL COMMENT 'ID del usuario que registró la consulta',
  `fecha_consulta` datetime NOT NULL COMMENT 'Fecha y hora para la consulta',
  `motivo_consulta` varchar(255) NOT NULL COMMENT 'Motivo/descripción de la consulta',
  `estado_consulta` varchar(255) NOT NULL COMMENT 'Estado de la consulta',

  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`),
  FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios`(`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de consultas';

DROP TABLE IF EXISTS `tbl_tipos_antecedentes`;
CREATE TABLE `tbl_tipos_antecedentes` (
  `id_tipo_antecedente` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del tipo de antecedente',
  `nombre_tipo_antecedente` varchar(32) NOT NULL COMMENT 'Nombre del tipo de antecedente',
  `descripcion_tipo_antecedente` varchar(255) NOT NULL COMMENT 'Descripción del tipo de antecedente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de tipos de antecedentes';
INSERT INTO `tbl_tipos_antecedentes` (`id_tipo_antecedente`, `nombre_tipo_antecedente`, `descripcion_tipo_antecedente`) VALUES (1, 'Patológicos', 'Son el conjunto de datos que reflejan el historial médico de un paciente, incluyendo enfermedades previas, cirugías, hospitalizaciones y condiciones crónicas.'), (2, 'Heredofamiliares', 'Se refieren a las enfermedades y condiciones de salud que han afectado a los familiares directos del paciente (como padres y abuelos).'), (3, 'No patológicos', 'Abarcan aspectos de la vida del paciente que no están relacionados con enfermedades, tales como el estado civil, ocupación, hábitos alimenticios, actividad física y entorno social.'), (4, 'Alergias', 'Son reacciones del sistema inmunológico a sustancias que generalmente son inofensivas para la mayoría de las personas. Pueden influir en las decisiones médicas, como la elección de medicamentos o tratamientos, evitando así reacciones adversas'); 

DROP TABLE IF EXISTS `tbl_antecedentes`;
CREATE TABLE `tbl_antecedentes` (
  `id_antecedente` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del antecedente',
  `cedula_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el antecedente',
  `id_tipo_antecedente` int(11) NOT NULL COMMENT 'ID del tipo de antecedente',
  `título` varchar(32) NOT NULL COMMENT 'Título del antecedente',
  `descripción` text NOT NULL COMMENT 'Descripción del antecedente',

  FOREIGN KEY (`cedula_paciente`) REFERENCES `tbl_pacientes`(`cedula_paciente`),
  FOREIGN KEY (`id_tipo_antecedente`) REFERENCES `tbl_tipos_antecedentes`(`id_tipo_antecedente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de antecedentes';
INSERT INTO `tbl_antecedentes` (`id_antecedente`, `cedula_paciente`, `id_tipo_antecedente`, `título`, `descripción`) VALUES (1, 12345678, 1, 'Cirugías previas', 'Apendicectomia en 06/2018'), (2, 12345678, 1, 'Diabetes', 'Tipo II'), (3, 12345678, 2, 'Psiquiátricos', 'Ninguno'), (4, 12345678, 2, 'Hipertensión arterial', 'Abuela materna, abuelo paterno y materno'), (5, 12345678, 3, 'Alcoholismo', 'En reuniones'), (6, 12345678, 3, 'Actividad física', 'Nunca'), (7, 12345678, 4, 'Medicamentos', 'AINEs'), (8, 12345678, 4, 'Alimentos', 'Camarones, Atún, Chigüire');