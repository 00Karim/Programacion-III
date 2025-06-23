const { Gastos, sequelize } = require('./index')

class GastosModel {

    devolverGastos = async () => {
        console.log("devolverGastos() - gastos.model.js");
        const gastos = Gastos.findAll();
        return gastos;
    }

    devolverGastosAgrupadosPorMes = async (anio) => {
        console.log("devolverGastosAgrupadosPorMes - gastos.model.js");
        const gastos = await sequelize.query(`SELECT * FROM devolverGastosAgrupadosPorMes(${anio})`)
        return gastos[0]; // Le ponemos el 0 porque el query de arriba devuelve un array con mas arrays adentro, el primer array es el que tiene los objetos y los siguientes tienen metadata que no nos interesa, por eso solo retornamos el primer array
    }

    devolverGastosAgrupadosPorCategoria = async () => {
        console.log("devolverGastosAgrupadosPorCategoria - gastos.model.js");
        const gastos = await sequelize.query('SELECT * FROM devolverGastosAgrupadosPorCategoria()')
        return gastos[0];
    }

    // TODO: Terminar de programar las funciones de abajo y hacer las partes correspondientes necesarias en el controlador y las rutas
    devolverGastosMayoresA = async (cantidad) => {
        console.log(`devolverGastosMayoresA(${cantidad}) - gastos.model.js`);
        const gastos = await sequelize.query(`SELECT * FROM devolverGastosMayoresA(${cantidad})`); // Nos aseguramos que cantidad sea un int si o si en el front asi no se pueden hacer inyecciones de sql
        return gastos[0]; 
    }

    devolverGastosMenoresA = async (cantidad) => {
        console.log(`devolverGastosMenoresA(${cantidad}) - gastos.model.js`);
        const gastos = await sequelize.query(`SELECT * FROM devolverGastosMenoresA(${cantidad})`); // En el frontos aseguramos que cantidad sea un int si o si asi no se pueden hacer inyecciones de sql
        return gastos[0]; 
    }

    devolverGastosPorCategoria = async (categoria) => {
        console.log(`devolverGastosPorCategoria(${categoria}) - gastos.model.js`);
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosPorCategoria(:categoria)', // En este caso, la validacion del input la hace sql directamente convirtiendo todo el input en un string si importar que haya adentro
            {replacements: { categoria }}
        ); 
        return gastos[0]; 
    }

    devolverGastosPorFechaMayorA = async (fecha) => { // TODO: En el front tenemos que usar toISOString().slice(0, 10) en la fecha para que el sql reciba solo el anio,dia y mes sin el horario
        console.log(`devolverGastosPorFechaMayorA(${fecha}) - gastos.model.js`);
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosPorFechaMayorA(:fecha)', // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
            {replacements: { fecha }}
        );
        return gastos[0]; 
    }

    devolverGastosPorFechaMenorA = async (fecha) => { // TODO: En el front tenemos que usar toISOString().slice(0, 10) en la fecha para que el sql reciba solo el anio,dia y mes sin el horario
        console.log(`devolverGastosPorFechaMenorA(${fecha}) - gastos.model.js`);
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosPorFechaMenorA(:fecha)', // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
            {replacements: { fecha }}
        );
        return gastos[0]; 
    }

    crearGasto = async (categoria, cantidad, fecha) => {
        console.log("crearGasto - gastos.model.js"); // TODO: Validar el tipo de los parametros aca o en el front o en ambas
        await sequelize.query(`SELECT agregarUnGasto('${categoria}', ${cantidad}, '${fecha}')`)
    }

    borrarGasto = async (id) => {
        console.log("borrarGasto - gastos.model.js");
        await sequelize.query(`SELECT borrarGasto(${id})`)
    }
}


module.exports = new GastosModel()