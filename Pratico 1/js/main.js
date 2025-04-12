const formulario1 = document.querySelector(".formulario1")
const formulario2 = document.querySelector(".formulario2")
const formulario3 = document.querySelector(".formulario3")
const formulario4 = document.querySelector(".formulario4")
const formulario5 = document.querySelector(".formulario5")
const formulario6 = document.querySelector(".formulario6")
const formularios = [formulario1, formulario2, formulario3, formulario4, formulario5, formulario6]

function cambio_de_formulario(formulario_actual){
    switch(formulario_actual){ // Se le va a agregar el estilo "display: none;" a todos los formularios y luego se le va a sacar ese estilo al formulario elegido asi es el unico visible
        case 1:
            formularios.forEach(esconderFormulario)
            formulario1.style.removeProperty("display")
            break;
        case 2:
            formularios.forEach(esconderFormulario)
            formulario2.style.removeProperty("display")
            break;
        case 3:
            formularios.forEach(esconderFormulario)
            formulario3.style.removeProperty("display")
            break;
        case 4:
            formularios.forEach(esconderFormulario)
            formulario4.style.removeProperty("display")
            break;
        case 5:
            formularios.forEach(esconderFormulario)
            formulario5.style.removeProperty("display")
            break;
        case 6:
            formularios.forEach(esconderFormulario)
            formulario6.style.removeProperty("display")
            break;
    }
}

function esconderFormulario(formulario){
    formulario.style.display = "none"; // Modificamos el estilo display dentro del tag html del formulario elegido asi no se muestra el formulario en la pagina
}

const servicio_seleccionado = new URLSearchParams(window.location.search); //Extraemos el string enviado desde servicios.html
const form_correspondiente = servicio_seleccionado.get("form"); //Extraemos solo la parte que nos interesa (el numero del formulario)
const numero_form = parseInt(form_correspondiente); //Lo convertimos en int para que funcione el switch statement
cambio_de_formulario(numero_form) //Llamamos a la funcion con el valor correspondiente

document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Formulario enviado correctamente");
    });
  });

// formulario1.style.display = "none";
// formulario2.style.removeProperty("display")