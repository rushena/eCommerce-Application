// Postal code: Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)

import { checkIfContainsCharacters, checkPatternMatch } from "./Helpers";

function showError(index:HTMLInputElement, indexError:HTMLSpanElement) {
  if(checkIfContainsCharacters(index, indexError)){
    checkPatternMatch(index, indexError, "Postal code does not correspond to country's format");
  }
 }

function checkIndexValidity(index: HTMLInputElement, indexError: HTMLSpanElement){

  index.addEventListener('blur', () => {
    console.log(index, indexError)
    if (index.validity.valid) {
      indexError.textContent = '';
    } else {
      showError(index, indexError);
    }
  });
}

export default function setIndexValidity(){

  const form = document.querySelector('.form') as HTMLFormElement;
  const billingIndex = document.querySelector('.billing-index') as HTMLInputElement;
  const shippingIndex = document.querySelector('.shipping-index') as HTMLInputElement;
  const billingIndexError = document.querySelector('.billing-index ~ span.validation-message') as HTMLSpanElement;
  const shippingIndexError = document.querySelector('.shipping-index ~ span.validation-message') as HTMLSpanElement;  

  checkIndexValidity(billingIndex, billingIndexError);
  checkIndexValidity(shippingIndex, shippingIndexError);

  form.addEventListener('submit', (event)=> {
    if ((!shippingIndex.validity.valid)){
      showError(shippingIndex, shippingIndexError);
      event.preventDefault();
    }
    if (!billingIndex.validity.valid) {
      showError(billingIndex, billingIndexError);
      event.preventDefault();
    }
  });
}