const gastosModel = require('../models/gastos.model')
const GastosModel = require('../models/gastos.model')

// TODO: Borrar todos los console.log

class GastosController{
    
    async devolverTodos(req, res){
        console.log("devolverTodos - gastos.controller.js")
        res.status(200).json(await GastosModel.devolverGastos())
    }

    async devolverAgrupadosMes(req, res){
        console.log("devolverAgrupadosMes - gastos.controller.js")
        const { anio } = req.params
        res.status(200).json(await GastosModel.devolverGastosAgrupadosPorMes(anio))
    }

    async devolverAgrupadosCategoria(req, res){
        console.log("devolverAgrupadosCategoria - gastos.controller.js");
        res.status(200).json(await GastosModel.devolverGastosAgrupadosPorCategoria())
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

    async crearGasto(req, res){
        console.log("crearGasto - gastos.controller.js");
        const { categoria, cantidad, fecha } = req.body
        res.status(200).json(await GastosModel.crearGasto(categoria, cantidad, fecha))
    }

    async borrarGasto(req, res){
        console.log("borrarGasto - gastos.controller.js");
        const { id } = req.params
        res.status(200).json(await gastosModel.borrarGasto(id))
    }

}

module.exports = new GastosController()