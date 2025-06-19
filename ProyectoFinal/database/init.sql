-- Archivo de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Crear esquemas adicionales si es necesario
-- CREATE SCHEMA IF NOT EXISTS analytics;

-- Insertar datos iniciales si es necesario
-- INSERT INTO users (name, email) VALUES ('Admin', 'admin@example.com');

CREATE TABLE IF NOT EXISTS gastos (
    id_gasto SERIAL PRIMARY KEY,
    categoria VARCHAR(255),
    cantidad INTEGER,
    fecha DATE
);

INSERT INTO gastos (categoria, cantidad, fecha) VALUES
    ('Alimentos', 3200, '2025-06-01'),
    ('Transporte', 1100, '2025-06-02'),
    ('Servicios', 2300, '2025-06-03'),
    ('Educación', 4000, '2025-06-04'),
    ('Entretenimiento', 1800, '2025-06-05');

-- Mensaje de confirmación
SELECT 'Base de datos inicializada correctamente' AS status;
