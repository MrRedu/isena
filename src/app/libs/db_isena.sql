CREATE DATABASE `db_isena`;
USE `db_isena`;

DROP TABLE IF EXISTS `tbl_roles`;
CREATE TABLE `tbl_roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del rol de los usuarios',
  `nombre_rol` varchar(32) NOT NULL COMMENT 'Nombre del rol para los usuarios'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de roles';
INSERT INTO `tbl_roles` (id_rol, nombre_rol) VALUES (1, 'Administrador'), (2, 'Desarrollador'), (3, 'Médico');

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
INSERT INTO `tbl_usuarios` (`id_usuario`, `nombres_usuario`, `apellidos_usuario`, `correo_usuario`, `contrasena_usuario`, `id_rol_usuario`, `id_status_usuario`) VALUES (1, 'Admin', 'Admin', 'admin@admin.com', '$2a$10$0FfP3KWKDIw508ZMm06SVewQX1qA6GqRHJ8VPr5MnNjbWPjPbvBwa', 1, 1);
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
  `fecha_nacimiento_paciente` DATE NOT NULL COMMENT 'Fecha de nacimiento del paciente'
  -- pesos ['75kg', '01-01-2024'] // ['80kg', '05-05-2024'] // ['90kg', '07-07-2025']
  -- alturas
  -- temperaturas
  -- frecuencia respiratoria
  -- presión arterial
  -- medicamentos
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de pacientes';

DROP TABLE IF EXISTS `tbl_pesos`;
CREATE TABLE `tbl_pesos` (
  `id_peso` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de peso',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `peso` decimal(5,2) NOT NULL COMMENT 'Peso del paciente registrado',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha del registro en la tabla de pesos',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de pesos por paciente';

DROP TABLE IF EXISTS `tbl_alturas`;
CREATE TABLE `tbl_alturas` (
  `id_altura` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de altura',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `altura` decimal(5,2) NOT NULL COMMENT 'Altura del paciente registrado',
  `fecha_registro` DATE NOT NULL  COMMENT 'Fecha del registro en la tabla de alturas',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de alturas por paciente';

DROP TABLE IF EXISTS `tbl_temperaturas`;
CREATE TABLE `tbl_temperaturas` (
  `id_temperatura` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del registro de temperatura',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al cual pertenece el peso',
  `temperatura` decimal(4,2) NOT NULL COMMENT 'Temperatura del paciente registrado',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha del registro en la tabla de temperaturas',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de temperaturas por paciente';

DROP TABLE IF EXISTS `tbl_frecuencias_respiratorias`;
CREATE TABLE `tbl_frecuencias_respiratorias` (
  `id_frecuencia` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la frecuencia respiratoria',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la frecuencia respiratoria', 
  `frecuencia_respiratoria` int(3) NOT NULL COMMENT 'Frecuencia respiratoria del paciente',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de frecuencias respiratorias por paciente';

DROP TABLE IF EXISTS `tbl_presiones_arteriales`;
CREATE TABLE `tbl_presiones_arteriales` (
  `id_presion` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID de la presión arterial',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde la presión arterial',
  `presion_sistolica` int(3) NOT NULL COMMENT 'Presión sistólica',
  `presion_diastolica` int(3) NOT NULL COMMENT 'Presión distólica',
  `fecha_registro` DATE NOT NULL COMMENT 'Fecha en que se realizó el registro',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de presiones arteriales por paciente';

DROP TABLE IF EXISTS `tbl_medicamentos`;
CREATE TABLE `tbl_medicamentos` (
  `id_medicamento` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'ID del medicamento',
  `id_paciente` int(11) NOT NULL COMMENT 'ID del paciente al que le corresponde el medicamento',
  `nombre_medicamento` varchar(128) NOT NULL COMMENT 'Nombre del medicamento',
  `dosis` varchar(64) COMMENT 'Dosis/explicación del medicamento',
  `fecha_inicio` DATE NOT NULL COMMENT 'Fecha de inicio para el medicamento',
  FOREIGN KEY (`id_paciente`) REFERENCES `tbl_pacientes`(`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de medicamentos';

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


