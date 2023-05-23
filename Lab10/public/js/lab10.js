function validateStringInput(strVal, varName) {
  if (!strVal) {
    throw `Error: You must supply a ${varName}!`;
  }
  if (typeof strVal !== "string") {
    throw `Error: ${varName} must be a string!`;
  }
  strVal = strVal.trim();
  if (strVal.length === 0) {
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  }
  if (!isNaN(strVal)) {
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  }
  return strVal;
}

function validateEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw `Must have format as example@example.com`;
  }
  const email = email.toLowerCase();
  return email;
}

function validatePassword(password) {
  if (!password || password.length < 8 || password.includes(" ")) {
    throw `Password must be at least 8 characters long and cannot contain empty spaces.`;
  }
  const toUpper = /[A-Z]/;
  const toNumber = /[0-9]/;
  const toSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (
    !toUpper.test(password) ||
    !toNumber.test(password) ||
    !toSpecialChar.test(password)
  ) {
    throw `Password must contain at least one uppercase character, one number, and one special character.`;
  }
  return password;
}

function validateName(name, varName) {
  let checkName = /^[a-zA-Z]/; // Regular expression to match valid firstName
  if (name.length < 2 || name.length > 25) {
    throw `Name should be in length between 2 to 25.`;
  }
  if (!checkName.test(name)) {
    throw `Invalid ${varName} name.`;
  }
  return name;
}

function validateRole(role) {
  role = role.toLowerCase();
  if (role !== "admin" && role !== "user") {
    throw `Role must be either 'admin' or 'user'`;
  }
  return role;
}

let registration_form = document.getElementById("registration-form");
let login_form = document.getElementById("login-form");

if (registration_form) {
  let firstName = document.getElementById("firstNameInput");
  let lastName = document.getElementById("lastNameInput");
  let email = document.getElementById("emailInput");
  let password = document.getElementById("passwordInput");
  let confirmPass = document.getElementById("confirmPasswordInput");
  let role = document.getElementById("roleInput");
  let error = document.getElementById("error");

  error.classList.remove("error");

  registration_form.addEventListener("submit", function (event) {
    event.preventDefault();
    let firstnameValue = firstName.value;
    let lastNameValue = lastName.value;
    let emailValue = email.value;
    let passwordValue = password.value;
    let confirmPassValue = confirmPass.value;
    let roleValue = role.value;

    try {
      firstnameValue = validateStringInput(firstnameValue, "first name");
      firstnameValue = validateName(firstnameValue, "fname");
      lastNameValue = validateStringInput(lastNameValue, "laste name");
      lastNameValue = validateName(lastNameValue, "lname");
      emailValue = validateStringInput(emailValue, "email");
      passwordValue = validateStringInput(passwordValue, "pass");
      confirmPassValue = validateStringInput(confirmPassValue, "confirmpass");

      emailValue = validateEmail(emailValue);
      passwordValue = validatePassword(passwordValue);
      confirmPassValue = validateName(confirmPassValue);
      roleValue = validateRole(roleValue);
      registration_form.submit();
    } catch (e) {
      error.classList.add("error");
      error.hidden = false;
      console.log(e);
    }
  });
}
