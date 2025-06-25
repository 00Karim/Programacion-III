import CrearBotonOperacionSeleccionada from "./botonOperacionSeleccionada"

function ElementosOperacionesElegidas({ botones, setOperacionSeleccionada}){
    {console.log("elementosOperacionesElegidas.jsx")}
    return (
        botones.map(({ titulo, valor }) => (
            <CrearBotonOperacionSeleccionada
                key={valor}
                titulo={titulo}
                operacionSeleccionada={valor}
                setOperacionSeleccionada={setOperacionSeleccionada}
            />
        ))
    )
}

export default ElementosOperacionesElegidas;