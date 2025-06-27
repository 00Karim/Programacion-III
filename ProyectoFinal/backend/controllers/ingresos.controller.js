const IngresosModel = require('../models/ingresos.model')

class IngresosController{
    async devolverTodos(req, res){
        console.log("devolverTodos - ingresos.controller.js")
        res.status(200).json(await IngresosModel.devolverIngresos())
    }

    async devolverAgrupadosMes(req, res){
        console.log("devolverAgrupadosMes - ingresos.controller.js")
        const { anio } = req.params
        res.status(200).json(await IngresosModel.devolverIngresosAgrupadosPorMes(anio))
    }

    async devolverAgrupadosCategoria(req, res){
        console.log("devolverAgrupadosCategoria - ingresos.controller.js");
        res.status(200).json(await IngresosModel.devolverIngresosAgrupadosPorCategoria())
    }

    async devolverMayoresA(req, res){
        console.log("devolverMayoresA - ingresos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad) // Hay que convertir cantidad a numero porque los parameters de la request siempre se envian en forma de string
        res.status(200).json(await IngresosModel.devolverIngresosMayoresA(cantidadNumero))
    }

    async devolverMenoresA(req, res){
        console.log("devolverMenoresA - ingresos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad) // Hay que convertir cantidad a numero porque los parameters de la request siempre se envian en forma de string
        res.status(200).json(await IngresosModel.devolverIngresosMenoresA(cantidadNumero))
    }

    async devolverPorOrigen(req, res){
        console.log("devolverPorCategoria - ingresos.controller.js" );
        const { origen } = req.params
        res.status(200).json(await IngresosModel.devolverIngresosPorOrigen(origen)) 
    }

    async devolverFechaMayorA(req, res){
        console.log("devolverFechaMayorA - ingresos.controller.js")
        const { fecha } = req.params
        res.status(200).json(await IngresosModel.devolverIngresosPorFechaMayorA(fecha))
    }

    async devolverFechaMenorA(req, res){
        console.log("devolverFechaMenorA - ingresos.controller.js")
        const { fecha } = req.params
        res.status(200).json(await IngresosModel.devolverIngresosPorFechaMenorA(fecha))
    }

    async crearIngreso(req, res){
        console.log("crearIngreso - ingresos.controller.js");
        const { origen, cantidad, fecha } = req.body
        res.status(200).json(await IngresosModel.crearIngreso(origen, cantidad, fecha))
    }

    async borrarIngreso(req, res){
        console.log("borrarIngreso - ingresos.controller.js");
        const { id } = req.params
        res.status(200).json(await IngresosModel.borrarIngreso(id))
    }
}

module.exports = new IngresosController()
