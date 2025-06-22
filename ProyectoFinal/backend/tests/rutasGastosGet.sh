#!/bin/bash

URL_BASE="http://localhost:3001/api/gastos"

while true; do
    echo -e "\e[36m
╔═════════════════════════════════════════════╗
║             ELEGÍ UN TEST A EJECUTAR        ║
╠═════════════════════════════════════════════╣
║  1 - Devolver todos los gastos              ║
║  2 - Devolver gastos mayores a una cantidad ║
║  3 - Devolver gastos menores a una cantidad ║
║  4 - Devolver gastos por categoría          ║
║  5 - Devolver gastos por fecha mayor a      ║
║  6 - Devolver gastos por fecha menor a      ║
║  7 - Devolver gastos agrupados por mes      ║
║  8 - Devolver gastos agrupados por categoria║
║  0 - Salir                                  ║
╚═════════════════════════════════════════════╝
\e[0m"

    echo -ne "\e[1;32mIngresa el número de tu opción: \e[0m"
    read -r eleccion

case $eleccion in
    1)
        echo -e "\e[35m\nTest: Devuelve todos los gastos\e[0m"
        curl -s "$URL_BASE/" | jq
        ;;
    2)
        echo -ne "Ingresa la cantidad: "
        read -r cantidad
        echo -e "\e[35m\nTest: Gastos mayores a $cantidad\e[0m"
        curl -s "$URL_BASE/mayorA/$cantidad" | jq
        ;;
    3)
        echo -ne "Ingresa la cantidad: "
        read -r cantidad
        echo -e "\e[35m\nTest: Gastos menores a $cantidad\e[0m"
        curl -s "$URL_BASE/menorA/$cantidad" | jq
        ;;
    4)
        echo -ne "Ingresa la categoría: "
        read -r categoria
        echo -e "\e[35m\nTest: Gastos por categoría '$categoria'\e[0m"
        curl -s "$URL_BASE/porCategoria/$categoria" | jq
        ;;
    5)
        echo -ne "Ingresa la fecha (YYYY-MM-DD): "
        read -r fecha
        echo -e "\e[35m\nTest: Gastos con fecha mayor a $fecha\e[0m"
        curl -s "$URL_BASE/fechaMayorA/$fecha" | jq
        ;;
    6)
        echo -ne "Ingresa la fecha (YYYY-MM-DD): "
        read -r fecha
        echo -e "\e[35m\nTest: Gastos con fecha menor a $fecha\e[0m"
        curl -s "$URL_BASE/fechaMenorA/$fecha" | jq
        ;;
    7)
        echo -ne "Ingresa el anio: "
        read -r anio
        echo -e "\e[35m\nTest: Gastos agrupados por meses de un anio especifico\e[0m"
        curl -s "$URL_BASE/agrupadosPorMes/$anio" | jq
        ;;
    8)
        echo -e "\e[35m\nTest: Gastos agrupados por categorias\e[0m"
        curl -s "$URL_BASE/agrupadosPorCategoria" | jq
        ;;
    0)
        echo -e "\n\e[33mSaliste del tester\e[0m"
        break
        ;;
    *)
        echo -e "\e[31mOpción inválida. Por favor, intentá de nuevo.\e[0m"
        ;;
    esac

    echo -e "\n\e[34mToca enter para elegir otro test...\e[0m"
    read -r
    clear
done