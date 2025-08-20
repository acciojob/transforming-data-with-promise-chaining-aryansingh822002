//your JS code here. If required.

document.getElementById("btn").addEventListener("click", function () {
  const inputVal = parseFloat(document.getElementById("ip").value);
  const outputDiv = document.getElementById("output");

  if (isNaN(inputVal)) {
    outputDiv.textContent = "Please enter a valid number.";
    return;
  }

  // Utility function: returns a promise that resolves after delay
  function delayedOperation(value, delay, transformFn, isFinal = false) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = transformFn(value);
        outputDiv.textContent = (isFinal ? "Final Result: " : "Result: ") + result;
        resolve(result);
      }, delay);
    });
  }

  // Start promise chain
  new Promise((resolve) => {
    // Initial promise with 2s delay, just return the input value
    setTimeout(() => {
      outputDiv.textContent = "Result: " + inputVal;
      resolve(inputVal);
    }, 2000);
  })
    // Multiply by 2 (after 2s)
    .then((val) => delayedOperation(val, 2000, (x) => x * 2))
    // Subtract 3 (after 1s)
    .then((val) => delayedOperation(val, 1000, (x) => x - 3))
    // Divide by 2 (after 1s)
    .then((val) => delayedOperation(val, 1000, (x) => x / 2))
    // Add 10 (after 1s) → Final Result
    .then((val) => delayedOperation(val, 1000, (x) => x + 10, true));
});
