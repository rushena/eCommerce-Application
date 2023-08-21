// Email Validation Rules 📏
// Email address must be properly formatted (e.g., user@example.com).
// Email address must not contain leading or trailing whitespace. CHECK!!!
// Email address must contain a domain name (e.g., example.com).
// Email address must contain an '@' symbol separating local part and domain name.
import { applyStyleToInput } from './Helpers';

function showError(email: HTMLInputElement, emailError: HTMLSpanElement) {
  if (email.validity.valueMissing) {
    emailError.textContent = 'Please, enter your e-mail address';
    applyStyleToInput(email, 'invalid');
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Please, check if the e-mail entered is correct';
    applyStyleToInput(email, 'invalid');
  }
}

export default function setEmailValidityListener(element: HTMLElement) {
  const form = element.querySelector('.form') as HTMLFormElement;
  const email = element.querySelector('.e-mail') as HTMLInputElement;
  const emailError = element.querySelector(
    '.e-mail + span.validation-message'
  ) as HTMLSpanElement;

  email.addEventListener('blur', () => {
    if (email.validity.valid) {
      const domain = email.value.split('@')[1];
      if (domain.includes('.') /*&& (email.value.split(' ').length === 1)*/) {
        emailError.textContent = '';
        applyStyleToInput(email, 'valid');
      } else {
        showError(email, emailError);
      }
    } else {
      showError(email, emailError);
    }
  });

  form.addEventListener('submit', (event) => {
    if (!email.validity.valid) {
      showError(email, emailError);
      event.preventDefault();
    }
  });
}
