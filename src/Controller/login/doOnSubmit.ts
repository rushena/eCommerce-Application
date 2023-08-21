import { getElementValue } from '../../Utility/submitForm';
import { authentificateCustomer } from './loginClient';

export async function doOnAuthSubmit(event: SubmitEvent) {
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
    // redirect have to be here
  } else {
    // error dislay have to be here
  }
}
