const username = document.querySelector("#username");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const email = document.querySelector("#email");

const resetBtn = document.querySelector(".clear");
const sendBtn = document.querySelector(".send");
const popup = document.querySelector(".popup");

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value == "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const checkMail = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, "Email nie jest poprawny");
  }
};

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");

  errorMsg.textContent = msg;
  formBox.classList.add("error");
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    let label = input.previousElementSibling.innerText;
    showError(input, `${label.split(":")[0]} składa się z min ${min} znaków.`);
  }
};

const checkPass = () => {
  if (password.value !== password2.value) {
    showError(password2, "Hasła są różne");
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });

  if (errorCount == 0) {
    popup.classList.add("show-popup");
  }
};

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  [username, password, password2, email].forEach((el) => {
    el.value = "";
    clearError(el);
  });
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkForm([username, password, password2, email]);
  checkLength(username, 4);
  checkLength(password, 8);
  checkPass();
  checkMail(email);
  checkErrors();
});
