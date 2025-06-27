import React, { useState } from "react";

function CrearFormFiltro({inputType, inputLabel, inputPlaceholder, route, setDatosGastos}){
    
    const [valorInput, setValorInput] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const respuestaFetch = await fetch(`/api/gastos/${route}/${valorInput}`);
            const gastos = await respuestaFetch.json();
            console.log(gastos);
            setDatosGastos(Array.isArray(gastos) ? gastos : []);
        } catch (error) {
            console.error("Error en el fetch:", error);
        }
        
    }

    return (
        
        <form onSubmit={
            (e) => {
                handleSubmit(e)
            }          
        }
        style={{ marginTop: '20px' }}>
            <div>
                <label>{inputLabel}:</label>
                <input
                    type={inputType}
                    onChange={(e) => setValorInput(e.target.value)}
                    placeholder={inputPlaceholder}
                />
            </div>
            <button type="submit">Ver gastos</button>
        </form>
    )
}

export default CrearFormFiltro;