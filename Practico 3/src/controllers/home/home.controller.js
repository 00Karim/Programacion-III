const home = async (req, res) => {
    const turnos = [{nombre: "Juan Pérez", doctor: "Dra. González", fecha: "08/06/2025"}]
    res.render('index', { 
        turnos,
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

module.exports = {
   home
}



