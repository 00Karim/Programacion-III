import { useState, useEffect } from "react"
import CrearBotonOperacionSeleccionada from "../common/FiltrosYGraficos/botonOperacionSeleccionada"
import CrearFormFiltro from "../common/FiltrosYGraficos/formFiltroSeleccionado"


function ElementosOperacionesElegidas({ botones, setOperacionSeleccionada, setDatos, entidad, setMostrarTabla, setMostrarGrafico, setDatosGrafico}){
    const [formProps, setFormProps] = useState(false) // creamos este estado para pasar los props de cada boton al componente crearFormFiltro

    useEffect(() => { // Siempre que cambie la operacion elegida va a desaparecer la tabla o el grafico que este abajo y los botones de las posibles operaciones de cada seccion (crear, graficos o filtros)
        if(formProps){
            setMostrarTabla(false);
            setMostrarGrafico(false);
        }
    }, [formProps]);
    
    return (
        <>
            {botones.map((boton) => ( 
                <CrearBotonOperacionSeleccionada
                    key={boton.valor}
                    titulo={boton.titulo}
                    operacionSeleccionada={boton.valor}
                    setOperacionSeleccionada={setOperacionSeleccionada}
                    mostrarFormulario={() => setFormProps(boton)} // Esta funcion es puesta dentro del onclick del boton creado entonces cuando el usuario lo clickea se le asigna el array de datos del form a la variable formProps por lo que se cumple la condicion de abajo, por lo que se crea y muestra el form
                    esGrafico={boton.esGrafico}
                /> 
            ))}
            {formProps && ( // Se cumple la condicion cuando el usuario clickeo el boton creado arriba
                <CrearFormFiltro 
                    key={`${entidad}-${formProps.inputLabel}`} // Le damos esta key al form porque sino cuando cambiamos el form a veces se guarda el input al form siguiente y da errores porque hacemos operaciones como mostrar gastos con parametros como el anio y al no existir un path con esas caracteristicas nos da error 404 y se cae todo por alguna razon 
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


