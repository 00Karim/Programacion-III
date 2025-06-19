const {Router} = require('express');
const rutaGastos = Router();
const GastosController = require('../controllers/gastos.controller')

rutaGastos.get('/', GastosController.devolverTodos)

module.exports = rutaGastos

