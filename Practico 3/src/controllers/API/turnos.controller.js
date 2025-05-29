const turnosModel = require('./../../models/mock/turnos.models.js')
const Turno = require('./../../models/mock/entities/turno.entity.js')
class PacientesController {
    async list(req, res) {
        
        res.status(200).json(await pacientesModel.list());
    }
    async create(req, res) {
        const {fecha,dni} = req.body;

        const nuevoTurno = new Turno(fecha,dni);

        const info = await turnosModel.create(nuevoPaciente);
        res.status(200).json(info);
    }
    delete(req, res) {
        const id = req.params.id;
        pacientesModel.delete(id);
        res.status(200).json({message:"elemento eliminado"})
    }
    update(req, res) {
        const id = req.params.id;
         const {dni,nombre,apellido,email} = req.body;
          const nuevoPaciente = new Paciente(dni,nombre,apellido,email);
          pacientesModel.update(id,nuevoPaciente);
        res.status(200).json({message:"actualizado"});
    }
}

module.exports = new PacientesController();