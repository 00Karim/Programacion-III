import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

function CrearGraficoGastos({ setMostrarTabla, setMostrarGrafico, datosGrafico }) {
    const chartRef = useRef(null);
    const colores = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#00C49F", "#FF4444", "#0099CC", "#FF66CC"];
    const meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    useEffect(() => {
        if (!datosGrafico || datosGrafico.length === 0) return; // si datos graficos no tiene nada adentro entonces no ejecutamos el codigo de abajo porque todas las lineas en las que se intenta acceder a algun atributo dentro de un elemento en el array datos da error

        setMostrarTabla(false);
        setMostrarGrafico(true);

        const labels = []
        const data = []
        const coloresFondo = []
        let x = 0
        let posColor = 0

        const esPorCategoria = !!datosGrafico[0].categoria; // esta constante la vamos a usar para poder crear el grafico dinamicamente dependiendo de cual de los dos se piden (por categoria o por mes)

        for (let i = 0; i < datosGrafico.length; i++) {
            const dato = datosGrafico[i];
            if (esPorCategoria) {
                labels.push(dato.categoria);
            } 
            else {
                labels.push(meses[dato.mes]);
            }
            data.push(parseFloat(dato.total_gastos));
            coloresFondo.push(colores[posColor]);
            posColor += 1;
            if (posColor > 9){
                posColor = 0
            }
        }

        const ctx = chartRef.current.getContext('2d');

        const chart = new Chart(ctx, {
            type: esPorCategoria ? 'pie' : 'bar', // si el grafico es el de categoria entonces usamos un pie graph y sino un gafico de barras
            data: {
                labels,
                datasets: [{
                    label: esPorCategoria ? 'Gastos por categoría' : 'Gastos por origen',
                    data,
                    backgroundColor: coloresFondo,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
            },
        });


        return () => {
            chart.destroy();
        };
    }, [datosGrafico, setMostrarTabla, setMostrarGrafico]);

        if (!datosGrafico || datosGrafico.length === 0) {
            return (
                <h2 style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
                    ❌ Error: datos no encontrados
                </h2>
            );
        }

        return (
            <canvas ref={chartRef} style={{ width: '100%', maxWidth: '700px' }} />
        );
}

export default CrearGraficoGastos;