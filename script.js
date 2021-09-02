const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.querySelector(".clear-button");

let firstValue = 0;
let operatorValue = "";
let operatorPressed = false;

function sendNumberValue(number) {
  if (operatorPressed) {
    calculatorDisplay.textContent = number;
    operatorPressed = false;
  } else {
    const displayedValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayedValue === "0" ? number : displayedValue + number;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  // Do nothing if operator was already pressed
  if (operatorValue && operatorPressed) {
    operatorValue = operator;
    return;
  }

  // First numeric value
  if (!firstValue) firstValue = currentValue;
  // Second numeric value
  else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    firstValue = calculation;
    calculatorDisplay.textContent = calculation;
  }

  operatorPressed = true;
  operatorValue = operator;
}

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function resetCalculator() {
  firstValue = 0;
  operatorValue = "";
  operatorPressed = false;
  calculatorDisplay.textContent = "0";
}

function addDecimal() {
  // Do nothing if operator was already pressed
  if (operatorPressed) return;
  // First decimal
  if (!calculatorDisplay.textContent.includes(".")) calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}

// Event listeners
inputButtons.forEach((button) => {
  // Numbered buttons
  if (button.classList.length === 0) button.addEventListener("click", () => sendNumberValue(button.value));
  // Operator buttons
  else if (button.classList.contains("operator")) button.addEventListener("click", () => useOperator(button.value));
  // Decimal buttons
  else if (button.classList.contains("decimal")) button.addEventListener("click", addDecimal);
});
clearButton.addEventListener("click", resetCalculator);
