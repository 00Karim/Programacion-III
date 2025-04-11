const formulario1 = document.querySelector(".formulario1")
const formulario2 = document.querySelector(".formulario2")
const formulario3 = document.querySelector(".formulario3")
const formulario4 = document.querySelector(".formulario4")
const formulario5 = document.querySelector(".formulario5")
const formulario6 = document.querySelector(".formulario6")
const formularios = [formulario1, formulario2, formulario3, formulario4, formulario5, formulario6]

function cambio_de_formulario(formulario_actual){
    switch(formulario_actual){
        case 1:
            formularios.forEach(esconderFormulario)
            formulario1.style.removeProperty("display")
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
    }
}

function esconderFormulario(formulario){
    formulario.style.display = "none";
}

// formulario1.style.display = "none";
// formulario2.style.removeProperty("display")