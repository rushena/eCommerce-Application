export function checkIfContainsCharacters(inputField: HTMLInputElement, errorField: HTMLSpanElement){
  if (inputField.validity.valueMissing) {
    errorField.textContent = "Please, fill in the field";
    applyStyleToInput(inputField, 'invalid')
    return false;
  } else return true;
}

export function checkPatternMatch(inputField: HTMLInputElement, errorField: HTMLSpanElement, patternType: "no special characters or numbers" | "Postal code does not correspond to country's format"){
  if (inputField.validity.patternMismatch) {
    if(patternType === 'no special characters or numbers'){
      errorField.textContent = "No special characters or numbers are allowed";
      applyStyleToInput(inputField, 'invalid');
    } 
    if(patternType === "Postal code does not correspond to country's format"){
      errorField.textContent = "Postal code does not correspond to country's format";
      applyStyleToInput(inputField, 'invalid');
    } 
  }
}

export function applyStyleToInput(element: HTMLInputElement | HTMLSelectElement, validity: 'valid'|'invalid') {
  if(validity === 'invalid'){
    element.classList.add('input-invalid');
  } 
  if(validity === 'valid'){
    if(element.classList.contains('input-invalid')){
      element.classList.remove('input-invalid');
    }
  }
}

export function checkFullAddressValidity(){
  const billingIndex = document.querySelector('.billing-index') as HTMLInputElement;
  const billingAddress = document.querySelector('.billing-address') as HTMLInputElement;
  const billingCity = document.querySelector('.billing-city') as HTMLInputElement;
  const checkbox = document.querySelector('.billing-same-shipping') as HTMLInputElement;

  if(billingAddress.validity.valid && billingIndex.validity.valid && billingCity.validity.valid){
    if(checkbox.hasAttribute('disabled')){
      checkbox.removeAttribute('disabled');
    }
  };
}

export function makeValid(element: HTMLInputElement, elementError: HTMLSpanElement){
  if(element.classList.contains('input-invalid')){
    element.classList.remove('input-invalid');
    elementError.textContent = '';
  }

}