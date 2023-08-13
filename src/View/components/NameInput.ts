// First name: Must contain at least one character and no special characters or numbers
// Last name: Must contain at least one character and no special characters or numbers

function showError(customerName:HTMLInputElement, nameError:HTMLSpanElement) {
  if (customerName.validity.valueMissing) {
    nameError.textContent = "Please, fill in the field";
  } else if (customerName.validity.patternMismatch) {
    nameError.textContent = "No special characters or numbers are allowed";
  }
 }

function checkNameValidity(customerName: HTMLInputElement, nameError: HTMLSpanElement){
  customerName.addEventListener('blur', () => {
    if (customerName.validity.valid) {
      nameError.textContent = '';
    } else {
      showError(customerName, nameError);
    }
  });
}

export default function setNameValidityListener(){

  const form = document.querySelector('.form') as HTMLFormElement;
  const firstName = document.querySelector('.first-name') as HTMLInputElement;
  const lastName = document.querySelector('.last-name') as HTMLInputElement;
  const firstNameError = document.querySelector(".first-name ~ span.validation-message") as HTMLSpanElement;
  const lastNameError = document.querySelector(".last-name ~ span.validation-message") as HTMLSpanElement;

  checkNameValidity(firstName, firstNameError);
  checkNameValidity(lastName, lastNameError)

  form.addEventListener('submit', (event)=> {
    if ((!lastName.validity.valid) ||(!lastName.validity.valid) ){
      showError(firstName, firstNameError);
      event.preventDefault();
    }
    if (!lastName.validity.valid) {
      showError(lastName, lastNameError);
      event.preventDefault();
    }
  });
}