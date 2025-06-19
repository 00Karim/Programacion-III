const GastosModel = require('../models/gastos.model')

class GastosController{
    
    async devolverTodos(req, res){
        console.log("devolverTodos - gastos.controller.js")
        res.status(200).json(await GastosModel.devolverGastos())
    }

}

module.exports = new GastosController()