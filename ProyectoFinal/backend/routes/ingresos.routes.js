const { Router } = require('express')
const rutaIngresos = Router()
const ingresosController = require('../controllers/ingresos.controller')

rutaIngresos.get('/', ingresosController.devolverTodos)
rutaIngresos.get('/agrupadosPorMes/:anio', ingresosController.devolverAgrupadosMes)
rutaIngresos.get('/agrupadosPorOrigen', ingresosController.devolverAgrupadosCategoria)
rutaIngresos.get('/mayorA/:cantidad', ingresosController.devolverMayoresA)
rutaIngresos.get('/menorA/:cantidad', ingresosController.devolverMenoresA)
rutaIngresos.get('/porOrigen/:origen', ingresosController.devolverPorOrigen)
rutaIngresos.get('/fechaMayorA/:fecha', ingresosController.devolverFechaMayorA)
rutaIngresos.get('/fechaMenorA/:fecha', ingresosController.devolverFechaMenorA)

rutaIngresos.post('/', ingresosController.crearIngreso)

rutaIngresos.delete('/:id', ingresosController.borrarIngreso)

module.exports = rutaIngresos;