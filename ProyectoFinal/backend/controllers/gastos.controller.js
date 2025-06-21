const GastosModel = require('../models/gastos.model')

class GastosController{
    
    async devolverTodos(req, res){
        console.log("devolverTodos - gastos.controller.js")
        res.status(200).json(await GastosModel.devolverGastos())
    }

    async devolverMayoresA(req, res){
        console.log("devolverMayoresA - gastos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad) // Hay que convertir cantidad a numero porque los parameters de la request siempre se envian en forma de string
        res.status(200).json(await GastosModel.devolverGastosMayoresA(cantidadNumero))
    }

    async devolverMenoresA(req, res){
        console.log("devolverMenoresA - gastos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad) // Hay que convertir cantidad a numero porque los parameters de la request siempre se envian en forma de string
        res.status(200).json(await GastosModel.devolverGastosMenoresA(cantidadNumero))
    }

    async devolverPorCategoria(req, res){
        console.log("devolverPorCategoria - gastos.controller.js" );
        const { categoria } = req.params
        res.status(200).json(await GastosModel.devolverGastosPorCategoria(categoria)) 
    }

    async devolverFechaMayorA(req, res){
        console.log("devolverFechaMayorA - gastos.controller.js")
        const { fecha } = req.params
        res.status(200).json(await GastosModel.devolverGastosPorFechaMayorA(fecha))
    }

    async devolverFechaMenorA(req, res){
        console.log("devolverFechaMenorA - gastos.controller.js")
        const { fecha } = req.params
        res.status(200).json(await GastosModel.devolverGastosPorFechaMenorA(fecha))
    }

}

module.exports = new GastosController()