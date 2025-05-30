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

        encontrarPorNombre = async (nombre) => {
            try {
                const turno = await Turno.findOne({
                where: { nombre: nombre }
            });
            return turno;
            } 
            catch (error) {
                console.log('Error al buscar el turno:', error.message);
                throw error;
            }
        };
        
        borrarTurno = async (dni) => {
            
            };
        
        crearTurno = async (dni, fecha, nombre, doctor) => {
            
        };

        actualizarFecha = async (dni, nuevaFecha) => {
            
        }

        actualizarDoctor = async (dni, nuevoDoctor) => {
            
        }
            
}

module.exports = new TurnosModel();