const tareas = [
    { id: 16, nombre: "Hacer mercado", completada: false},
    { id: 60, nombre: "Estudiar para la prueba", completada: true},
    { id: 24, nombre: "Sacar al perro", completada: false}
];


const listaDeTareas = document.getElementById("ListaTareas");
const btnAgregar = document.querySelector("#btnAgregar");
const inputTarea = document.querySelector("#nuevaTarea");
const totalDeTareas = document.getElementById("totalTareas"); 
const realizadasContador = document.getElementById("tareasRealizadas");


function renderizarTareas() {
    let html = "";

    for (let tarea of tareas) {
        html += `
        <div class="tarea-item">
            <span class="id-stilo">${tarea.id}</span>
            <span class="${tarea.completada ? 'completada': ''}">
            ${tarea.nombre}
            </span>
            <input type="checkbox" ${tarea.completada ? "checked" : ""} 
                onclick="cambiarEstado(${tarea.id})">
            <button class="btn-borrar" onclick="borrarTarea(${tarea.id})"> x </button>
        </div>
        `;
    }

    listaDeTareas.innerHTML = html;
    actualizarContadores();
}


function actualizarContadores() {
    totalDeTareas.textContent = tareas.length;

    const tareasRealizadas = tareas.filter(t => t.completada === true);
    realizadasContador.innerHTML = tareasRealizadas.length;
    }


btnAgregar.addEventListener("click", () => {
    const nombreTarea = inputTarea.value;
    
    if (nombreTarea === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        nombre: nombreTarea,
        completada: false
    };

    tareas.push(nuevaTarea); 
    inputTarea.value = ""; 
    renderizarTareas();
    inputTarea.focus();
});



inputTarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnAgregar.click();
    }
});



function borrarTarea(id) {
    const index = tareas.findIndex((ele) => ele.id === id);
    
    tareas.splice(index, 1);
    
    renderizarTareas();
}


function cambiarEstado(id) {
    const index = tareas.findIndex((ele) => ele.id === id);
    
    tareas[index].completada = !tareas[index].completada;
    
    renderizarTareas();
}


renderizarTareas(); 