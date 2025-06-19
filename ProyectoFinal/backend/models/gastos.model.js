const { Gastos } = require('./index')

class GastosModel {

    devolverGastos = async () => {
        console.log("devolverGastos() - gastos.model.js");
        const gastos = Gastos.findAll();
        return gastos;
    }
    // TODO: Terminar de programar las funciones de abajo y hacer las partes correspondientes necesarias en el controlador y las rutas
    devolverGastosMayoresA = async (cantidad) => {
        console.log(`devolverGastosMayoresA(${cantidad}) - gastos.model.js`);
    }

    devolverGastosMenoresA = async (cantidad) => {
        console.log(`devolverGastosMenoresA(${cantidad}) - gastos.model.js`);
    }

    devolverGastosPorCategoria = async (categoria) => {
        console.log(`devolverGastosPorCategoria(${categoria}) - gastos.model.js`);
    }

    devolverGastosPorFecha = async (fecha) => {
        console.log(`devolverGastosPorFecha(${fecha}) - gastos.model.js`);
        
    }
} 

module.exports = new GastosModel()