// Email Validation Rules 📏
// Email address must be properly formatted (e.g., user@example.com).
// Email address must not contain leading or trailing whitespace. CHECK!!!
// Email address must contain a domain name (e.g., example.com).
// Email address must contain an '@' symbol separating local part and domain name.



function showError(email:HTMLInputElement, emailError:HTMLSpanElement) {
  if (email.validity.valueMissing) {
    emailError.textContent = "Please, enter your e-mail address";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Please, check if the e-mail entered is correct";
  }
 }

export default function setEmailValidityListener(){

  const form = document.querySelector('.form') as HTMLFormElement;
  const email = document.querySelector('.e-mail') as HTMLInputElement;
  const emailError = document.querySelector(".e-mail + span.validation-message") as HTMLSpanElement;

  email.addEventListener('blur', () => {
    if (email.validity.valid) {
      const domain = email.value.split('@')[1];
      if(domain.includes('.') /*&& (email.value.split(' ').length === 1)*/){
        emailError.textContent = '';
      } else {
        showError(email, emailError);
      }
    } else {
      showError(email, emailError);
    }
  });

  form.addEventListener('submit', (event)=> {
    if (!email.validity.valid) {
      showError(email, emailError);
      event.preventDefault();
    }
  });
}





