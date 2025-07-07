const IngresosModel = require('../models/ingresos.model')

class IngresosController{
    async devolverTodos(req, res){
        console.log("devolverTodos - ingresos.controller.js")
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresos(id_usuario))
    }

    async devolverAgrupadosMes(req, res){
        console.log("devolverAgrupadosMes - ingresos.controller.js")
        const { anio } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosAgrupadosPorMes(anio, id_usuario))
    }

    async devolverAgrupadosCategoria(req, res){
        console.log("devolverAgrupadosCategoria - ingresos.controller.js");
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosAgrupadosPorOrigen(id_usuario))
    }

    async devolverMayoresA(req, res){
        console.log("devolverMayoresA - ingresos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad)
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosMayoresA(cantidadNumero, id_usuario))
    }

    async devolverMenoresA(req, res){
        console.log("devolverMenoresA - ingresos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad)
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosMenoresA(cantidadNumero, id_usuario))
    }

    async devolverPorOrigen(req, res){
        console.log("devolverPorOrigen - ingresos.controller.js" );
        const { origen } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosPorOrigen(origen, id_usuario)) 
    }

    async devolverFechaMayorA(req, res){
        console.log("devolverFechaMayorA - ingresos.controller.js")
        const { fecha } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosPorFechaMayorA(fecha, id_usuario))
    }

    async devolverFechaMenorA(req, res){
        console.log("devolverFechaMenorA - ingresos.controller.js")
        const { fecha } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.devolverIngresosPorFechaMenorA(fecha, id_usuario))
    }

    async crearIngreso(req, res){
        console.log("crearIngreso - ingresos.controller.js");
        const { origen, cantidad, fecha } = req.body
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.crearIngreso(origen, cantidad, fecha, id_usuario))
    }

    async borrarIngreso(req, res){
        console.log("borrarIngreso - ingresos.controller.js");
        const { id } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await IngresosModel.borrarIngreso(id, id_usuario))
    }
}

module.exports = new IngresosController()