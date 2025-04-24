const botonAplicarJS = document.querySelector(".container-button button");
const botonOriginal = botonAplicarJS.innerText;

let activado = false;
botonAplicarJS.addEventListener("click", () => {
    if (!activado){
        activado = true;
        
        //ACA VAN LOS CAMBIOS QUE SE APLICAN CON JS

        botonAplicarJS.innerText = "Sacar JS";
    }
    else{
        activado = false;
        
        // ACA SE DEVUELVE A LA NORMALIDAD

        botonAplicarJS.innerText = botonOriginal;
    }
})