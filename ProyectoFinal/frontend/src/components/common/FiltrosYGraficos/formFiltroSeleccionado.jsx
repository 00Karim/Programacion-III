import React, { useState } from "react";

function CrearFormFiltro({inputType, inputLabel, inputPlaceholder, route, setDatos, entidad, setMostrarTabla, setMostrarGrafico, tituloTabla, esGrafico, setDatosGrafico, token}){
    
    const [valorInput, setValorInput] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!valorInput && route != "/"){ // cuando la ruta es / no hay input, asi que hay que agregar la segunda condicion para que funcione la opcion de mostrar los gastos o ingresos sin ningun filtro
            alert("Error, ingresa un valor!")
        }
        else{
            try {
                const respuestaFetch = await fetch(`/api/${entidad}/${route}/${valorInput}`, 
                    {
                        headers: 
                            {
                                'Authorization': `Bearer: ${token}`
                            }
                    }
                );
                const datos = await respuestaFetch.json();
                console.log(datos);
                setDatos(Array.isArray(datos) ? datos : []);
            } catch (error) {
                console.error("Error en el fetch:", error);
            }
            setMostrarGrafico(false) // Se deja de mostrar el grafico y se muestra la tabla
            setMostrarTabla(true)
        }
    }

    const handleSubmitGrafico = async(e) => {
        e.preventDefault();
        if (!valorInput && !["/", "agrupadosPorOrigen", "agrupadosPorCategoria"].includes(route)) { // cuando la ruta es "/" o "agrupadosPorOrigen" o "agrupadosPorCategoria" no hay input, asi que hay que agregar la segunda condicion para que funcione la opcion de mostrar el grafico de gastos o ingresos por categoria u origen
            alert("Error, ingresa un valor!")
        }
        else{
            try {
                const respuestaFetch = await fetch(`/api/${entidad}/${route}/${valorInput}`,
                    {
                        headers: 
                            {
                                'Authorization': `Bearer: ${token}`
                            }
                    }
                );
                const datos = await respuestaFetch.json();
                console.log("DATOS GRAFICO EN FORMFILTRO: ", datos);
                setDatosGrafico(Array.isArray(datos) ? datos : [])
            } catch (error) {
                console.error("Error en el fetch:", error);
            }
            setMostrarGrafico(true) // Se deja de mostrar la tabla y se muestra el grafico. Esto desencadena la creacion de el grafico porque termina siendo true en App.js que es la condicion necesaria para que se renderize el grafico
            setMostrarTabla(false)
        }
    }
    // TODO: IMPORTANTE: VALIDAR EL INPUT DEL USUARIO PARA QUE NO PUEDA INGRESAR VALORES VACIOS O INVALIDOS!!!!!!!!!!!!
    if (!esGrafico){
        return (
            <>    
                <h1>{tituloTabla}</h1>
                <form onSubmit={
                    (e) => {
                        handleSubmit(e)
                    }          
                }
                style={{ marginTop: '20px' }}>
                    {inputLabel ?             
                    <div>
                        <label>{inputLabel}:</label> 
                        <input
                            type={inputType}
                            onChange={(e) => setValorInput(e.target.value)}
                            placeholder={inputPlaceholder}
                        />
                    </div>
                    :
                    <></>
                    }
                    <button type="submit">{`Ver ${entidad}`}</button> 
                </form>
            </>
        )
    }
    else{
        return (
            <>
                <h1>{tituloTabla}</h1>
                <form onSubmit={
                    (e) => {
                        handleSubmitGrafico(e)
                    }          
                }
                style={{ marginTop: '20px' }}>
                    {inputLabel ?             
                    <div>
                        <label>{inputLabel}:</label>
                        <input
                            type={inputType}
                            onChange={(e) => setValorInput(e.target.value)}
                            placeholder={inputPlaceholder}
                        />
                    </div>
                    :
                    <></>
                    }
                    <button type="submit">{`Ver ${entidad}`}</button> 
                </form>
            </>
        )

    }
}

export default CrearFormFiltro;