import React from 'react';
import { useState } from 'react';

import CrearGastoForm from './components/common/Gastos/formCrearGasto';
import CrearGraficoGastos from './components/common/Gastos/crearGraficoGastos';

import CrearIngresosForm from './components/common/Ingresos/formCrearIngreso';
import CrearGraficoIngresos from './components/common/Ingresos/crearGraficoIngresos';

import MostrarGetTablas from './components/common/FiltrosYGraficos/mostrarGetTablas';
import ElementosOperacionesElegidas from './components/layout/elementosOperacionesElegidas';
import './App.css';




function App() {

    const [operacionSeleccionadaGastos, setOperacionSeleccionadaGastos] = useState("");
    const [elementosOperacionActualGastos, setElementosOperacionActualGastos] = useState([])
    const [crearFormAgregarGasto, setCrearFormGastos] = useState(false)
    const [datosGastos, setDatosGastos] = useState([])

    const [operacionSeleccionadaIngreso, setOperacionSeleccionadaIngresos] = useState("");
    const [elementosOperacionActualIngreso, setElementosOperacionActualIngresos] = useState([])
    const [crearFormAgregarIngreso, setCrearFormIngresos] = useState(false)
    const [datosIngresos, setDatosIngresos] = useState([])

    const [mostrarTablaGastos, setMostrarTablaGastos] = useState(false)
    const [mostrarTablaIngresos, setMostrarTablaIngresos] = useState(false)

    const[datosGraficasGastos, setDatosGraficasGastos] = useState([])
    const[datosGraficasIngresos, setDatosGraficasIngresos] = useState([])

    const [mostrarGraficaGastos, setMostrarGraficosGastos] = useState(false)
    const [mostrarGraficaIngresos, setMostrarGraficosIngresos] = useState(false)

    const botonesFiltrosGastos = [
        { titulo: "Volver", valor: ""},
        { titulo: "Mostrar gastos", valor: "Todos los gastos", route: "/"},
        { titulo: "Filtrar mayores a X", valor: "Gastos mayores a una cantidad", inputType: "Number", inputLabel: "Ingresa una cantidad", inputPlaceholder: "Ej: 3000", route: "mayorA"},
        { titulo: "Filtrar menores a X", valor: "Gastos menores a una cantidad", inputType: "Number", inputLabel: "Ingresa una cantidad", inputPlaceholder: "Ej: 3000",  route: "menorA" },
        { titulo: "Gastos antes de X", valor: "Gastos antes de una fecha", inputType: "Date", inputLabel: "Elige una fecha", route: "fechaMenorA"},
        { titulo: "Gastos después de X", valor: "Gastos después de una fecha", inputType: "Date", inputLabel: "Elige una fecha", route: "fechaMayorA"},
    ];

    const botonesGraficosGastos = [
        { titulo: "Gastos por categoria", valor: "Gastos agrupados por categoria", route: "agrupadosPorCategoria", esGrafico: true},
        { titulo: "Gastos por mes", valor: "Gastos agrupados por mes", route: "agrupadosPorMes",  inputType: "number", inputLabel: "Ingresa un anio", esGrafico: true}
    ]

    const botonesFiltrosIngresos = [
        { titulo: "Volver", valor: ""},
        { titulo: "Mostrar ingresos", valor: "Todos los ingresos", route: "/"},
        { titulo: "Filtrar mayores a X", valor: "Ingresos mayores a una cantidad", inputType: "Number", inputLabel: "Ingresa una cantidad", inputPlaceholder: "Ej: 3000", route: "mayorA"},
        { titulo: "Filtrar menores a X", valor: "Ingresos menores a una cantidad", inputType: "Number", inputLabel: "Ingresa una cantidad", inputPlaceholder: "Ej: 3000",  route: "menorA" },
        { titulo: "Ingresos antes de X", valor: "Ingresos antes de una fecha", inputType: "Date", inputLabel: "Elige una fecha", route: "fechaMenorA"},
        { titulo: "Ingresos después de X", valor: "Ingresos después de una fecha", inputType: "Date", inputLabel: "Elige una fecha", route: "fechaMayorA"},
    ];

    const botonesGraficosIngresos = [
        { titulo: "Ingresos por origen", valor: "Ingresos agrupados por origen", route: "agrupadosPorOrigen", esGrafico: true},
        { titulo: "Ingresos por mes", valor: "Ingresos agrupados por mes", route: "agrupadosPorMes",  inputType: "number", inputLabel: "Ingresa un anio", esGrafico: true}
    ]

    return (
        <>
            <div className="App">
                <h1>Administrador de gastos</h1>
                <div>{/* TODO: Faltaria agregar un codigo que haga que cuando se selecciona un nuevo set de operaciones (Crear, filtros, graficos) entonces el titulo y el boton de submit de el form anterior se desaparezca porque actualmente ocurre que cuando hacemos una operacion y luego cambiamos de set de operaciones, el titulo y el boton submit dela operacion anterior del otro set sigue estando ahi y queda feo :(*/}
                    <button onClick={ () => {setElementosOperacionActualGastos(botonesFiltrosGastos), setCrearFormGastos(false), setMostrarGraficosGastos(false), setMostrarTablaGastos(false)}}>Filtros</button> {/* Cuando se elige una operacion que no sea crear entonces tenemos que poner el estado crearFormAgregarGasto en false para que el if statement de abajo ejecute el segundo codigo */}
                    <button onClick={ () => {setElementosOperacionActualGastos(botonesGraficosGastos), setCrearFormGastos(false), setMostrarGraficosGastos(false), setMostrarTablaGastos(false)}}>Graficos</button> {/*Cuando el usuario toca un boton para poder elegir otro set de operaciones (Filtros, graficos o crear) entonces de debe dejar de mostrar, si es que se renderizaron, la tabla o el grafico que se haya renderizado abajo */}
                    <button onClick={ () => {setCrearFormGastos(true), setMostrarGraficosGastos(false), setMostrarTablaGastos(false)}}>Crear</button>
                </div>
                    {crearFormAgregarGasto ? ( /*Si crear gasto es true entonces el usuario toco el boton de Crear por lo cual vamos a renderizar el form, sino se presiono cualquiera de las otras dos opciones*/
                        <CrearGastoForm setMostrarTabla={setMostrarTablaGastos} setMostrarGrafico={setMostrarGraficosGastos}/> 
                    ) : (
                        <ElementosOperacionesElegidas botones={elementosOperacionActualGastos} setOperacionSeleccionada={setOperacionSeleccionadaGastos} setDatos={setDatosGastos} entidad={"gastos"} setMostrarTabla={setMostrarTablaGastos} setMostrarGrafico={setMostrarGraficosGastos} setDatosGrafico={setDatosGraficasGastos}/>
                    )}
                    {mostrarTablaGastos ? <MostrarGetTablas datos={datosGastos} setDatos={setDatosGastos} entidad={"gastos"}/> : <></>} {/* Si no se hace click en un boton para ejecutar alguna operacion para retornar datos entonces el estado va a ser falso y no se va a renderizar la tabla */}
                    {console.log("DATOS GRAFICO EN APP.JS", datosGraficasGastos)}
                    {mostrarGraficaGastos ? <CrearGraficoGastos setMostrarTabla={setMostrarTablaGastos} setMostrarGrafico={setMostrarGraficosGastos} datosGrafico={datosGraficasGastos}></CrearGraficoGastos> : <></>}
            </div>
            <div className="App">
                <h1>Administrador de ingresos</h1>
                <div>
                    <button onClick={ () => {setElementosOperacionActualIngresos(botonesFiltrosIngresos), setCrearFormIngresos(false)}}>Filtros</button> {/* Cuando se elige una operacion que no sea crear entonces tenemos que poner el estado crearFormAgregarGasto en false para que el if statement de abajo ejecute el segundo codigo */}
                    <button onClick={ () => {setElementosOperacionActualIngresos(botonesGraficosIngresos), setCrearFormIngresos(false)}}>Graficos</button> {/*Cuando el usuario toca un boton para poder elegir otro set de operaciones (Filtros, graficos o crear) entonces de debe dejar de mostrar, si es que se renderizaron, la tabla o el grafico que se haya renderizado abajo */}
                    <button onClick={ () => {setCrearFormIngresos(true), setMostrarGraficosIngresos(false), setMostrarTablaIngresos(false)}}>Crear</button>
                </div>
                    {crearFormAgregarIngreso ? ( /*Si crear gasto es true entonces el usuario toco el boton de Crear por lo cual vamos a renderizar el form, sino se presiono cualquiera de las otras dos opciones*/
                        <CrearIngresosForm setMostrarTabla={setMostrarTablaIngresos} setMostrarGrafico={setMostrarGraficosIngresos}/> 
                    ) : (
                        <ElementosOperacionesElegidas botones={elementosOperacionActualIngreso} setOperacionSeleccionada={setOperacionSeleccionadaIngresos} setDatos={setDatosIngresos} entidad={"ingresos"} setMostrarTabla={setMostrarTablaIngresos} setMostrarGrafico={setMostrarGraficosIngresos} setDatosGrafico={setDatosGraficasIngresos}/>
                    )}
                    {mostrarTablaIngresos ? <MostrarGetTablas datos={datosIngresos} setDatos={setDatosIngresos} entidad={"ingresos"}/> : <></>} {/* Si no se hace click en un boton para ejecutar alguna operacion para retornar datos entonces el estado va a ser falso y no se va a renderizar la tabla */}
                    {console.log("DATOS GRAFICO EN APP.JS", datosGraficasIngresos)}
                    {mostrarGraficaIngresos ? <CrearGraficoIngresos setMostrarTabla={setMostrarTablaIngresos} setMostrarGrafico={setMostrarGraficosIngresos} datosGrafico={datosGraficasIngresos}></CrearGraficoIngresos> : <></>}
            </div>
        </>
    );
}

export default App;
