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

  `id_rol_usuario` int(11) NOT NULL COMMENT 'ID del rol del usuario',
  `id_status_usuario` int(11) NOT NULL COMMENT 'ID del status del usuario',

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
  `id_paciente` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Apellidos del paciente',
  `nombres_paciente` varchar(64) NOT NULL COMMENT 'Nombres del paciente',
  `apellidos_paciente` varchar(64) NOT NULL COMMENT 'Apellidos del paciente',
  `cedula_paciente` varchar(8) NOT NULL COMMENT 'Cédula de identidad del paciente',
  `telefono_paciente` varchar(12) NOT NULL COMMENT 'Teléfono del paciente',
  `fecha_nacimiento_paciente` DATE NOT NULL COMMENT 'Fecha de nacimiento del paciente'
  -- alturas
  -- pesos --> "pesos": [{ "valor": 75, "fecha_peso": "2022-01-01"},{  "valor": 80,"fecha_peso": "2022-06-06"}, ...],
  -- temperaturas
  -- frecuencias respiratorias
  -- presiones arteriales
  -- frecuencias cardíacas
  -- medicamentos
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de pacientes';
INSERT INTO `tbl_pacientes` (`id_paciente`, `nombres_paciente`, `apellidos_paciente`, `cedula_paciente`, `telefono_paciente`, `fecha_nacimiento_paciente`) VALUES (1, 'Luis Andrés', 'Chen Romero', '12345678', '04141234567', '2000-01-01'), (2, 'José Ramón', 'Fernandez Gutierrez', '87654321', '04147654321', '1980-06-06');

