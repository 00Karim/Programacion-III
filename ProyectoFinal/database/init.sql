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

-- FUNCTIONS (STORED PROCEDURES en sql normal) 


-- Explicacion de la sintaxis para crear una funcion (procedimiento) en postgre
-- CREATE FUNCTION... De esta manera creas un stored procedure en postgre
-- RETURNS TABLE... Tenes que definir la estructura del return cuando devolves mas de 1 elemento
-- AS $$ -- Con $$ definis el inicio del cuerpo del procedimiento
-- $$ LANGUAGE plpgsql; -- En esta linea cerras el cuerpo del procedimiento y definiendo plpgsql como el lenguaje nos permite usar elementos del lenguaje como SELECT, BEGIN y END asi podemos esctructurar correctamente el cuerpo de la funcion (el procedure)

-- DEVUELVE GASTOS MAYORES A UNA CANTIDAD INGRESADA
CREATE FUNCTION devolverGastosMayoresA(cantidad_in INTEGER) 
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fech DATE) 
AS $$ 
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.cantidad > cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS MENORES A UNA CANTIDAD INGRESADA
CREATE FUNCTION devolverGastosMenoresA(cantidad_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fech DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.cantidad < cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR CATEGORIA
CREATE FUNCTION devolverGastosPorCategoria(categoria_in VARCHAR)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.categoria = categoria_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR FECHA MAYOR A UNA FECHA INGRESADA
CREATE FUNCTION devolverGastosPorFechaMayorA(in_fecha DATE)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.fecha > in_fecha;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR FECHA MENOR A UNA FECHA INGRESADA
CREATE FUNCTION devolverGastosPorFechaMenorA(in_fecha DATE)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.fecha < in_fecha;
END;
$$ LANGUAGE plpgsql;
