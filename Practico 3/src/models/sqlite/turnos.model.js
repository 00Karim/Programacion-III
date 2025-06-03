const { Turno } = require('../sqlite/entities/turno.entity.js');

// SE CONTROLA SI EXISTE UN PACIENTE CON UN DNI EN EL CONTROLADOR, ACA NO

class TurnosModel {

        devolverTodosLosTurnos = async () => {
            try {
                const turno = await Turno.findAll();
            return turno;
            } 
            catch (error) {
                console.log('Error al buscar los turnos:', error.message);
                throw error;
            }
        }
                
        encontrarPorDni = async (dni) => {
            try {
                const turno = await Turno.findAll({
                where: { dni: dni }
            });
            return turno;
            } 
            catch (error) {
                console.log('Error al buscar el turno:', error.message);
                throw error;
            }
        };

        encontrarPorId = async (id) => {
            try {
                const turno = await Turno.findOne({
                where: { id: id }
            });
            return turno;
            } 
            catch (error) {
                console.log('Error al buscar el turno:', error.message);
                throw error;
            }
        };
        
        borrarTurno = async (id) => {
            await Turno.destroy({
                where: { id: id }
            });
        }; 
        
        crearTurno = async (fecha, dni, doctor) => {
            try {
                const nuevoTurno = await Turno.create({
                    fecha,
                    dni,
                    doctor
                });
                return nuevoTurno;
            } 
            catch (error) {
                console.log('Error al crear el turno:', error.message);
                throw error;
            }
        };         
}

module.exports = new TurnosModel();