// Postal code: Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)

import {
  checkIfContainsCharacters,
  checkPatternMatch,
  applyStyleToInput,
  checkFullAddressValidity,
} from './Helpers';

function showError(index: HTMLInputElement, indexError: HTMLSpanElement) {
  if (checkIfContainsCharacters(index, indexError)) {
    checkPatternMatch(
      index,
      indexError,
      "Postal code does not correspond to country's format"
    );
  }
}

function checkIndexValidity(
  index: HTMLInputElement,
  indexError: HTMLSpanElement,
  element: HTMLElement
) {
  index.addEventListener('blur', () => {
    const checkbox = element.querySelector(
      '.billing-same-shipping'
    ) as HTMLInputElement;
    if (index.validity.valid) {
      indexError.textContent = '';
      applyStyleToInput(index, 'valid');
      checkFullAddressValidity(element);
    } else {
      checkbox.setAttribute('disabled', '');
      showError(index, indexError);
    }
  });
}

export default function setIndexValidity(element: HTMLElement) {
  const form = element.querySelector('.form') as HTMLFormElement;
  const billingIndex = element.querySelector(
    '.billing-index'
  ) as HTMLInputElement;
  const shippingIndex = element.querySelector(
    '.shipping-index'
  ) as HTMLInputElement;
  const billingIndexError = element.querySelector(
    '.billing-index ~ span.validation-message'
  ) as HTMLSpanElement;
  const shippingIndexError = element.querySelector(
    '.shipping-index ~ span.validation-message'
  ) as HTMLSpanElement;

  checkIndexValidity(billingIndex, billingIndexError, element);
  checkIndexValidity(shippingIndex, shippingIndexError, element);

  form.addEventListener('submit', (event) => {
    if (!shippingIndex.validity.valid) {
      showError(shippingIndex, shippingIndexError);
      event.preventDefault();
    }
    if (!billingIndex.validity.valid) {
      showError(billingIndex, billingIndexError);
      event.preventDefault();
    }
  });
}
