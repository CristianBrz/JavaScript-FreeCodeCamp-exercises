// Obtenemos los elementos del DOM necesarios
const messageInput = document.getElementById("message-input"); // Input del mensaje
const result = document.getElementById("result"); // Elemento donde se mostrará el resultado
const checkMessageButton = document.getElementById("check-message-btn"); // Botón para verificar el mensaje

// Expresiones regulares para detectar palabras o frases de spam
const helpRegex = /please help|assist me/i; // Frases que piden ayuda
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i; // Cantidades de dinero
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i; // Frases relacionadas con dinero gratis
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i; // Mensajes sobre alertas de acciones
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i; // Frases de "Querido amigo"

// Lista de expresiones regulares para comparar si el mensaje contiene spam
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// Función para verificar si un mensaje es spam
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// Evento clic del botón de verificación de mensaje
checkMessageButton.addEventListener("click", () => {
  // Verificamos si el campo de entrada de mensaje está vacío
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  // Comprobamos si el mensaje ingresado es considerado como spam o no
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = ""; // Limpiamos el campo de entrada de mensaje
});
