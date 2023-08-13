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

export function setPasswordValidityListener(){

  const form = document.querySelector('.form') as HTMLFormElement;
  const password1 = document.querySelector('.password1') as HTMLInputElement;
  const password2 = document.querySelector('.password2') as HTMLInputElement;
  const password1Error = document.querySelector(".password1 ~ span.validation-message") as HTMLSpanElement;
  const password2Error = document.querySelector(".password2 ~ span.validation-message") as HTMLSpanElement;

  password1.addEventListener('blur', () => {
    if(password1.value.split(' ').length === 1){
      if (password1.validity.valid) {
        password1Error.textContent = '';
      } else {
        showError(password1, password1Error);
      }
    } else {
      showError(password1, password1Error);
    }
  });

  password2.addEventListener('blur', () => {
    if(password2.value === password1.value){
      password2Error.textContent = '';
    } else{
      password2Error.textContent = 'Password mismatch';
    }
  });

  form.addEventListener('submit', (event)=> {
    if (!password1.validity.valid) {
      showError(password1, password1Error);
      event.preventDefault();
    }
  });
}

export function setPasswordVisibility(){
  const eye1 = document.querySelector('.password1 + img') as HTMLImageElement;
  const eye2 = document.querySelector('.password2 + img') as HTMLImageElement;
  const password1 = document.querySelector('.password1') as HTMLInputElement;
  const password2 = document.querySelector('.password2') as HTMLInputElement;

  togglePasswordVisibility(eye1, password1);
  togglePasswordVisibility(eye2, password2);
}