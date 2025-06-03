const turnosModel = require('./../../models/sqlite/turnos.model.js')

class turnosController {

    async devolverTodosLosTurnos(req, res){
        const turnos = await turnosModel.devolverTodosLosTurnos();
        if (!turnos) {
            return res.status(404).json({ error: 'Turnos no encontrados' });
        }
        res.status(200).json(turnos);
    }

    async buscarPorDni(req, res){
        const dni = req.params.dni
        const turno = await turnosModel.encontrarPorDni(dni);
        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }
        res.status(200).json(turno);
    }

    async buscarPorId(req, res){
        const id = req.params.id
        const turno = await turnosModel.encontrarPorId(id);
        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }
        res.status(200).json(turno);
    }

    async eliminarTurno(req, res){
        const id = req.params.id
        turnosModel.borrarTurno(id)
        res.status(200).json({message:"Turno eliminado"}) // TODO: Hacer try catch para que si no existe el turno entonces no se intente eliminar
    } 

    async agregarTurno(req, res){
        const {fecha, dni, doctor} = req.body
        turnosModel.crearTurno(fecha, dni, doctor)
        res.status(201).json({message:"Turno creado correctamente"})
    } // TODO: Agregar codigo para chequear si ya existe un turno con ese doctor en esa fecha. O si el dni no es de un paciente de la clinica (osea ese dni no matchea con el de un paciente en la base de datos clinica).
}

// No me parecio necesario agregar el actualizar un turno ya que directamente podes borrar un turno y hacer uno nuevo y ya esta.

module.exports = new turnosController();