import { useState } from "react"
import CrearBotonOperacionSeleccionada from "../common/Filtros/botonOperacionSeleccionada"
import CrearFormFiltro from "../common/Filtros/formFiltroSeleccionado"


function ElementosOperacionesElegidas({ botones, setOperacionSeleccionada, setDatos, entidad, setMostrarTabla, setMostrarGrafico, setDatosGrafico}){
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
                    setMostrarTabla={setMostrarTabla} // Usamoas esta variable para hacer desaparecer la tabla cuando se clickea nuevamente un boton para seleccionar una operacion, asi no nos ocurre lo siguiente: se muestra un titulo con una tabla abajo que tiene los datos de una operacion usada antes entonces el titulo y los datos de la tabla no cuadran
                    setMostrarGrafico={setMostrarGrafico} // Lo mismo de arriba
                    esGrafico={boton.esGrafico}
                /> 
            ))}
            {formProps && ( // Se cumple la condicion cuando el usuario clickeo el boton creado arriba
                <CrearFormFiltro 
                    inputType={formProps.inputType}
                    inputLabel={formProps.inputLabel}
                    inputPlaceholder={formProps.inputPlaceholder}
                    route={formProps.route}
                    setDatos={setDatos}
                    entidad={entidad}
                    setMostrarTabla={setMostrarTabla}
                    setMostrarGrafico={setMostrarGrafico}
                    tituloTabla={formProps.valor}
                    esGrafico={formProps.esGrafico}
                    setDatosGrafico={setDatosGrafico}
                />
            )}
        </>
    )
}

export default ElementosOperacionesElegidas;


