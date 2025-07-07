const { Router } = require('express')
const rutaIngresos = Router()
const ingresosController = require('../controllers/ingresos.controller')
const verificarToken = require('../middleware/verificarToken')

rutaIngresos.use(verificarToken) // de esta manera hacemos que si se quiere usar alguna de las rutas de ingresos entonces si o si se va a pasar por la verificacion de token antes


rutaIngresos.get('/', ingresosController.devolverTodos)
rutaIngresos.get('/agrupadosPorOrigen', ingresosController.devolverAgrupadosCategoria)
rutaIngresos.get('/mayorA/:cantidad', ingresosController.devolverMayoresA)
rutaIngresos.get('/menorA/:cantidad', ingresosController.devolverMenoresA)
rutaIngresos.get('/porOrigen/:origen', ingresosController.devolverPorOrigen) 
rutaIngresos.get('/fechaMayorA/:fecha', ingresosController.devolverFechaMayorA)
rutaIngresos.get('/fechaMenorA/:fecha', ingresosController.devolverFechaMenorA)

rutaIngresos.post('/', ingresosController.crearIngreso)

rutaIngresos.delete('/:id', ingresosController.borrarIngreso)

module.exports = rutaIngresos;