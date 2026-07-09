const lengthInput = document.getElementById("lengthInput");
const lengthDisplay = document.getElementById("lengthDisplay");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const numbersCheck = document.getElementById("numbersCheck");
const specialCheck = document.getElementById("specialCheck");
const generateBtn = document.getElementById("generateBtn");
const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");
const errorMessage = document.getElementById("errorMessage");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

lengthInput.addEventListener("input", function () {
  lengthDisplay.textContent = lengthInput.value;
});

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const specialChars = "!@#$%^&*()-_=+[]{}";

function generatePassword() {
  errorMessage.textContent = "";

  const length = parseInt(lengthInput.value);
  const useUppercase = uppercaseCheck.checked;
  const useNumbers = numbersCheck.checked;
  const useSpecial = specialCheck.checked;

  let charPool = lowercaseChars;
  if (useUppercase) charPool += uppercaseChars;
  if (useNumbers) charPool += numberChars;
  if (useSpecial) charPool += specialChars;

  if (charPool.length === 0) {
    errorMessage.textContent = "Please select at least one character type.";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }
  passwordOutput.value = password;

  checkStrength(password, useUppercase, useNumbers, useSpecial);
}

function checkStrength(password, useUppercase, useNumbers, useSpecial) {
  let score = 0;


  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  if (useUppercase) score++;
  if (useNumbers) score++;
  if (useSpecial) score++;

  let label = "";
  let color = "";
  let widthPercent = "";

  if (score <= 2) {
    label = "Weak";
    color = "#e74c3c"; // red
    widthPercent = "25%";
  } else if (score <= 4) {
    label = "Medium";
    color = "#f39c12"; // orange
    widthPercent = "60%";
  } else {
    label = "Strong";
    color = "#27ae60"; // green
    widthPercent = "100%";
  }

  
  strengthFill.style.width = widthPercent;
  strengthFill.style.backgroundColor = color;
  strengthText.textContent = "Strength: " + label;
  strengthText.style.color = color;
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", function () {
  if (passwordOutput.value === "") {
    return; 
  }

  navigator.clipboard.writeText(passwordOutput.value).then(function () {
    copyMessage.textContent = "Copied to clipboard!";

    setTimeout(function () {
      copyMessage.textContent = "";
    }, 2000);
  });
});


generatePassword();