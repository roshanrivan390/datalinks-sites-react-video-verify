function onSubmit(token) {
  form.submit();
}

function showCaptchaBox(event) {
  event.preventDefault();

  hcaptcha.execute();
}

function onLoad() {
  var element = document.getElementById("submit_createad_account_login");

  element.onclick = showCaptchaBox;
}

(function () {
  const emailInput = document.getElementById("input_account_email");
  const passwordInput = document.getElementById("input_account_password");
  const emailError = document.getElementById("email_error");
  const passwordError = document.getElementById("password_error");

  const validateEmail = (ev) => {
    if (!ev.target.value || ev.target.value == null) {
      emailInput.style = "margin:0";
      emailError.style = "display:block";
    } else {
      let isValidEmail = String(ev.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (isValidEmail) {
        emailError.style = "display:none";
      } else {
        emailInput.style = "margin:0";
        emailError.style = "display:block";
      }
    }
  };

  const validatePassword = (ev) => {
    if (!ev.target.value || ev.target.value == null) {
      passwordError.style = "display:block";
    } else {
      passwordError.style = "display:none";
    }
  };

  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("blur", validatePassword);
})();
