const turnosModel = require('./../../models/sqlite/turnos.model.js')

class turnosController {
    async buscarPorDni(req, res){
        const dni = req.params.dni
        const turno = await turnosModel.encontrarPorDni(dni);
        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }
        res.status(200).json(turno);
    }

    async eliminarTurno(req, res){
        const id = req.params.id
        turnosModel.borrarTurno(id)
        res.status(200).json({message:"Turno eliminado"})
    } // TODO: Esta funcion va a ser activada por un boton en la pagina que este al lado de la fila que contenga la informacion del turno

    async agregarTurno(req, res){
        const {fecha, dni, doctor} = req.body
        turnosModel.crearTurno(fecha, dni, doctor)
        res.status(201).json({message:"Turno creado correctamente"})
    } // TODO: Agregar codigo para chequear si ya existe un turno con ese doctor en esa fecha. O si el dni no es de un paciente de la clinica.
}

// No me parecio necesario agregar el actualizar un turno ya que directamente podes borrar un turno y hacer uno nuevo y ya esta.

module.exports = new turnosController();