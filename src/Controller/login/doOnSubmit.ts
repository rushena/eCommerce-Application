import { getInputElement } from '../../Utility/submitForm';
import { authentificateCustomer } from './loginClient';
import Header from '../../View/components/header';
import { Routing } from '../../Router/Router';

export async function doOnAuthSubmit(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  if (!form.reportValidity()) return;
  event.preventDefault();
  const email = getInputElement(form, '.e-mail');
  const password = getInputElement(form, '.password1');
  const response = await authentificateCustomer({
    username: email.value,
    password: password.value,
  });
  if (response.success === true) {
    const header = Header.getInstance();
    header.loginElement = true;
    email.value = '';
    password.value = '';
    const router = new Routing();
    router.get('/');
  } else {
    // console.log('error');
    const errorrDiv = document.querySelector('.api-error')!;
    errorrDiv.textContent = response.errorMessage;
    errorrDiv.classList.add('api-error_color_red');
  }
}
