const home = async (req, res) => {
    turnos = []
    res.render('index', { 
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



