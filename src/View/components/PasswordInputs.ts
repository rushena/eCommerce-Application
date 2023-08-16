// Password must be at least 8 characters long.
// Password must contain at least one uppercase letter (A-Z).
// Password must contain at least one lowercase letter (a-z).
// Password must contain at least one digit (0-9).
// (Optional) Password must contain at least one special character (e.g., !@#$%^&*).
// Password must not contain leading or trailing whitespace.

function showError(password1:HTMLInputElement, password1Error:HTMLSpanElement) {
  if (password1.validity.valueMissing) {
    password1Error.textContent = "Please, enter your password";
  } else if (password1.validity.patternMismatch) {
    console.log('1')
    password1Error.textContent = "Password must be minimum 8 characters long and contain at least one number, one lowercase and one uppercase characters with no whitespace";
  }
 }

 function togglePasswordVisibility(eyeImage: HTMLImageElement, passwordInput:HTMLInputElement){
  eyeImage.addEventListener('click',() => {
    if(!passwordInput.classList.contains('show')){
      passwordInput.setAttribute('type', 'text'); 
    } else {
      passwordInput.setAttribute('type', 'password');
    }
    passwordInput.classList.toggle('show'); 
  })
 }

export function setPasswordValidityListener(number: 1|2){

  const form = document.querySelector('.form') as HTMLFormElement;
  const password = document.querySelector(`.password${number}`) as HTMLInputElement;
  const passwordError = document.querySelector(`.password${number} ~ span.validation-message`) as HTMLSpanElement;
  

  password.addEventListener('blur', () => {
    if(password.value.split(' ').length === 1){
      if (password.validity.valid) {
        passwordError.textContent = '';
      } else {
        showError(password, passwordError);
      }
    } else {
      showError(password, passwordError);
    }
  });

  form.addEventListener('submit', (event)=> {
    if (!password.validity.valid) {
      showError(password, passwordError);
      event.preventDefault();
    }
  });
}

export function setPasswordVisibility(number: 1|2){
  const eye = document.querySelector(`.password${number} + img`) as HTMLImageElement;
  const password = document.querySelector(`.password${number}`) as HTMLInputElement;

  togglePasswordVisibility(eye, password);
}