// Capturo los elementos del DOM
const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

// Expresiones regulares para detectar numeros no validos
// const optionalOne = /^(1\s?)?/; // Coincide con un '1' opcional seguido de un espacio opcional
// const areaCode = /(\(\d{3}\)|\d{3})/; // Coincide con el código de área entre paréntesis o sin ellos
// const separator = /([\s\-]?)/; // Coincide con un espacio o guión opcional después del código de área
// const firstThreeDigits = /\d{3}/; // Coincide con los siguientes 3 dígitos del número
// const lastFourDigits = /\d{4}$/; // Coincide con los últimos 4 dígitos del número

// Regex para numeros invalidos
const validPhoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;
// const validPhoneRegex = /`${optionalOne}${areaCode}${separator}${firstThreeDigits}${separator}${lastFourDigits}`/;

// Función para verificar si un número telefonico es Valido
const isValid = (input) => validPhoneRegex.test(input);

// Evento clic del botón de verificación del número
checkButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Verifico si el campo de entrada de mensaje está vacío
  if (userInput.value === "") {
    alert("Please provide a phone number.");
    return;
  }

  // Compruebo si el mensaje ingresado es considerado como spam o no

  results.innerHTML += `<p>${
    isValid(userInput.value)
      ? `Valid US number: <strong>${userInput.value}</strong>`
      : `Invalid US number: <strong>${userInput.value}</strong>`
  }</p>`;
});

clearButton.addEventListener("click", () => (results.innerHTML = ""));
