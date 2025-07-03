import React, { useState } from "react";

function CrearFormFiltro({inputType, inputLabel, inputPlaceholder, route, setDatos, entidad, setMostrarTabla, setMostrarGrafico}){
    
    const [valorInput, setValorInput] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const respuestaFetch = await fetch(`/api/${entidad}/${route}/${valorInput}`);
            const datos = await respuestaFetch.json();
            console.log(datos);
            setDatos(Array.isArray(datos) ? datos : []);
        } catch (error) {
            console.error("Error en el fetch:", error);
        }
        setMostrarGrafico(false)
        setMostrarTabla(true)
    }

    return (
        
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
    )
}

export default CrearFormFiltro;