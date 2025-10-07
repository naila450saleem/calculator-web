
document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------
     🔹 Mobile Menu Toggle
  ------------------------------ */
  const toggleBtn = document.querySelector(".menu-toggle i");
  const navMenu = document.querySelector("nav ul");

  if (toggleBtn && navMenu) {
    toggleBtn.parentElement.addEventListener("click", () => {
      navMenu.classList.toggle("show");

      // Icon swap (hamburger ↔ close)
      if (navMenu.classList.contains("show")) {
        toggleBtn.classList.remove("fa-bars");
        toggleBtn.classList.add("fa-times");
      } else {
        toggleBtn.classList.remove("fa-times");
        toggleBtn.classList.add("fa-bars");
      }
    });
  }

  /* ------------------------------
     🔹 Active Link Highlight
  ------------------------------ */
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  /* ------------------------------
     🔹 Basic Calculator Logic
  ------------------------------ */
  const display = document.querySelector(".display-input");
  const buttons = document.querySelectorAll(".calc-btn");
  let currentInput = "0";
  let previousInput = "";
  let operation = null;
  let resetScreen = false;

  function updateDisplay() {
    if (display) display.value = currentInput;
  }

  function resetCalc() {
    currentInput = "0";
    previousInput = "";
    operation = null;
    resetScreen = false;
    updateDisplay();
  }

  function inputNumber(number) {
    if (currentInput === "0" || resetScreen) {
      currentInput = number;
      resetScreen = false;
    } else {
      currentInput += number;
    }
  }

  function inputDecimal() {
    if (resetScreen) {
      currentInput = "0.";
      resetScreen = false;
      return;
    }
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
  }

  function handleOperation(nextOperation) {
    const inputValue = parseFloat(currentInput);
    if (operation && !resetScreen) {
      calculate();
    }
    previousInput = currentInput;
    operation = nextOperation;
    resetScreen = true;
  }

  function calculate() {
    let result;
    const prevValue = parseFloat(previousInput);
    const currentValue = parseFloat(currentInput);

    if (isNaN(prevValue) || isNaN(currentValue)) return;

    switch (operation) {
      case "+":
        result = prevValue + currentValue;
        break;
      case "-":
        result = prevValue - currentValue;
        break;
      case "×":
        result = prevValue * currentValue;
        break;
      case "÷":
        if (currentValue === 0) {
          alert("Cannot divide by zero");
          resetCalc();
          return;
        }
        result = prevValue / currentValue;
        break;
      case "%":
        result = prevValue % currentValue;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = "";
    resetScreen = true;
  }

  // Calculator buttons click
  if (buttons.length > 0) {
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        const value = this.textContent;

        if (value >= "0" && value <= "9") {
          inputNumber(value);
        } else if (value === ".") {
          inputDecimal();
        } else if (value === "C") {
          resetCalc();
        } else if (value === "±") {
          currentInput = (parseFloat(currentInput) * -1).toString();
        } else if (value === "=") {
          calculate();
        } else {
          handleOperation(value);
        }
        updateDisplay();
      });
    });
  }
  updateDisplay();

  /* ------------------------------
     🔹 Animations on Page Load
  ------------------------------ */
  document.querySelectorAll(".calc-box").forEach((box, index) => {
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";

    setTimeout(() => {
      box.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      box.style.opacity = "1";
      box.style.transform = "translateY(0)";
    }, index * 100);
  });

  /* ------------------------------
     🔹 Footer Links (Filter Calculators)
  ------------------------------ */
  const footerLinks = document.querySelectorAll(".footer-links-column a[data-category]");
  const calcItems = document.querySelectorAll(".calc-list li");

  if (footerLinks.length > 0 && calcItems.length > 0) {
    footerLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const category = this.getAttribute("data-category");

        calcItems.forEach(item => {
          if (category === "all") {
            item.style.display = "block";
          } else if (item.getAttribute("data-category") === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});
