import React, { useState } from 'react';

function CrearGastoForm({ agregarABaseDeDatos = null }) {
    console.log("formCrearGasto.jsx");
    
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');

    return (
        <form onSubmit={
            async (e) => {
                e.preventDefault()
                // Con el codigo siguiente guardamos el input del usuario en variables y hacemos el fetch para agregar el gasto a la base de datos
                // TODO: IMPORTANTE: VALIDAR INPUT PARA QUE EL USUARIO NO PUEDA INGRESAR UN VALOR VACIO. SI NO HACEMOS ESTO DA ERROR INTERNO DEL SERVIDOR Y SE CAE TODO
                await fetch('/api/gastos/', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({categoria, cantidad, fecha})})
            
                setCategoria('');
                setCantidad('');
                setFecha('');
            }
        } style={{ marginTop: '20px' }}>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Ej: Comida"
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Ej: 250.00"
                />
            </div>
            <div>
                <label>Fecha:</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </div>
            <button type="submit">Agregar gasto</button>
        </form>
    );
}

export default CrearGastoForm;