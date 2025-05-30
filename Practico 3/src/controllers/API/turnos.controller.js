const turnosModel = require('./../../models/sqlite/turnos.model.js')

class turnosController {
    async buscarPorDniONombre(req, res){

        const {dni = null, nombre = null} = req.body

        if(dni){
            const turno = await turnosModel.encontrarPorDni(dni);
            if (!turno) {
                return res.status(404).json({ error: 'Turno no encontrado' });
            }
            res.status(200).json(turno);
        }
        else if(nombre){
            const turno = await turnosModel.encontrarPorNombre(nombre);
            if (!turno) {
                return res.status(404).json({ error: 'Turno no encontrado' });
            }
            res.status(200).json(turno);
        }  
    }
}

module.exports = new turnosController();