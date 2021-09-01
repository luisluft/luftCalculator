const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clear-button");

function sendNumberValue(number) {
  const displayedValue = calculatorDisplay.textContent;

  calculatorDisplay.textContent = displayedValue === "0" ? number : displayedValue + number;
}

// Event listeners
inputButtons.forEach((button) => {
  // Numbered buttons
  if (button.classList.length === 0) button.addEventListener("click", () => sendNumberValue(button.value));
  // Operator buttons
  else if (button.classList.contains("operator")) button.addEventListener("click", () => sendNumberValue(button.value));
  // Decimal buttons
  else if (button.classList.contains("decimal")) button.addEventListener("click", () => sendNumberValue(button.value));
});
