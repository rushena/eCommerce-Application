import { getElementValue } from '../../Utility/submitForm';
import { authentificateCustomer } from './loginClient';

export async function doOnAuthSubmit(event: SubmitEvent) {
  console.log(321);
  const form = event.target as HTMLFormElement;
  if (!form.reportValidity()) return;
  event.preventDefault();
  const email = getElementValue(form, '.e-mail');
  const password = getElementValue(form, '.password1');
  const response = await authentificateCustomer({
    username: email,
    password: password,
  });
  if (response.success === true) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '/');
    anchor.click();
  } else {
    // console.log('error');
    const errorrDiv = document.querySelector('.api-error')!;
    errorrDiv.textContent = response.errorMessage;
    errorrDiv.classList.add('api-error_color_red');
  }
}
