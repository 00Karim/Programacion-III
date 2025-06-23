const {Router} = require('express');
const rutaGastos = Router();
const GastosController = require('../controllers/gastos.controller');
const gastosController = require('../controllers/gastos.controller');

rutaGastos.get('/', GastosController.devolverTodos)
rutaGastos.get('/agrupadosPorMes/:anio', GastosController.devolverAgrupadosMes)
rutaGastos.get('/agrupadosPorCategoria', gastosController.devolverAgrupadosCategoria)
rutaGastos.get('/mayorA/:cantidad', gastosController.devolverMayoresA)
rutaGastos.get('/menorA/:cantidad', gastosController.devolverMenoresA)
rutaGastos.get('/porCategoria/:categoria', gastosController.devolverPorCategoria)
rutaGastos.get('/fechaMayorA/:fecha', gastosController.devolverFechaMayorA)
rutaGastos.get('/fechaMenorA/:fecha', gastosController.devolverFechaMenorA)

rutaGastos.put('/', gastosController.crearGasto)

rutaGastos.delete('/:id', gastosController.borrarGasto)
module.exports = rutaGastos

