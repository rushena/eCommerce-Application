
// Street: Must contain at least one character

import { checkIfContainsCharacters, applyStyleToInput, checkFullAddressValidity} from "./Helpers";

function showError(address:HTMLInputElement, addressError:HTMLSpanElement) {
  checkIfContainsCharacters(address, addressError);
 }

function checkAddressValidity(address: HTMLInputElement, addressError: HTMLSpanElement, element: HTMLElement){

  address.addEventListener('blur', () => {
    if (address.validity.valid) {
      addressError.textContent = '';
      applyStyleToInput(address, 'valid');
      checkFullAddressValidity(element);
    } else {
      showError(address, addressError);
    }
  });
}

export default function setAddressValidity(element: HTMLElement){

  const form = element.querySelector('.form') as HTMLFormElement;
  const billingAddress = element.querySelector('.billing-address') as HTMLInputElement;
  const shippingAddress = element.querySelector('.shipping-address') as HTMLInputElement;
  const billingAddressError = element.querySelector('.billing-address ~ span.validation-message') as HTMLSpanElement;
  const shippingAddressError = element.querySelector('.shipping-address ~ span.validation-message') as HTMLSpanElement;

  checkAddressValidity(billingAddress, billingAddressError, element);
  checkAddressValidity(shippingAddress, shippingAddressError, element);

  form.addEventListener('submit', (event)=> {
    if ((!shippingAddress.validity.valid)){
      showError(shippingAddress, shippingAddressError);
      event.preventDefault();
    }
    if (!billingAddress.validity.valid) {
      showError(billingAddress, billingAddressError);
      event.preventDefault();
    }
  });
}