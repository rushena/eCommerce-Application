// City: Must contain at least one character and no special characters or numbers


import { checkIfContainsCharacters, checkPatternMatch, applyStyleToInput, checkFullAddressValidity } from "./Helpers";

function showError(city:HTMLInputElement, cityError:HTMLSpanElement) {
  if(checkIfContainsCharacters(city, cityError)){
    checkPatternMatch(city, cityError, 'no special characters or numbers');
  }
 }

function checkCityValidity(city: HTMLInputElement, cityError: HTMLSpanElement){

  city.addEventListener('blur', () => {
    console.log(city, cityError)
    if (city.validity.valid) {
      cityError.textContent = '';
      applyStyleToInput(city, 'valid');
      checkFullAddressValidity();
    } else {
      showError(city, cityError);
    }
  });
}

export default function setCityValidity() {

  const form = document.querySelector('.form') as HTMLFormElement;
  const billingCity = document.querySelector('.billing-city') as HTMLInputElement;
  const shippingCity = document.querySelector('.shipping-city') as HTMLInputElement;
  
  const billingCityError = document.querySelector('.billing-city ~ span.validation-message') as HTMLSpanElement;
  const shippingCityError = document.querySelector('.shipping-city ~ span.validation-message') as HTMLSpanElement;

  checkCityValidity(billingCity, billingCityError);
  checkCityValidity(shippingCity, shippingCityError);

  form.addEventListener('submit', (event) => {
    if (!billingCity.validity.valid){
      showError(billingCity, billingCityError);
      event.preventDefault();
    }
    if (!shippingCity.validity.valid) {
      showError(shippingCity, shippingCityError);
      event.preventDefault();
    }
  });
}