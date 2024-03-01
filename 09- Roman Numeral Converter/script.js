const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output')

const err = [
  'Please enter a valid number',
  'Please enter a number greater than or equal to 1',
  'Please enter a number less than or equal to 3999'
];

const renderResult = (str) => {
  output.classList.remove("hidden");
  output.innerHTML = `<p><strong class="roman-font">${str}</strong></p>`;
}

// Verificar si se proporciona un número válido
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    return err[0];
  }

  if (inputInt < 1) {
    return err[1];
  }

  if (inputInt > 3999) {
    return err[2];
  }

  return inputInt;
};


const decimalToRoman = decimalNumber => {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  for (let key in romanNumerals) {
    if (decimalNumber >= romanNumerals[key]) {
      return key + decimalToRoman(decimalNumber - romanNumerals[key]);
    }
  }

  return '';
}

convertBtn.addEventListener('click', e => {
  e.preventDefault();
  const response = checkUserInput()
  typeof (response) === "number" ? renderResult(decimalToRoman(response)) : renderResult(response)
});
