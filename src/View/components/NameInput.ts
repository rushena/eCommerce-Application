// First name: Must contain at least one character and no special characters or numbers
// Last name: Must contain at least one character and no special characters or numbers
import {
  checkIfContainsCharacters,
  checkPatternMatch,
  applyStyleToInput,
} from './Helpers';

function showError(customerName: HTMLInputElement, nameError: HTMLSpanElement) {
  if (checkIfContainsCharacters(customerName, nameError)) {
    checkPatternMatch(
      customerName,
      nameError,
      'no special characters or numbers'
    );
  }
}

function checkNameValidity(
  customerName: HTMLInputElement,
  nameError: HTMLSpanElement
) {
  customerName.addEventListener('blur', () => {
    if (customerName.validity.valid) {
      nameError.textContent = '';
      applyStyleToInput(customerName, 'valid');
    } else {
      showError(customerName, nameError);
    }
  });
}

export default function setNameValidityListener(element: HTMLElement) {
  const form = element.querySelector('.form') as HTMLFormElement;
  const firstName = element.querySelector('.first-name') as HTMLInputElement;
  const lastName = element.querySelector('.last-name') as HTMLInputElement;
  const firstNameError = element.querySelector(
    '.first-name ~ span.validation-message'
  ) as HTMLSpanElement;
  const lastNameError = element.querySelector(
    '.last-name ~ span.validation-message'
  ) as HTMLSpanElement;

  checkNameValidity(firstName, firstNameError);
  checkNameValidity(lastName, lastNameError);

  form.addEventListener('submit', (event) => {
    if (!firstName.validity.valid) {
      showError(firstName, firstNameError);
      event.preventDefault();
    }
    if (!lastName.validity.valid) {
      showError(lastName, lastNameError);
      event.preventDefault();
    }
  });
}
