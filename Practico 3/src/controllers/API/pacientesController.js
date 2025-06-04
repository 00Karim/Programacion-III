const pacientesModel = require('./../../models/sqlite/paciente.model.js')

class PacientesController {

    async renderizar(req, res){
        const turnos = [{nombre: "Juan Pérez", doctor: "Dra. González", fecha: "08/06/2025"}]
        const pacientes = [{nombre: "Juan Pérez", dni: "16789867", email: "prueba@mail.com"}] // TODO: Esto despues va a ser inncesario ya que se van a mostrar los turnos solo cuando el usuario lo pida, esto es solo para ver como se ve la tabla, despues hay que borrarlo
        res.render('index3', {
            turnos,
            pacientes,
            title: 'Buscador de turnos',
            message: 'Buscador de turnos' ,
            showFeatures: true,
            features: [
                'Busca tus turnos por dni o por nombre' ,
                'Mira la hora de tu consulta',
                'Mira que doctor te va a atender'
            ]
        });
    }

    async mostrarTodos(req, res) {
        console.log("Entre a mostrar todos en pacientesController");
        res.status(200).json(await pacientesModel.getPacientes());
    } 
    
    async mostrarPorDni(req, res){

        const dni = req.params.dni

        try {
            const paciente = await pacientesModel.encontrarPorDni(dni);
        
            if (!paciente) {
              return res.status(404).json({ error: 'Paciente no encontrado' });
            }
            res.status(200).json(paciente);
        } 
        catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async borrarPaciente(req, res) {
        const dni = req.params.dni;

        try {
            const paciente = await pacientesModel.encontrarPorDni(dni);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente no encontrado' });
            }

            await pacientesModel.borrarPaciente(dni);
            res.status(200).json({ message: "Paciente eliminado correctamente" });
            
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async crearPaciente(req, res) {
        const { dni, nombre, email } = req.body;

        try {
            const existente = await pacientesModel.encontrarPorDni(dni);
            if (existente) {
                return res.status(400).json({ error: "Ya existe un paciente con ese DNI" });
            }

            await pacientesModel.crearPaciente(dni, nombre, email);
            res.status(201).json({ message: "Paciente creado correctamente" });

        } catch (error) {
            console.error("Error al crear paciente:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async actualizarMailONombre(req, res) { // Solo se cambian los atributos si se encuentran dentro del body de la request 
        const {nuevoNombre = null, nuevoEmail = null} = req.body 
        const dni = req.params.dni

        try {
            const paciente = await pacientesModel.encontrarPorDni(dni);
        
            if (!paciente) {
              return res.status(404).json({ error: 'Paciente no encontrado' });
            }

            if (!nuevoNombre && !nuevoEmail) {
            return res.status(400).json({ error: 'No se enviaron datos para actualizar' });
            }

            if (nuevoNombre) {
            await pacientesModel.actualizarNombre(dni, nuevoNombre);
            }

            if (nuevoEmail) {
            await pacientesModel.actualizarEmail(dni, nuevoEmail);
            }

            res.status(200).json({ message: 'Datos actualizados correctamente' });
        } 
        catch (error) {
            console.error('Error al actualizar paciente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    } 
}

module.exports = new PacientesController();




