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

INSERT INTO usuarios (nombre, contrasenia) VALUES
    ('usuario1', 'contrasenia1'),
    ('usuario2', 'contrasenia2'),
    ('usuario3', 'contrasenia3');

INSERT INTO gastos (id_usuario, categoria, cantidad, fecha) VALUES
    (1, 'Alimentos', 3200, '2025-06-01'),
    (1, 'Transporte', 1100, '2025-06-02'),
    (2, 'Servicios', 2300, '2025-06-03'),
    (2, 'Educación', 4000, '2025-06-04'),
    (3, 'Entretenimiento', 1800, '2025-06-05');

INSERT INTO ingresos (id_usuario, origen, cantidad, fecha) VALUES
    (1, 'Bitcoin', 200, '2025-07-01'),
    (1, 'Bitcoin', 100, '2025-04-02'),
    (1, 'Bitcoin', 800, '2025-04-03'),
    (3, 'Otros', 10, '2025-05-21'),
    (2, 'Regalo', 3000, '2025-06-05');


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
    RETURN QUERY SELECT * FROM gastos WHERE gastos.id_usuario = id_usuario_in AND gastos.cantidad > cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS MENORES A UNA CANTIDAD INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverGastosMenoresA(cantidad_in INTEGER, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.id_usuario = id_usuario_in AND gastos.cantidad < cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR CATEGORIA PARA UN USUARIO
CREATE FUNCTION devolverGastosPorCategoria(categoria_in VARCHAR, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.id_usuario = id_usuario_in AND gastos.categoria = categoria_in;
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
    RETURN QUERY SELECT * FROM gastos WHERE gastos.id_usuario = id_usuario_in AND gastos.fecha > in_fecha;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE GASTOS POR FECHA MENOR A UNA FECHA INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverGastosPorFechaMenorA(in_fecha DATE, id_usuario_in INTEGER)
RETURNS TABLE (id_gasto INTEGER, categoria VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM gastos WHERE gastos.id_usuario = id_usuario_in AND gastos.fecha < in_fecha;
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
    RETURN QUERY SELECT * FROM ingresos WHERE ingresos.id_usuario = id_usuario_in AND ingresos.cantidad > cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS MENORES A UNA CANTIDAD INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverIngresosMenoresA(cantidad_in INTEGER, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM ingresos WHERE ingresos.id_usuario = id_usuario_in AND ingresos.cantidad < cantidad_in;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS POR ORIGEN PARA UN USUARIO
CREATE FUNCTION devolverIngresosPorOrigen(origen_in VARCHAR, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM ingresos WHERE ingresos.id_usuario = id_usuario_in AND ingresos.origen = origen_in;
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
    RETURN QUERY SELECT * FROM ingresos WHERE ingresos.id_usuario = id_usuario_in AND ingresos.fecha > in_fecha;
END;
$$ LANGUAGE plpgsql;

-- DEVUELVE INGRESOS POR FECHA MENOR A UNA FECHA INGRESADA PARA UN USUARIO
CREATE FUNCTION devolverIngresosPorFechaMenorA(in_fecha DATE, id_usuario_in INTEGER)
RETURNS TABLE (id_ingreso INTEGER, origen VARCHAR, cantidad INTEGER, fecha DATE)
AS $$
BEGIN
    RETURN QUERY SELECT * FROM ingresos WHERE ingresos.id_usuario = id_usuario_in AND ingresos.fecha < in_fecha;
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