-- Archivo de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Crear esquemas adicionales si es necesario
-- CREATE SCHEMA IF NOT EXISTS analytics;

-- Insertar datos iniciales si es necesario
-- INSERT INTO users (name, email) VALUES ('Admin', 'admin@example.com');

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS gastos (
    id_gasto SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    categoria VARCHAR(255),
    cantidad INTEGER,
    fecha DATE,
    FOREIGN KEY  (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ingresos (
    id_ingreso SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    origen VARCHAR(255),
    cantidad INTEGER,
    fecha DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- Usuarios para probar la app:

INSERT INTO usuarios (nombre, contrasenia) VALUES
    ('usuario1', 'contrasenia1'),
    ('usuario2', 'contrasenia2'),
    ('usuario3', 'contrasenia3');

--  Datos para probar la app: 

INSERT INTO gastos (categoria, cantidad, fecha, id_usuario) VALUES
    ('Comida', 850, '2025-07-10', 1),
    ('Transporte', 320, '2024-03-08', 2),
    ('Entretenimiento', 1200, '2023-12-15', 3),
    ('Alquiler', 18500, '2025-01-01', 1),
    ('Servicios', 2900, '2024-06-03', 2),
    ('Educación', 4500, '2023-09-25', 3),
    ('Salud', 2600, '2025-02-06', 1),
    ('Comida', 930, '2023-11-11', 2),
    ('Transporte', 400, '2024-08-19',3),
    ('Entretenimiento', 1100, '2025-04-20', 1),
    ('Ropa', 1800, '2023-04-10', 1),
    ('Hogar', 2400, '2025-06-14', 2),
    ('Mascotas', 1300, '2024-02-21', 3),
    ('Comida', 780, '2023-10-01', 1),
    ('Educación', 5200, '2024-11-15', 2),
    ('Salud', 3900, '2025-03-09', 3),
    ('Alquiler', 19000, '2023-01-05', 1),
    ('Servicios', 3100, '2024-09-12', 2),
    ('Transporte', 550, '2023-08-18',  3),
    ('Comida', 1020, '2025-05-07', 1);

INSERT INTO ingresos (cantidad, fecha, origen, id_usuario) VALUES
    (60000, '2025-07-01', 'Transferencia', 1),
    (15000, '2024-07-07', 'PayPal', 2),
    (2500, '2023-07-05', 'MercadoPago', 3),
    (3000, '2025-12-10', 'Efectivo', 1),
    (20000, '2023-06-30', 'Transferencia', 2),
    (62000, '2024-05-01', 'Transferencia', 3),
    (18000, '2025-03-15', 'Payoneer', 1),
    (3500, '2024-12-24', 'Efectivo', 2),
    (1900, '2023-10-10', 'Efectivo', 3),
    (22000, '2025-01-28', 'Transferencia', 1),
    (61000, '2023-12-01', 'Transferencia', 2),
    (4000, '2024-04-05', 'Efectivo', 3),
    (17000, '2023-09-18', 'PayPal', 1),
    (2200, '2024-10-20', 'MercadoPago', 2),
    (5000, '2025-02-14', 'Transferencia', 3),
    (63000, '2023-03-01', 'Transferencia', 1),
    (21000, '2024-01-15', 'Transferencia', 2),
    (15500, '2025-06-09', 'Payoneer', 3),
    (2700, '2023-05-22', 'Efectivo', 1),
    (3200, '2024-08-30', 'Efectivo', 2);


-- Mensaje de confirmación
SELECT 'Base de datos inicializada correctamente' AS status;

-- FUNCTIONS (STORED PROCEDURES en mysql) 

--- INICIO FUNCIONES GASTOS ---

-- Explicacion de la sintaxis para crear una funcion (procedimiento) en postgre
-- CREATE FUNCTION... De esta manera creas un stored procedure en postgre
-- RETURNS TABLE... Tenes que definir la estructura del return cuando devolves mas de 1 elemento
-- AS $$ -- Con $$ definis el inicio del cuerpo del procedimiento
-- $$ LANGUAGE plpgsql; -- En esta linea cerras el cuerpo del procedimiento y definiendo plpgsql como el lenguaje nos permite usar elementos del lenguaje como SELECT, BEGIN y END asi podemos esctructurar correctamente el cuerpo de la funcion (el procedure)

-- DEVUELVE GASTOS MAYORES A UNA CANTIDAD INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverGastosMayoresA(cantidad_in INTEGER, id_usuario_in INTEGER) 
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE) 
AS $$ 
BEGIN
    RETURN QUERY SELECT g.id_gasto, g.categoria, g.cantidad, g.fecha FROM gastos g WHERE g.id_usuario = id_usuario_in AND g.cantidad > cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS MENORES A UNA CANTIDAD INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverGastosMenoresA(cantidad_in INTEGER, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT g.id_gasto, g.categoria, g.cantidad, g.fecha FROM gastos g WHERE g.id_usuario = id_usuario_in AND g.cantidad < cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR CATEGORIA PARA UN USUARIO
CREATE FUNCTION devolverGastosPorCategoria(categoria_in VARCHAR, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT g.id_gasto, g.categoria, g.cantidad, g.fecha FROM gastos g WHERE g.id_usuario = id_usuario_in AND g.categoria = categoria_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS AGRUPADOS POR CATEGORIA PARA UN USUARIO
CREATE FUNCTION devolverGastosAgrupadosPorCategoria(id_usuario_in INTEGER)
RETURNS TABLE (categoria VARCHAR, total_gastos BIGINT)
AS $$
BEGIN   
    RETURN QUERY SELECT gastos.categoria, SUM(gastos.cantidad) AS total_gastos FROM gastos
    WHERE gastos.id_usuario = id_usuario_in
    GROUP BY gastos.categoria;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS AGRUPADOS POR MES EN UN ANIO SELECCIONADO PARA UN USUARIO
CREATE FUNCTION devolverGastosAgrupadosPorMes(anio_in INTEGER, id_usuario_in INTEGER)
RETURNS TABLE (total_gastos BIGINT, mes INTEGER)
AS $$
BEGIN
    RETURN QUERY SELECT SUM(cantidad) AS total_cantidad, 
    EXTRACT(MONTH FROM fecha)::INTEGER AS mes 
    FROM gastos
    WHERE gastos.id_usuario = id_usuario_in AND EXTRACT(YEAR FROM fecha) = anio_in
    GROUP BY mes
    ORDER BY mes; 
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR FECHA MAYOR A UNA FECHA INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverGastosPorFechaMayorA(in_fecha DATE, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT g.id_gasto, g.categoria, g.cantidad, g.fecha FROM gastos g WHERE g.id_usuario = id_usuario_in AND g.fecha > in_fecha;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR FECHA MENOR A UNA FECHA INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverGastosPorFechaMenorA(in_fecha DATE, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT g.id_gasto, g.categoria, g.cantidad, g.fecha FROM gastos g WHERE g.id_usuario = id_usuario_in AND g.fecha < in_fecha;
END;
$$ LANGUAGE plpgsql;

-- BORRA UN GASTO QUE COINCIDA CON EL ID INGRESADO Y EL USUARIO
CREATE FUNCTION borrarGasto(in_id INTEGER, id_usuario_in INTEGER)
RETURNS VOID   
AS $$
BEGIN
    DELETE FROM gastos
    WHERE gastos.id_usuario = id_usuario_in AND gastos.id_gasto = in_id;
END;
$$ LANGUAGE plpgsql;

-- AGREGA UN GASTO CON LOS ATRIBUTOS QUE INGRESE EL USUARIO Y EL ID DEL USUARIO
CREATE FUNCTION agregarUnGasto(in_categoria VARCHAR, in_cantidad INTEGER, in_fecha DATE, id_usuario_in INTEGER)
RETURNS VOID
AS $$
    BEGIN
        INSERT INTO gastos (id_usuario, categoria, cantidad, fecha) VALUES (id_usuario_in, in_categoria, in_cantidad, in_fecha);
    END;
$$ LANGUAGE plpgsql;

--- FIN FUNCIONES GASTOS ---

--- INICIO DE FUNCIONES DE INGRESOS ---

-- DEVUELVE INGRESOS MAYORES A UNA CANTIDAD INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverIngresosMayoresA(cantidad_in INTEGER, id_usuario_in INTEGER) 
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE) 
AS $$ 
BEGIN
    RETURN QUERY SELECT i.id_ingreso, i.origen, i.cantidad, i.fecha FROM ingresos i WHERE i.id_usuario = id_usuario_in AND i.cantidad > cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS MENORES A UNA CANTIDAD INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverIngresosMenoresA(cantidad_in INTEGER, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT i.id_ingreso, i.origen, i.cantidad, i.fecha FROM ingresos i WHERE i.id_usuario = id_usuario_in AND i.cantidad < cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS POR ORIGEN PARA UN USUARIO
CREATE FUNCTION devolverIngresosPorOrigen(origen_in VARCHAR, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT i.id_ingreso, i.origen, i.cantidad, i.fecha FROM ingresos i WHERE i.id_usuario = id_usuario_in AND i.origen = origen_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS AGRUPADOS POR ORIGEN PARA UN USUARIO
CREATE FUNCTION devolverIngresosAgrupadosPorOrigen(id_usuario_in INTEGER)
RETURNS TABLE (origen VARCHAR, total_ingresos BIGINT)
AS $$
BEGIN   
    RETURN QUERY SELECT ingresos.origen, SUM(ingresos.cantidad) AS total_ingresos FROM ingresos
    WHERE ingresos.id_usuario = id_usuario_in
    GROUP BY ingresos.origen;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS AGRUPADOS POR MES EN UN ANIO SELECCIONADO PARA UN USUARIO
CREATE FUNCTION devolverIngresosAgrupadosPorMes(anio_in INTEGER, id_usuario_in INTEGER)
RETURNS TABLE (total_ingresos BIGINT, mes INTEGER)
AS $$
BEGIN
    RETURN QUERY SELECT SUM(cantidad) AS total_cantidad, 
    EXTRACT(MONTH FROM fecha)::INTEGER AS mes 
    FROM ingresos
    WHERE ingresos.id_usuario = id_usuario_in AND EXTRACT(YEAR FROM fecha) = anio_in
    GROUP BY mes
    ORDER BY mes; 
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS POR FECHA MAYOR A UNA FECHA INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverIngresosPorFechaMayorA(in_fecha DATE, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT i.id_ingreso, i.origen, i.cantidad, i.fecha FROM ingresos i WHERE i.id_usuario = id_usuario_in AND i.fecha > in_fecha;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS POR FECHA MENOR A UNA FECHA INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverIngresosPorFechaMenorA(in_fecha DATE, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT i.id_ingreso, i.origen, i.cantidad, i.fecha FROM ingresos i WHERE i.id_usuario = id_usuario_in AND i.fecha < in_fecha;
END;
$$ LANGUAGE plpgsql;

-- BORRA UN INGRESO QUE COINCIDA CON EL ID INGRESADO Y EL USUARIO
CREATE FUNCTION borrarIngreso(in_id INTEGER, id_usuario_in INTEGER)
RETURNS VOID   
AS $$
BEGIN
    DELETE FROM ingresos
    WHERE ingresos.id_usuario = id_usuario_in AND ingresos.id_ingreso = in_id;
END;
$$ LANGUAGE plpgsql;

-- AGREGA UN INGRESO CON LOS ATRIBUTOS QUE INGRESE EL USUARIO Y EL ID DEL USUARIO
CREATE FUNCTION agregarUnIngreso(in_origen VARCHAR, in_cantidad INTEGER, in_fecha DATE, id_usuario_in INTEGER)
RETURNS VOID
AS $$
    BEGIN
        INSERT INTO ingresos (id_usuario, origen, cantidad, fecha) VALUES (id_usuario_in, in_origen, in_cantidad, in_fecha);
    END;
$$ LANGUAGE plpgsql;

--- FIN FUNCIONES INGRESOS ---