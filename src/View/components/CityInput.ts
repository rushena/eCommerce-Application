// City: Must contain at least one character and no special characters or numbers

import {
  checkIfContainsCharacters,
  checkPatternMatch,
  applyStyleToInput,
  checkFullAddressValidity,
} from './Helpers';

function showError(city: HTMLInputElement, cityError: HTMLSpanElement) {
  if (checkIfContainsCharacters(city, cityError)) {
    checkPatternMatch(city, cityError, 'no special characters or numbers');
  }
}

function checkCityValidity(
  city: HTMLInputElement,
  cityError: HTMLSpanElement,
  element: HTMLElement
) {
  city.addEventListener('blur', () => {
    if (city.validity.valid) {
      cityError.textContent = '';
      applyStyleToInput(city, 'valid');
      checkFullAddressValidity(element);
    } else {
      showError(city, cityError);
    }
  });
}

export default function setCityValidity(element: HTMLElement) {
  const form = element.querySelector('.form') as HTMLFormElement;
  const billingCity = element.querySelector(
    '.billing-city'
  ) as HTMLInputElement;
  const shippingCity = element.querySelector(
    '.shipping-city'
  ) as HTMLInputElement;

  const billingCityError = element.querySelector(
    '.billing-city ~ span.validation-message'
  ) as HTMLSpanElement;
  const shippingCityError = element.querySelector(
    '.shipping-city ~ span.validation-message'
  ) as HTMLSpanElement;

  checkCityValidity(billingCity, billingCityError, element);
  checkCityValidity(shippingCity, shippingCityError, element);

  form.addEventListener('submit', (event) => {
    if (!billingCity.validity.valid) {
      showError(billingCity, billingCityError);
      event.preventDefault();
    }
    if (!shippingCity.validity.valid) {
      showError(shippingCity, shippingCityError);
      event.preventDefault();
    }
  });
}
