const { Turno } = require('../sqlite/entities/turno.entity.js');

// SE CONTROLA SI EXISTE UN PACIENTE CON UN DNI EN EL CONTROLADOR, ACA NO

class TurnosModel {
                
        encontrarPorDni = async (dni) => {
            try {
                const turno = await Turno.findOne({
                where: { dni: dni }
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
        }; // TODO: Hacer el TRY CATCH
        
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