// Password must be at least 8 characters long.
// Password must contain at least one uppercase letter (A-Z).
// Password must contain at least one lowercase letter (a-z).
// Password must contain at least one digit (0-9).
// (Optional) Password must contain at least one special character (e.g., !@#$%^&*).
// Password must not contain leading or trailing whitespace.

import { applyStyleToInput } from "./Helpers";

function showError(password1:HTMLInputElement, password1Error:HTMLSpanElement) {
  if (password1.validity.valueMissing) {
    password1Error.textContent = "Please, enter your password";
    applyStyleToInput(password1, 'invalid')
  } else if (password1.validity.patternMismatch) {
    password1Error.textContent = "Password must be minimum 8 characters long and contain at least one number, one lowercase and one uppercase characters with no whitespace";
    applyStyleToInput(password1, 'invalid')
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

export function setPasswordValidityListener(element: HTMLElement){

  const form = element.querySelector('.form') as HTMLFormElement;
  const password = element.querySelector(`.password1`) as HTMLInputElement;
  const passwordError = element.querySelector(`.password1 ~ span.validation-message`) as HTMLSpanElement;
  

  password.addEventListener('blur', () => {
    if(password.value.split(' ').length === 1){
      if (password.validity.valid) {
        passwordError.textContent = '';
        applyStyleToInput(password, 'valid');
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

export function setPasswordVisibility(number: 1|2, element: HTMLElement){
  const eye = element.querySelector(`.password${number} + img`) as HTMLImageElement;
  const password = element.querySelector(`.password${number}`) as HTMLInputElement;

  togglePasswordVisibility(eye, password);
}

export function setPasswordMatchCheck(element: HTMLElement){
  const password1 = element.querySelector(`.password1`) as HTMLInputElement;
  const password2 = element.querySelector(`.password2`) as HTMLInputElement;
  const password2Error = element.querySelector(`.password2 ~ span.validation-message`) as HTMLSpanElement;

  password2.addEventListener('blur', () => {
    if(password1.value){
      if(password1.value === password2.value){
        password2Error.textContent = '';
        applyStyleToInput(password2, 'valid');
      } else {
        password2Error.textContent = 'Password does not match';
        applyStyleToInput(password2, 'invalid');
      }
    } else { 
      if(password2.value){
        password2Error.textContent = 'Please fill in all passwords';
      }
    }
  })
}


