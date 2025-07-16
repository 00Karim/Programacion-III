const { Gastos, sequelize } = require('./index')

class GastosModel {

    devolverGastos = async (id_usuario) => {
        console.log("devolverGastos() - gastos.model.js");
        const gastos = Gastos.findAll({where: { id_usuario }});
        return gastos;
    }

    devolverGastosAgrupadosPorMes = async (anio, id_usuario) => {
        console.log("devolverGastosAgrupadosPorMes - gastos.model.js");
        const gastos = await sequelize.query(
            `SELECT * FROM devolverGastosAgrupadosPorMes(:anio, :id_usuario)`,
            { replacements: { anio, id_usuario } }
        )
        return gastos[0]; // Le ponemos el 0 porque el query de arriba devuelve un array con mas arrays adentro, el primer array es el que tiene los objetos y los siguientes tienen metadata que no nos interesa, por eso solo retornamos el primer array
    }

    devolverGastosAgrupadosPorCategoria = async (id_usuario) => {
        console.log("devolverGastosAgrupadosPorCategoria - gastos.model.js");
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosAgrupadosPorCategoria(:id_usuario)',
            { replacements: { id_usuario } }
        )
        return gastos[0];
    }

    devolverGastosMayoresA = async (cantidad, id_usuario) => {
        console.log(`devolverGastosMayoresA(${cantidad}) - gastos.model.js`);
        const gastos = await sequelize.query(
            `SELECT * FROM devolverGastosMayoresA(:cantidad, :id_usuario)`,
            { replacements: { cantidad, id_usuario }}
        ); // Nos aseguramos que cantidad sea un int si o si en el front asi no se pueden hacer inyecciones de sql
        return gastos[0]; 
    }

    devolverGastosMenoresA = async (cantidad, id_usuario) => {
        console.log(`devolverGastosMenoresA(${cantidad}) - gastos.model.js`);
        const gastos = await sequelize.query(
            `SELECT * FROM devolverGastosMenoresA(:cantidad, :id_usuario)`,
            { replacements: { cantidad, id_usuario }}
        ); // En el frontos aseguramos que cantidad sea un int si o si asi no se pueden hacer inyecciones de sql
        return gastos[0]; 
    }

    devolverGastosPorCategoria = async (categoria, id_usuario) => {
        console.log(`devolverGastosPorCategoria(${categoria}) - gastos.model.js`);
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosPorCategoria(:categoria, :id_usuario)', // En este caso, la validacion del input la hace sql directamente convirtiendo todo el input en un string si importar que haya adentro
            {replacements: { categoria, id_usuario }}
        ); 
        return gastos[0]; 
    }

    devolverGastosPorFechaMayorA = async (fecha, id_usuario) => {
        console.log(`devolverGastosPorFechaMayorA(${fecha}) - gastos.model.js`);
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosPorFechaMayorA(:fecha, :id_usuario)', // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
            {replacements: { fecha, id_usuario }}
        );
        return gastos[0]; 
    }

    devolverGastosPorFechaMenorA = async (fecha, id_usuario) => { 
        console.log(`devolverGastosPorFechaMenorA(${fecha}) - gastos.model.js`);
        const gastos = await sequelize.query(
            'SELECT * FROM devolverGastosPorFechaMenorA(:fecha, :id_usuario)', // La fecha la recibimos como un string y luego la manejamos correspondientemente en el procedimiento sql
            {replacements: { fecha, id_usuario}}
        );
        return gastos[0]; 
    }

    crearGasto = async (categoria, cantidad, fecha, id_usuario) => {
        console.log("crearGasto - gastos.model.js"); 
        await sequelize.query(
            `SELECT agregarUnGasto(:categoria, :cantidad, :fecha, :id_usuario)`,
            { replacements: {categoria, cantidad, fecha, id_usuario} }
        )
    }

    borrarGasto = async (id, id_usuario) => {
        console.log("borrarGasto - gastos.model.js");
        await sequelize.query(
            `SELECT borrarGasto(:id, :id_usuario)`,
            { replacements: { id, id_usuario } }
        )
    }
}


module.exports = new GastosModel()