DROP TABLE IF EXISTS `tbl_alturas`;
CREATE TABLE `tbl_alturas` (
  `id_altura` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de altura',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `altura` decimal(5,2) NOT NULL COMMENT 'Altura del paciente registrado',
  `fecha_registro` DATE NOT NULL  COMMENT 'Fecha del registro en la tabla de alturas',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de alturas por paciente';
INSERT INTO `tbl_alturas` (`id_altura`, `id_paciente`, `altura`, `fecha_registro`) VALUES (1, 1, '1.75', '2022-01-01'), (2, 1, '1.80', '2022-06-06'), (3, 1, '1.90', '2023-01-01'), (4, 1, '1.95', '2023-06-06'), (5, 2, '1.75', '2022-01-01'), (6, 2, '1.80', '2022-06-06'), (7, 2, '1.90', '2023-01-01'), (8, 2, '1.95', '2023-06-06');

DROP TABLE IF EXISTS `tbl_pesos`;
CREATE TABLE `tbl_pesos` (
  `id_peso` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de peso',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `peso` decimal(5,2) NOT NULL COMMENT 'Peso del paciente registrado',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha del registro en la tabla de pesos',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de pesos por paciente';
INSERT INTO `tbl_pesos` (`id_peso`, `id_paciente`, `peso`, `fecha_registro`) VALUES (1, 1, '75.00', '2022-01-01'), (2, 1, '80.00', '2022-06-06'), (3, 1, '90.00', '2023-01-01'), (4, 1, '95.00', '2023-06-06'), (5, 2, '75.00', '2022-01-01'), (6, 2, '80.00', '2022-06-06'), (7, 2, '90.00', '2023-01-01'), (8, 2, '95.00', '2023-06-06');

DROP TABLE IF EXISTS `tbl_temperaturas`;
CREATE TABLE `tbl_temperaturas` (
  `id_temperatura` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de temperatura',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `temperatura` decimal(4,2) NOT NULL COMMENT 'Temperatura del paciente registrado',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha del registro en la tabla de temperaturas',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de temperaturas por paciente';
INSERT INTO `tbl_temperaturas` (`id_temperatura`, `id_paciente`, `temperatura`, `fecha_registro`) VALUES (1, 1, '36.00', '2022-01-01'), (2, 1, '37.00', '2022-06-06'), (3, 1, '38.00', '2023-01-01'), (4, 1, '39.00', '2023-06-06'), (5, 2, '36.00', '2022-01-01'), (6, 2, '37.00', '2022-06-06'), (7, 2, '38.00', '2023-01-01'), (8, 2, '39.00', '2023-06-06');

DROP TABLE IF EXISTS `tbl_frecuencias_respiratorias`;
CREATE TABLE `tbl_frecuencias_respiratorias` (
  `id_frecuencia` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la frecuencia respiratoria',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la frecuencia respiratoria', 
  `frecuencia_respiratoria` int(3) NOT NULL COMMENT 'Frecuencia respiratoria del paciente',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de frecuencias respiratorias por paciente';
INSERT INTO `tbl_frecuencias_respiratorias` (`id_frecuencia`, `id_paciente`, `frecuencia_respiratoria`, `fecha_registro`) VALUES (1, 1, 80, '2022-01-01'), (2, 1, '90', '2022-06-06'), (3, 1, 9, '2023-01-01'), (4, 1, 120, '2023-06-06'), (5, 2, 80, '2022-01-01'), (6, 2, 90, '2022-06-06'), (7, 2, 9, '2023-01-01'), (8, 2, 120, '2023-06-06');

DROP TABLE IF EXISTS `tbl_presiones_arteriales`;
CREATE TABLE `tbl_presiones_arteriales` (
  `id_presion` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la presión arterial',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la presión arterial',
  `presion_sistolica` int(3) NOT NULL COMMENT 'Presión sistólica',
  `presion_diastolica` int(3) NOT NULL COMMENT 'Presión distólica',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de presiones arteriales por paciente';
INSERT INTO `tbl_presiones_arteriales` (`id_presion`, `id_paciente`, `presion_sistolica`, `presion_diastolica`, `fecha_registro`) VALUES (1, 1, 120, 80, '2022-01-01'), (2, 1, 130, 90, '2022-06-06'), (3, 1, 140, 100, '2023-01-01'), (4, 1, 150, 110, '2023-06-06'), (5, 2, 120, 80, '2022-01-01'), (6, 2, 130, 90, '2022-06-06'), (7, 2, 140, 100, '2023-01-01'), (8, 2, 150, 110, '2023-06-06');

DROP DATABASE IF EXISTS `tbl_frecuencias_cardiacas`;
CREATE TABLE `tbl_frecuencias_cardiacas` (
  `id_frecuencia` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la frecuencia cardiaca',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la frecuencia cardiaca',
  `frecuencia_cardiaca` int(3) NOT NULL COMMENT 'Frecuencia cardiaca del paciente',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de frecuencias cardiacas por paciente';
INSERT INTO `tbl_frecuencias_cardiacas` (`id_frecuencia`, `id_paciente`, `frecuencia_cardiaca`, `fecha_registro`) VALUES (1, 1, 80, '2022-01-01'), (2, 1, 90, '2022-06-06'), (3, 1, 100, '2023-01-01'), (4, 1, 110, '2023-06-06'), (5, 2, 80, '2022-01-01'), (6, 2, 90, '2022-06-06'), (7, 2, 100, '2023-01-01'), (8, 2, 110, '2023-06-06');

DROP TABLE IF EXISTS `tbl_medicamentos`;
CREATE TABLE `tbl_medicamentos` (
  `id_medicamento` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del medicamento',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde el medicamento',
  `nombre_medicamento` varchar(128) NOT NULL COMMENT 'Nombre del medicamento',
  `dosis_medicamento` varchar(64) NOT NULL COMMENT 'Dosis/explicación del medicamento',
  `via_administracion_medicamento` varchar(64) NOT NULL COMMENT 'Via de administración del medicamento',
  `intervalo_medicamento` varchar(64) NOT NULL COMMENT 'Duración del medicamento',
  `fecha_inicio_medicamento` DATE NOT NULL COMMENT 'Fecha de inicio para el medicamento',
  `fecha_fin_medicamento` DATE COMMENT 'Fecha de fin para el medicamento',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de medicamentos';
INSERT INTO `tbl_medicamentos` (`id_paciente`, `nombre_medicamento`, `dosis_medicamento`, `via_administracion_medicamento`, `intervalo_medicamento`, `fecha_inicio_medicamento`, `fecha_fin_medicamento`) VALUES (1, 'Paracetamol', '500 mg', 'Oral', 'Cada 8 horas', '2024-10-01', '2024-10-06'),
(1, 'Ibuprofeno', '400 mg', 'Oral', 'Cada 6 horas', '2024-10-05', NULL),
(1, 'Amoxicilina', '250 mg', 'Oral', 'Cada 12 horas', '2024-10-10', '2024-10-20'),
(1, 'Loratadina', '10 mg', 'Oral', 'Una vez al día', '2024-10-15', NULL),
(1, 'Metformina', '500 mg', 'Oral', 'Cada 12 horas', '2024-09-01', NULL),
(1, 'Salbutamol', '100 mcg', 'Inhalación', 'Según necesidad', '2024-10-01', NULL),
(1, 'Losartán', '50 mg', 'Oral', 'Una vez al día', '2024-08-15', NULL),
(1, 'Omeprazol', '20 mg', 'Oral', 'Una vez al día antes de comer', '2024-09-10', NULL),
(2, 'Paracetamol', '500 mg', 'Oral', 'Cada 8 horas', '2024-10-01', '2024-10-06'),
(2, 'Ibuprofeno', '400 mg', 'Oral', 'Cada 6 horas', '2024-10-05', NULL),
(2, 'Amoxicilina', '250 mg', 'Oral', 'Cada 12 horas', '2024-10-10', '2024-10-20'),
(2, 'Loratadina', '10 mg', 'Oral', 'Una vez al día', '2024-10-15', NULL),
(2, 'Metformina', '500 mg', 'Oral', 'Cada 12 horas', '2024-09-01', NULL),
(2, 'Salbutamol', '100 mcg', 'Inhalación', 'Según necesidad', '2024-10-01', NULL),
(2, 'Losartán', '50 mg', 'Oral', 'Una vez al día', '2024-08-15', NULL);

CREATE TABLE `tbl_consultas` (
  `id_consulta` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la consulta',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la consulta',
  `id_usuario` int(11) NOT NULL COMMENT 'ID del usuario que registró la consulta',
  `fecha_consulta` datetime NOT NULL COMMENT 'Fecha y hora para la consulta',
  `motivo_consulta` varchar(255) NOT NULL COMMENT 'Motivo/descripción de la consulta',
  `estado_consulta` varchar(255) NOT NULL COMMENT 'Estado de la consulta',

  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`),
  FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuarios`(`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de consultas';


