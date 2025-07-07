const GastosModel = require('../models/gastos.model')

class GastosController{
    
    async devolverTodos(req, res){
        console.log("devolverTodos - gastos.controller.js")
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastos(id_usuario))
    }

    async devolverAgrupadosMes(req, res){
        console.log("devolverAgrupadosMes - gastos.controller.js")
        const { anio } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosAgrupadosPorMes(anio, id_usuario))
    }

    async devolverAgrupadosCategoria(req, res){
        console.log("devolverAgrupadosCategoria - gastos.controller.js");
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosAgrupadosPorCategoria(id_usuario))
    }

    async devolverMayoresA(req, res){
        console.log("devolverMayoresA - gastos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad)
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosMayoresA(cantidadNumero, id_usuario))
    }

    async devolverMenoresA(req, res){
        console.log("devolverMenoresA - gastos.controller.js")
        const { cantidad } = req.params
        const cantidadNumero = parseInt(cantidad)
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosMenoresA(cantidadNumero, id_usuario))
    }

    async devolverPorCategoria(req, res){
        console.log("devolverPorCategoria - gastos.controller.js" );
        const { categoria } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosPorCategoria(categoria, id_usuario)) 
    }

    async devolverFechaMayorA(req, res){
        console.log("devolverFechaMayorA - gastos.controller.js")
        const { fecha } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosPorFechaMayorA(fecha, id_usuario))
    }

    async devolverFechaMenorA(req, res){
        console.log("devolverFechaMenorA - gastos.controller.js")
        const { fecha } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.devolverGastosPorFechaMenorA(fecha, id_usuario))
    }

    async crearGasto(req, res){
        console.log("crearGasto - gastos.controller.js");
        const { categoria, cantidad, fecha } = req.body
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.crearGasto(categoria, cantidad, fecha, id_usuario))
    }

    async borrarGasto(req, res){
        console.log("borrarGasto - gastos.controller.js");
        const { id } = req.params
        const id_usuario = req.usuario.id_usuario;
        res.status(200).json(await GastosModel.borrarGasto(id, id_usuario))
    }

}

module.exports = new GastosController()