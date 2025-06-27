import React from 'react';
import MostrarGetTablas from './components/common/mostrarGetTablas';
import CrearGastoForm from './components/common/formCrearGasto';
import ElementosOperacionesElegidas from './components/common/elementosOperacionesElegidas';
import './App.css';

import { useState } from 'react';

function App() {

    const [operacionSeleccionada, setOperacionSeleccionada] = useState("");
    const [elementosOperacionActual, setElementosOperacionActual] = useState([])
    const [crearFormAgregarGasto, setCrearForm] = useState(false)
    const [datosGastos, setDatosGastos] = useState([])

    const botonesFiltros = [
        { titulo: "Volver", valor: ""},
        { titulo: "Mostrar gastos", valor: "Todos los gastos", route: "/"},
        { titulo: "Filtrar mayores a X", valor: "Gastos mayores a una cantidad", inputType: "Number", inputLabel: "Ingresa una cantidad", inputPlaceholder: "Ej: 3000", route: "mayorA"},
        { titulo: "Filtrar menores a X", valor: "Gastos menores a una cantidad", inputType: "Number", inputLabel: "Ingresa una cantidad", inputPlaceholder: "Ej: 3000",  route: "menorA" },
        { titulo: "Gastos antes de X", valor: "Gastos antes de una fecha", inputType: "Date", inputLabel: "Elige una fecha", route: "fechaMenorA"},
        { titulo: "Gastos después de X", valor: "Gastos después de una fecha", inputType: "Date", inputLabel: "Elige una fecha", route: "fechaMayorA"},
    ];

    const botonesGraficos = [
        { titulo: "Gastos por categoria", valor: "Gastos agrupados por categoria"},
        { titulo: "Gastos por mes", valor: "Gastos agrupados por mes"}
    ]


    return (
        <div className="App">
            <h1>Administrador de gastos</h1>
            <div>
                <button onClick={ () => {setElementosOperacionActual(botonesFiltros), setCrearForm(false)}}>Filtros</button> {/* Cuando se elige una operacion que no sea crear entonces tenemos que poner el estado crearFormAgregarGasto en false para que el if statement de abajo ejecute el segundo codigo */}
                <button onClick={ () => {setElementosOperacionActual(botonesGraficos), setCrearForm(false)}}>Graficos</button>
                <button onClick={ () => {setCrearForm(true)}}>Crear</button>
            </div>
                {crearFormAgregarGasto ? ( /*Si crear gasto es true entonces el usuario toco el boton de Crear por lo cual vamos a renderizar el form, sino se presiono cualquiera de las otras dos opciones*/
                    <CrearGastoForm /> 
                ) : (
                    <ElementosOperacionesElegidas botones={elementosOperacionActual} setOperacionSeleccionada={setOperacionSeleccionada} setDatosGastos={setDatosGastos}/>
                )}
                <MostrarGetTablas operacionSeleccionada={operacionSeleccionada} datosGastos={datosGastos} setDatosGastos={setDatosGastos}/>
        </div>
    );
}

export default App;
