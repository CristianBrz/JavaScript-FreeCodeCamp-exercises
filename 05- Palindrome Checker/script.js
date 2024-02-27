const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

const cleanStringInput = (str) => {
  const regex = /[a-z\d]/gi;
  return str.match(regex).join("").toLowerCase();
};

const renderResult = (str, bool) => {
  result.classList.remove("hidden");
  result.innerHTML = `<p> <strong>${str}</strong> is ${
    bool ? "" : "not"
  } a palindrome</p>`;
};

const isPalindrome = (e) => {
  e.preventDefault();
  const textImput = document.getElementById("text-input");

  if (textImput.value !== "") {
    const cleanString = cleanStringInput(textImput.value);
    const inverseString = cleanString.split("").reverse().join("");

    renderResult(textImput.value, cleanString === inverseString);
  } else {
    alert("Please input a value");
  }
};

checkBtn.addEventListener("click", isPalindrome);
