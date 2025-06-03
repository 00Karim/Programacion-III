const { Paciente } = require('../sqlite/entities/paciente.entity.js');

// SE CONTROLA SI EXISTE UN PACIENTE CON UN DNI EN EL CONTROLADOR, ACA NO

class PacientesModel {

    getPacientes = () => {
        console.log("ENTRE AL GET PACIENTES");
        const pacientes = Paciente.findAll();
	    return pacientes;
    } 

    encontrarPorDni = async (dni) => {
        try {
            const paciente = await Paciente.findOne({
            where: { dni: dni }
        });
        return paciente;
        } 
        catch (error) {
            console.log('Error al buscar paciente:', error.message);
            throw error;
        }
    };

    borrarPaciente = async (dni) => {
        try {
            await Paciente.destroy({
                where: { dni }
            });

            return { mensaje: `Paciente con DNI ${dni} eliminado correctamente.` };
        } 
        catch (error) {
            console.log('Error al eliminar el paciente:', error.message);
            throw error;
        }
        };

    crearPaciente = async (dni, nombre, email) => {
        try {
            const nuevoPaciente = await Paciente.create({
                dni,
                nombre,
                email
            });
            return nuevoPaciente;
        } 
        catch (error) {
            console.log('Error al crear paciente:', error.message);
            throw error;
        }
    }; 

    actualizarNombre = async (dni, nuevoNombre) => {
        try {
            const paciente = await Paciente.findOne({ where: { dni } });

            paciente.nombre = nuevoNombre;
            await paciente.save();

            console.log('Nombre actualizado correctamente.');
            return paciente;
        } 
        catch (error) {
            console.log('Error al actualizar el nombre: ', error.message);
            throw error;
        }
    }

    actualizarEmail = async (dni, nuevoEmail) => {
        try {
            const paciente = await Paciente.findOne({ where: { dni } });

            paciente.email = nuevoEmail;
            await paciente.save();

            console.log('Email actualizado correctamente.');
            return paciente;
        } 
        catch (error) {
            console.log('Error al actualizar el Email: ', error.message);
            throw error;
        }
    }
}


module.exports = new PacientesModel();