import { useState } from "react"
import CrearBotonOperacionSeleccionada from "./botonOperacionSeleccionada"
import CrearFormFiltro from "./formFiltroSeleccionado"


function ElementosOperacionesElegidas({ botones, setOperacionSeleccionada}){
    {console.log("elementosOperacionesElegidas.jsx")}

    const [formProps, setFormProps] = useState(false) // creamos este estado para pasar los props de cada boton al componente crearFormFiltro

    return (
        <>
            {botones.map((boton) => ( 
                <CrearBotonOperacionSeleccionada
                    key={boton.valor}
                    titulo={boton.titulo}
                    operacionSeleccionada={boton.valor}
                    setOperacionSeleccionada={setOperacionSeleccionada}
                    mostrarFormulario={() => setFormProps(boton)} // Esta funcion es puesta dentro del onclick del boton creado entonces cuando el usuario lo clickea se le asigna el array de datos del form a la variable formProps por lo que se cumple la condicion de abajo, por lo que se crea y muestra el form
                /> 
            ))}
            {formProps && ( // Se cumple la condicion cuando el usuario clickeo el boton creado arriba
                <CrearFormFiltro 
                    inputType={formProps.inputType}
                    inputLabel={formProps.inputLabel}
                    inputPlaceholder={formProps.inputPlaceholder}
                    inputOnChange={formProps.inputOnChange}
                    route={formProps.route}
                />
            )}
        </>
    )
}

export default ElementosOperacionesElegidas;


