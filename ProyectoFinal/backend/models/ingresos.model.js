const { Ingresos, sequelize } = require('./index')

class IngresosModel{
    // TODO: Crear las funciones necesarias (basicamente: copiar lo de ingresos.model.js y cambiar las variables, textos y queries

    devolverIngresos = async () => {
        console.log("devolverIngresos() - ingresos.model.js");
        const ingresos = Ingresos.findAll();
        return ingresos;
    }

    devolverIngresosAgrupadosPorMes = async (anio) => {
        console.log("devolverIngresosAgrupadosPorMes - ingresos.model.js");
        const ingresos = await sequelize.query(`SELECT * FROM devolverIngresosAgrupadosPorMes(${anio})`)
        return ingresos[0]; // Le ponemos el 0 porque el query de arriba devuelve un array con mas arrays adentro, el primer array es el que tiene los objetos y los siguientes tienen metadata que no nos interesa, por eso solo retornamos el primer array
    }

    devolverIngresosAgrupadosPorOrigen = async () => {
        console.log("devolverIngresosAgrupadosPorOrigen - ingresos.model.js");
        const ingresos = await sequelize.query('SELECT * FROM devolverIngresosAgrupadosPorOrigen()')
        return ingresos[0];
    }

    devolverIngresosMayoresA = async (cantidad) => {
        console.log(`devolverIngresosMayoresA(${cantidad}) - ingresos.model.js`);
        const ingresos = await sequelize.query(`SELECT * FROM devolverIngresosMayoresA(${cantidad})`); // Nos aseguramos que cantidad sea un int si o si en el front asi no se pueden hacer inyecciones de sql
        return ingresos[0]; 
    }

    devolverIngresosMenoresA = async (cantidad) => {
        console.log(`devolverIngresosMenoresA(${cantidad}) - ingresos.model.js`);
        const ingresos = await sequelize.query(`SELECT * FROM devolverIngresosMenoresA(${cantidad})`); // En el frontos aseguramos que cantidad sea un int si o si asi no se pueden hacer inyecciones de sql
        return ingresos[0]; 
    }

    devolverIngresosPorOrigen = async (origen) => {
        console.log(`devolverIngresosPorOrigen(${origen}) - ingresos.model.js`);
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosPorOrigen(:origen)', // En este caso, la validacion del input la hace sql directamente convirtiendo todo el input en un string si importar que haya adentro
            {replacements: { origen }}
        ); 
        return ingresos[0]; 
    }

    devolverIngresosPorFechaMayorA = async (fecha) => {
        console.log(`devolverIngresosPorFechaMayorA(${fecha}) - ingresos.model.js`);
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosPorFechaMayorA(:fecha)', // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
            {replacements: { fecha }}
        );
        return ingresos[0]; 
    }

    devolverIngresosPorFechaMenorA = async (fecha) => { 
        console.log(`devolverIngresosPorFechaMenorA(${fecha}) - ingresos.model.js`);
        const ingresos = await sequelize.query(
            'SELECT * FROM devolverIngresosPorFechaMenorA(:fecha)', // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
            {replacements: { fecha }}
        );
        return ingresos[0]; 
    }

    crearIngreso = async (origen, cantidad, fecha) => {
        console.log("crearIngreso - ingresos.model.js"); // TODO: Validar el tipo de los parametros aca o en el front o en ambas
        await sequelize.query(`SELECT agregarUnIngreso('${origen}', '${cantidad}', '${fecha}')`)
    }

    borrarIngreso = async (id) => {
        console.log("borrarIngreso - ingresos.model.js");
        await sequelize.query(`SELECT borrarIngreso(${id})`)
    }
}

module.exports = new IngresosModel()