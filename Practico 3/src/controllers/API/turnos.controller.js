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

        try{
            const turno = await turnosModel.encontrarPorId(id);

            if (!turno) {
                return res.status(404).json({ error: "Turno no encontrado" });
            }

            await turnosModel.borrarTurno(id);
            res.status(200).json({message:"Turno eliminado"});
            
        }catch (error) {
        console.error("Error al eliminar el turno:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
        }
    } 

    async agregarTurno(req, res){
        const {fecha, dni, doctor} = req.body

        try {
        const paciente = await pacientesModel.encontrarPorDni(dni);
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }

        const turnoExistente = await turnosModel.buscarTurnoPorDoctorYFecha(doctor, fecha);
        if (turnoExistente) {
            return res.status(400).json({ error: "Ya existe un turno con ese doctor en esa fecha" });
        }

        await turnosModel.crearTurno(fecha, dni, doctor)
        res.status(201).json({message:"Turno creado correctamente"})

        } catch (error) {
        console.error("Error al crear turno:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        }
    } 
}

// No me parecio necesario agregar el actualizar un turno ya que directamente podes borrar un turno y hacer uno nuevo y ya esta.

module.exports = new turnosController();