import React from "react";

function CrearFormFiltro({inputType, inputLabel, inputPlaceholder, inputOnChange, route}){
    
    const handleSubmit = async(e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={
            (e) => {
                // TODO: Aca adentro tiene que ir el fetch usando el prop route
            }          
        }
        style={{ marginTop: '20px' }}>
            <div>
                <label>{inputLabel}:</label>
                <input
                    type={inputType}
                    onChange={inputOnChange}
                    placeholder={inputPlaceholder}
                />
            </div>
            <button type="submit">Ver gastos</button>
        </form>
    )
}

export default CrearFormFiltro;