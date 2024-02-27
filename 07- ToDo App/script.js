// Seleccionar elementos del DOM
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Obtener datos de localStorage o inicializar un arreglo vacío si no hay datos
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {}; // Objeto para almacenar la tarea actualmente en edición o creación

// Función para añadir o actualizar una tarea
const addOrUpdateTask = () => {
  // Cambiar el texto del botón según si se está añadiendo o actualizando una tarea
  addOrUpdateTaskBtn.innerText = "Add Task";

  // Encontrar el índice en el arreglo de datos de la tarea actual
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  // Crear un objeto que representa la tarea con los valores de los inputs del formulario
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // Añadir la tarea al inicio del arreglo si es una tarea nueva, o actualizarla si ya existe
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  // Guardar los datos actualizados en localStorage
  localStorage.setItem("data", JSON.stringify(taskData));

  // Actualizar la visualización de las tareas en el contenedor
  updateTaskContainer();

  // Limpiar los inputs del formulario y reiniciar el objeto de tarea actual
  reset();
};

// Función para actualizar la visualización de las tareas en el contenedor
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  // Iterar sobre el arreglo de datos y generar el HTML para cada tarea
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `;
  });
};

// Función para eliminar una tarea
const deleteTask = (buttonEl) => {
  // Encontrar el índice en el arreglo de datos de la tarea que se va a eliminar
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Eliminar la tarea del arreglo y del DOM
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData)); // Actualizar los datos en localStorage
};

// Función para editar una tarea
const editTask = (buttonEl) => {
  // Encontrar el índice en el arreglo de datos de la tarea que se va a editar
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // Establecer la tarea actual en la tarea seleccionada
  currentTask = taskData[dataArrIndex];

  // Llenar los inputs del formulario con los datos de la tarea seleccionada
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  // Cambiar el texto del botón a "Update Task" para indicar que se está actualizando una tarea
  addOrUpdateTaskBtn.innerText = "Update Task";

  // Mostrar el formulario de tarea
  taskForm.classList.toggle("hidden");
};

// Función para limpiar los inputs del formulario y reiniciar el objeto de tarea actual
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden"); // Ocultar el formulario
  currentTask = {}; // Reiniciar el objeto de tarea actual
};

// Si hay tareas en el arreglo de datos, actualizar la visualización del contenedor
if (taskData.length) {
  updateTaskContainer();
}

// Agregar listeners para los eventos de abrir y cerrar el formulario de tarea
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  // Verificar si hay valores en los inputs y si han sido modificados
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  // Mostrar un diálogo de confirmación si hay valores y han sido modificados
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset(); // Si no hay cambios, limpiar el formulario
  }
});

// Listener para el botón de cancelar el cierre del formulario
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Listener para el botón de descartar cambios y cerrar el formulario
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close(); // Cerrar el diálogo de confirmación
  reset(); // Limpiar el formulario
});

// Listener para el evento de envío del formulario
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar el envío del formulario

  addOrUpdateTask(); // Añadir o actualizar la tarea
});
