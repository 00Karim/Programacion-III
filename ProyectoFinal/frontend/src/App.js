import React from 'react';
import MostrarGetTablas from './components/common/mostrarGetTablas';
import CrearBotonOperacionSeleccionada from './components/common/botonOperacionSeleccionada';
import './App.css';

import { useState } from 'react';

function App() {

    const [operacionSeleccionada, setOperacionSeleccionada] = useState("");

    const botones = [
        { titulo: "Volver", valor: "" },
        { titulo: "Mostrar gastos", valor: "Todos los gastos" },
        { titulo: "Filtrar mayores a X", valor: "Gastos mayores a una cantidad" },
        { titulo: "Filtrar menores a X", valor: "Gastos menores a una cantidad" },
        { titulo: "Gastos antes de X", valor: "Gastos antes de una fecha" },
        { titulo: "Gastos después de X", valor: "Gastos después de una fecha" },
    ];

    return (
        <div className="App">
            {botones.map(({ titulo, valor }) => (
                <CrearBotonOperacionSeleccionada
                    key={valor}
                    titulo={titulo}
                    operacionSeleccionada={valor}
                    setOperacionSeleccionada={setOperacionSeleccionada}
                />
            ))}
            <MostrarGetTablas operacionSeleccionada={operacionSeleccionada} />
        </div>
    );
}

export default App;
