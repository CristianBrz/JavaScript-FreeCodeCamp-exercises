// Función para calcular la media de un array de números
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

// Función para calcular la mediana de un array de números
const getMedian = (array) => {
  // Ordenar el array de forma ascendente
  const sorted = array.slice().sort((a, b) => a - b);
  // Calcular la mediana dependiendo de si la longitud del array es par o impar
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];
  return median;
}

// Función para calcular la moda de un array de números
const getMode = (array) => {
  // Objeto para almacenar las frecuencias de cada número
  const counts = {};
  // Calcular las frecuencias de cada número en el array
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  // Comprobar si todos los números tienen la misma frecuencia
  if (new Set(Object.values(counts)).size === 1) {
    return null; // Si es así, no hay moda
  }
  // Encontrar el número con la frecuencia más alta
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  // Filtrar los números que tienen la misma frecuencia que el más alto
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", "); // Devolver los números que tienen la moda
}

// Función para calcular el rango de un array de números
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

// Función para calcular la varianza de un array de números
const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

// Función para calcular la desviación estándar de un array de números
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

// Función principal para calcular todas las estadísticas
const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  // Mostrar los resultados en la interfaz de usuario
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}
