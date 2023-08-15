
// Street: Must contain at least one character

import { checkIfContainsCharacters } from "./Helpers";

function showError(address:HTMLInputElement, addressError:HTMLSpanElement) {
  checkIfContainsCharacters(address, addressError);
 }

function checkAddressValidity(address: HTMLInputElement, addressError: HTMLSpanElement){

  address.addEventListener('blur', () => {
    if (address.validity.valid) {
      addressError.textContent = '';
    } else {
      showError(address, addressError);
    }
  });
}

export default function setAddressValidity(){

  const form = document.querySelector('.form') as HTMLFormElement;
  const billingAddress = document.querySelector('.billing-address') as HTMLInputElement;
  const shippingAddress = document.querySelector('.shipping-address') as HTMLInputElement;
  const billingAddressError = document.querySelector('.billing-address ~ span.validation-message') as HTMLSpanElement;
  const shippingAddressError = document.querySelector('.shipping-address ~ span.validation-message') as HTMLSpanElement;

  checkAddressValidity(billingAddress, billingAddressError);
  checkAddressValidity(shippingAddress, shippingAddressError);

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