const botonAplicarJS = document.querySelector(".container-button button");
const botonOriginal = botonAplicarJS.innerText;

const parrafos = document.getElementsByClassName("parrafo");

const itemsLista = document.querySelectorAll("ul li");

const titulo = document.getElementById("tituloPrincipal");
const tituloOriginal = titulo.innerText;


let activado = false;
botonAplicarJS.addEventListener("click", () => {
    if (!activado){
        activado = true;
        titulo.innerText = "Titulo cambiado con JS";
        Array.from(parrafos).forEach(p => {
            p.style.color = "blue";
        });
        Array.from(itemsLista).forEach(li => {
            li.innerText = "Item de lista";           
        });

        botonAplicarJS.innerText = "Sacar JS";
    }
    else{
        activado = false;
        titulo.innerText = tituloOriginal;
        Array.from(parrafos).forEach(p => {
            p.style.color = "";
        });
        Array.from(itemsLista).forEach(li => {
            li.innerText = "";
        });

        botonAplicarJS.innerText = botonOriginal;
    }
})
