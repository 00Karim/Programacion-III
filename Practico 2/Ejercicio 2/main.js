const lista = document.getElementById("lista-input");
const botonInput = document.getElementById("botonInput");

botonInput.addEventListener("click", () => {
    let nuevoItemLista = document.createElement("li");
    let nuevoBoton = document.createElement("button");
    let inputUsuario = (document.getElementById("tagInput")).value
    nuevoItemLista.textContent = inputUsuario + " ";
    nuevoBoton.textContent = "Eliminar";
    nuevoBoton.addEventListener("click", () => {
        nuevoItemLista.remove();
    })
    lista.appendChild(nuevoItemLista).appendChild(nuevoBoton);
})