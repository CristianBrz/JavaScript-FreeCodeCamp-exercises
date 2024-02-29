// Selecciona elementos del DOM necesarios
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Datos para la animación
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) retorna "10" + 1 (5 % 2). Luego se retira de la pila.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) retorna "1" + 0 (2 % 2) y se añade a la pila. Luego se retira de la pila.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) retorna "1" (caso base) y se añade a la pila. Luego se retira de la pila.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

// Función para convertir decimal a binario de manera recursiva
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Función para mostrar la animación del proceso de conversión
const showAnimation = () => {
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    // Añadir elementos a la animación con retrasos
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    // Mostrar mensajes de explicación con retrasos
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // Quitar elementos de la animación con retrasos
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // Mostrar el resultado final después de la animación
  setTimeout(() => {
    result.textContent = decimalToBinary(5)
  }, 20000);
};

// Función para verificar la entrada del usuario y ejecutar la conversión
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  // Verificar si se proporciona un número decimal válido
  if (!numberInput.value || isNaN(inputInt)) {
    alert("Por favor, ingresa un número decimal");
    return;
  }

  // Si el número es 5, mostrar animación
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // Mostrar el resultado de la conversión
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

// Agregar listeners de eventos para el botón de conversión y la entrada del usuario
convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
