const { Ingresos, sequelize } = require('./index')

class IngresosModel{
    // TODO: Crear las funciones necesarias (basicamente: copiar lo de ingresos.model.js y cambiar las variables, textos y queries

    devolverIngresos = async (id_usuario) => {
        console.log("devolverIngresos() - ingresos.model.js");
        const ingresos = await Ingresos.findAll({ where: { id_usuario } });
        return ingresos;
    }

    devolverIngresosAgrupadosPorMes = async (anio, id_usuario) => {
        console.log("devolverIngresosAgrupadosPorMes - ingresos.model.js");
        const ingresos = await sequelize.query(
            `SELECT * FROM devolverIngresosAgrupadosPorMes(:anio, :id_usuario)`, 
            { replacements: { anio, id_usuario } }
        );
        // Le ponemos el 0 porque el query de arriba devuelve un array con mas arrays adentro, el primer array es el que tiene los objetos y los siguientes tienen metadata que no nos interesa, por eso solo retornamos el primer array
        return ingresos[0]; 
    }

    devolverIngresosAgrupadosPorOrigen = async (id_usuario) => {
        console.log("devolverIngresosAgrupadosPorOrigen - ingresos.model.js");
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosAgrupadosPorOrigen(:id_usuario)',
            { replacements: { id_usuario } }
        )
        return ingresos[0];
    }

    devolverIngresosMayoresA = async (cantidad, id_usuario) => {
        console.log(`devolverIngresosMayoresA(${cantidad}) - ingresos.model.js`);
        // Nos aseguramos que cantidad sea un int si o si en el front asi no se pueden hacer inyecciones de sql
        const ingresos = await sequelize.query(
            `SELECT * FROM devolverIngresosMayoresA(:cantidad, :id_usuario)`,
            { replacements: { cantidad, id_usuario } }
        );
        return ingresos[0]; 
    }

    devolverIngresosMenoresA = async (cantidad, id_usuario) => {
        console.log(`devolverIngresosMenoresA(${cantidad}) - ingresos.model.js`);
        // En el frontos aseguramos que cantidad sea un int si o si asi no se pueden hacer inyecciones de sql
        const ingresos = await sequelize.query(
            `SELECT * FROM devolverIngresosMenoresA(:cantidad, :id_usuario)`,
            { replacements: { cantidad, id_usuario } }
        );
        return ingresos[0]; 
    }

    devolverIngresosPorOrigen = async (origen, id_usuario) => {
        console.log(`devolverIngresosPorOrigen(${origen}) - ingresos.model.js`);
        // En este caso, la validacion del input la hace sql directamente convirtiendo todo el input en un string si importar que haya adentro
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosPorOrigen(:origen, :id_usuario)', 
            { replacements: { origen, id_usuario } }
        ); 
        return ingresos[0]; 
    }

    devolverIngresosPorFechaMayorA = async (fecha, id_usuario) => {
        console.log(`devolverIngresosPorFechaMayorA(${fecha}) - ingresos.model.js`);
        // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosPorFechaMayorA(:fecha, :id_usuario)', 
            { replacements: { fecha, id_usuario } }
        );
        return ingresos[0]; 
    }

    devolverIngresosPorFechaMenorA = async (fecha, id_usuario) => { 
        console.log(`devolverIngresosPorFechaMenorA(${fecha}) - ingresos.model.js`);
        // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosPorFechaMenorA(:fecha, :id_usuario)', 
            { replacements: { fecha, id_usuario } }
        );
        return ingresos[0]; 
    }

    crearIngreso = async (origen, cantidad, fecha, id_usuario) => {
        console.log("crearIngreso - ingresos.model.js"); // TODO: Validar el tipo de los parametros aca o en el front o en ambas
        await sequelize.query(
            `SELECT agregarUnIngreso(:origen, :cantidad, :fecha, :id_usuario)`,
            { replacements: { origen, cantidad, fecha, id_usuario } }
        );
    }

    borrarIngreso = async (id, id_usuario) => {
        console.log("borrarIngreso - ingresos.model.js");
        await sequelize.query(
            `SELECT borrarIngreso(:id, :id_usuario)`,
            { replacements: { id, id_usuario } }
        );
    }
}

module.exports = new IngresosModel();